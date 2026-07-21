// Migrates every static HTML page from the old <header>/<footer> navbar
// to the floating nav-dock / social-dock widgets. Idempotent: safe to
// re-run (already-migrated files are detected and skipped per-block).
//
// Usage: node scripts/migrate-header.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const KNOWN_SECTIONS = new Set(["math", "quant", "chess", "bio", "dev", "music", "about"]);

const FAVICON_RE = /<link rel="icon" type="image\/png" href="((?:\.\.\/)*)assets\/icons\/favicon\.png">/;

function collectHtmlFiles(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "scripts") continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            collectHtmlFiles(full, out);
        } else if (entry.isFile() && entry.name.endsWith(".html")) {
            out.push(full);
        }
    }
    return out;
}

function detectSection(file) {
    const rel = path.relative(ROOT, file);
    const segments = rel.split(path.sep);
    if (segments.length === 1 && segments[0] === "index.html") return "home";
    const first = segments[0];
    if (KNOWN_SECTIONS.has(first)) return first;
    return null;
}

function buildNavDock(prefix) {
    const homeHref = prefix === "" ? "./" : prefix;
    return `<div class="nav-dock" id="nav-dock">
        <a href="${prefix}about/" class="brand-mark" aria-label="About Sethu Upadhyayula"><img src="${prefix}assets/icons/favicon.png" alt="" class="pie-center-img"></a>
        <a href="${homeHref}" class="nav-dock-home" aria-label="Home"><i class="fas fa-house"></i></a>
        <button class="nav-dock-toggle" id="nav-dock-toggle" type="button" aria-label="Site sections" aria-expanded="false" aria-controls="nav-dock-panel">
            <i class="fas fa-compass"></i>
        </button>
        <div class="nav-dock-panel" id="nav-dock-panel">
            <a href="${prefix}math/" class="crosslink-dot" data-crosslink="math" aria-label="Math"><i class="fas fa-infinity"></i></a>
            <a href="${prefix}biology/" class="crosslink-dot" data-crosslink="bio" aria-label="Biology"><i class="fas fa-dna"></i></a>
            <a href="${prefix}quant/" class="crosslink-dot" data-crosslink="quant" aria-label="Quant"><i class="fas fa-dollar-sign"></i></a>
            <a href="${prefix}dev/" class="crosslink-dot" data-crosslink="dev" aria-label="Dev"><i class="fas fa-code"></i></a>
            <a href="${prefix}chess/" class="crosslink-dot" data-crosslink="chess" aria-label="Chess"><i class="fas fa-chess"></i></a>
            <a href="${prefix}music/" class="crosslink-dot" data-crosslink="music" aria-label="Music"><i class="fas fa-music"></i></a>
        </div>
    </div>`;
}

const SOCIAL_DOCK = `<div class="social-dock">
        <a href="mailto:sethu.upadhyayula@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
        <a href="https://www.linkedin.com/in/sethu-upadhyayula/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/sethu-upadhyayula" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
    </div>`;

function setDataSection(src, section) {
    return src.replace(/<html([^>]*)>/, (full, attrs) => {
        if (/data-section="[^"]*"/.test(attrs)) {
            return `<html${attrs.replace(/data-section="[^"]*"/, `data-section="${section}"`)}>`;
        }
        return `<html${attrs} data-section="${section}">`;
    });
}

function migrateFile(file) {
    const original = fs.readFileSync(file, "utf8");
    let src = original;
    const notes = [];

    const faviconMatch = FAVICON_RE.exec(src);
    if (!faviconMatch) return { file, status: "FAILED", reason: "no favicon anchor found" };
    const prefix = faviconMatch[1];

    const section = detectSection(file);
    if (!section) return { file, status: "FAILED", reason: "unknown section" };

    // header -> nav-dock
    if (!src.includes('id="nav-dock"')) {
        if (!/<header[^>]*>[\s\S]*?<\/header>/.test(src)) {
            return { file, status: "FAILED", reason: "no <header> found and no nav-dock present" };
        }
        src = src.replace(/<header[^>]*>[\s\S]*?<\/header>/, buildNavDock(prefix));
        notes.push("header->nav-dock");
    }

    // footer -> social-dock
    if (!src.includes('class="social-dock"')) {
        if (!/<footer[^>]*>[\s\S]*?<\/footer>/.test(src)) {
            return { file, status: "FAILED", reason: "no <footer> found and no social-dock present" };
        }
        src = src.replace(/<footer[^>]*>[\s\S]*?<\/footer>/, SOCIAL_DOCK);
        notes.push("footer->social-dock");
    }

    src = setDataSection(src, section);

    if (src === original) {
        return { file, status: "unchanged" };
    }

    fs.writeFileSync(file, src, "utf8");
    return { file, status: "changed", notes };
}

function main() {
    const files = collectHtmlFiles(ROOT);
    const results = { changed: 0, unchanged: 0, failed: [] };

    for (const file of files) {
        const result = migrateFile(file);
        if (result.status === "changed") results.changed++;
        else if (result.status === "unchanged") results.unchanged++;
        else results.failed.push(result);
    }

    console.log(`Total files: ${files.length}`);
    console.log(`Changed:     ${results.changed}`);
    console.log(`Unchanged:   ${results.unchanged}`);
    console.log(`Failed:      ${results.failed.length}`);
    if (results.failed.length) {
        console.log("\nFailures:");
        for (const f of results.failed) {
            console.log(`  ${path.relative(ROOT, f.file)} - ${f.reason}`);
        }
        process.exitCode = 1;
    }
}

main();
