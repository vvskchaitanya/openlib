const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../source');
const targetDir = path.join(__dirname, '../target');
const docsDir = path.join(__dirname, '../docs');

// Ensure directories exist (clean start)
[targetDir, docsDir].forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
    }
    fs.mkdirSync(dir, { recursive: true });
});

function copyJsFiles(src, relativePath = '') {
    const fullSrcPath = path.join(src, relativePath);
    const entries = fs.readdirSync(fullSrcPath, { withFileTypes: true });

    for (const entry of entries) {
        const entryRelativePath = path.join(relativePath, entry.name);
        const sourceEntryPath = path.join(src, entryRelativePath);

        if (entry.isDirectory()) {
            // Recursively process directories
            copyJsFiles(src, entryRelativePath);
        } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.html') || entry.name.endsWith('.css') || entry.name.endsWith('.json'))) {
            // It's a JS file, copy to both targets
            [targetDir, docsDir].forEach(destBase => {
                const destPath = path.join(destBase, entryRelativePath);
                const destDir = path.dirname(destPath);

                // Ensure parent directory exists in destination
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }

                fs.copyFileSync(sourceEntryPath, destPath);
                console.log(`Copied: ${entryRelativePath} -> ${destBase}`);
            });
        }
    }
}

console.log('Starting build...');

// Copy Source JS files
if (fs.existsSync(sourceDir)) {
    copyJsFiles(sourceDir);
} else {
    console.error('Source directory not found:', sourceDir);
    process.exit(1);
}

// Copy Playground
const playgroundDir = path.join(__dirname, '../playground');
if (fs.existsSync(playgroundDir)) {
    [targetDir, docsDir].forEach(destBase => {
        const destPlayground = path.join(destBase, 'playground');
        fs.cpSync(playgroundDir, destPlayground, { recursive: true });
        console.log(`Copied: playground -> ${destBase}`);
    });
}

console.log('Build complete.');
