const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../source');
const targetDir = path.join(__dirname, '../target');
const docsDir = path.join(__dirname, '../docs');

// Ensure target directories exist
[targetDir, docsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

async function copyRecursive(src, dest) {
    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await fs.promises.mkdir(destPath, { recursive: true });
            await copyRecursive(srcPath, destPath);
        } else if (entry.isFile()) {
             // Logic: Copy if it's a directory (handled above) OR if it is a .js file
             // Actually, the requirement is "folders and .js files".
             // We are inside a directory traversal.
             // If we are at root source, we filter.
             // If we are deeper, we probably copy everything inside the folder?
             // Or strict "only .js files" everywhere?
             // Usually "folders and .js files" implies structure + js code.
             // I will implement: Copy all .js files. Copy all directories.
             // If a directory contains non-js files, they will be copied too with this recursive approach? 
             // Let's stick to the prompt: "move the folders and .js files".
             // I will interpret this as:
             // 1. If it's a folder, copy it (and its contents).
             // 2. If it's a file, copy ONLY if .js.
             
             if (path.extname(entry.name) === '.js') {
                 await fs.promises.copyFile(srcPath, destPath);
                 console.log(`Copied: ${entry.name} to ${destPath}`);
             }
        }
    }
}

async function sync() {
    console.log('Starting sync...');
    
    // We need to filter at the top level first to match "folders and .js files"
    // But recursive function above does "If directory -> copy recursive". "If file -> check .js".
    // This assumes that INSIDE a folder, we also only want .js files? 
    // Or do we want EVERYTHING inside a folder?
    // "move the folders and .js files"
    // Valid interpretation:
    // Root:
    //   - Folder A -> Move whole folder
    //   - File B.js -> Move
    //   - File C.txt -> Ignore
    // Inside Folder A:
    //   - File D.txt -> ?
    // I will assume we Copy EVERYTHING inside the folders because usually folders are packages.
    // However, my recursive function above filters .js files EVERYWHERE.
    // Let's refine.
    
    // Better implementation: 
    // Iterate root source.
    // If Folder -> Copy entire folder (recursive cp)
    // If File -> Check .js -> Copy
    
    const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(sourceDir, entry.name);
        
        if (entry.isDirectory()) {
             // Copy directory recursively (Node 16.7.0+ has fs.cp)
             // Using fs.promises.cp if available, else manual.
             // Windows user, node v22.
             
             const targetDest = path.join(targetDir, entry.name);
             const docsDest = path.join(docsDir, entry.name);
             
             await fs.promises.cp(srcPath, targetDest, { recursive: true });
             console.log(`Copied Directory: ${entry.name} to ${targetDest}`);
             
             await fs.promises.cp(srcPath, docsDest, { recursive: true });
             console.log(`Copied Directory: ${entry.name} to ${docsDest}`);
             
        } else if (entry.isFile() && path.extname(entry.name) === '.js') {
            const targetDest = path.join(targetDir, entry.name);
            const docsDest = path.join(docsDir, entry.name);
            
            await fs.promises.copyFile(srcPath, targetDest);
            console.log(`Copied File: ${entry.name} to ${targetDest}`);
            
            await fs.promises.copyFile(srcPath, docsDest);
            console.log(`Copied File: ${entry.name} to ${docsDest}`);
        }
    }
    
    console.log('Sync complete.');
}

sync().catch(console.error);
