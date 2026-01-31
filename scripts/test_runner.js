const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const testDir = path.join(__dirname, '../test');
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;

function runTests(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            runTests(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            console.log(`\nRunning ${entry.name}...`);
            const result = spawnSync('node', [fullPath], { stdio: 'inherit' });

            if (result.status === 0) {
                console.log(`${GREEN}PASS: ${entry.name}${RESET}`);
                passed++;
            } else {
                console.error(`${RED}FAIL: ${entry.name}${RESET}`);
                failed++;
            }
        }
    }
}

console.log("Starting Test Runner...");
if (fs.existsSync(testDir)) {
    runTests(testDir);

    console.log('\n------------------------------------------------');
    console.log(`Tests: ${passed} passed, ${failed} failed`);
    console.log('------------------------------------------------');

    if (failed > 0) process.exit(1);
} else {
    console.error("Test directory not found.");
    process.exit(1);
}
