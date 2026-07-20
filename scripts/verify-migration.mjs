// Read-only verification for the header/footer -> nav-dock/social-dock migration.
// Usage: node scripts/verify-migration.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const FAVICON_RE = /<link rel="icon" type="image\/png" href="((?:\.\.\/)*)assets\/icons\/favicon\.png">/;
const VALID_SECTIONS = ["home", "about", "math", "quant", "chess", "bio", "dev", "music"];

function collectHtmlFiles(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "scripts") continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) collectHtmlFiles(full, out);
        else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
    }
    return out;
}

const CHECK_TARGETS = [
    "assets/icons/favicon.png",
    "math/index.html",
    "quant/index.html",
    "chess/index.html",
    "about/index.html",
    "bio/index.html",
    "dev/index.html",
    "music/index.html",
    "index.html",
];

function main() {
    const files = collectHtmlFiles(ROOT);
    const problems = [];

    for (const file of files) {
        const src = fs.readFileSync(file, "utf8");
        const rel = path.relative(ROOT, file);

        // The homepage is intentionally chrome-free (no nav-dock/social-dock/theme toggle) —
        // it's just the section grid. Every other page keeps the standard chrome.
        const isHome = rel === "index.html";

        const navDockCount = (src.match(/<div class="nav-dock"/g) || []).length;
        if (!isHome && navDockCount !== 1) problems.push(`${rel}: expected exactly 1 nav-dock, found ${navDockCount}`);
        if (isHome && navDockCount !== 0) problems.push(`${rel}: homepage should have no nav-dock, found ${navDockCount}`);

        const socialDockCount = (src.match(/class="social-dock"/g) || []).length;
        if (!isHome && socialDockCount !== 1) problems.push(`${rel}: expected exactly 1 social-dock, found ${socialDockCount}`);
        if (isHome && socialDockCount !== 0) problems.push(`${rel}: homepage should have no social-dock, found ${socialDockCount}`);

        const sectionMatch = /<html[^>]*\bdata-section="([^"]*)"/.exec(src);
        if (!sectionMatch) {
            problems.push(`${rel}: missing data-section attribute`);
        } else if (!VALID_SECTIONS.includes(sectionMatch[1])) {
            problems.push(`${rel}: invalid data-section value "${sectionMatch[1]}"`);
        }

        if (/class="nav-link"/.test(src)) {
            problems.push(`${rel}: stray class="nav-link" still present`);
        }

        if (/contact\//.test(src)) {
            problems.push(`${rel}: stray "contact/" reference still present`);
        }

        if (/<header[^>]*>/.test(src) || /<footer[^>]*>/.test(src)) {
            problems.push(`${rel}: stray <header>/<footer> tag still present`);
        }

        const faviconMatch = FAVICON_RE.exec(src);
        if (!faviconMatch) {
            problems.push(`${rel}: favicon anchor not found (can't verify path resolvability)`);
            continue;
        }
        const prefix = faviconMatch[1];
        const fileDir = path.dirname(file);
        for (const target of CHECK_TARGETS) {
            const resolved = path.resolve(fileDir, prefix, target);
            if (!fs.existsSync(resolved)) {
                problems.push(`${rel}: prefix "${prefix}" -> "${target}" does not resolve (${resolved})`);
            }
        }
    }

    console.log(`Checked ${files.length} files.`);
    console.log(`Problems found: ${problems.length}`);
    if (problems.length) {
        console.log("\nDetails (first 50):");
        for (const p of problems.slice(0, 50)) console.log(`  ${p}`);
        process.exitCode = 1;
    } else {
        console.log("All structural invariants and path resolutions verified OK.");
    }
}

main();
