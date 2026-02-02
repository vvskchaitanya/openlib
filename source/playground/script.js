// Elements
const codeEditor = document.getElementById('code-editor');
const runBtn = document.getElementById('run-btn');
const importsListEl = document.getElementById('imports-list');
const addImportBtn = document.getElementById('add-import-btn');
const consoleOutput = document.getElementById('console-output');
const clearConsoleBtn = document.getElementById('clear-console-btn');

// Initial State
const defaultCode = `// Example: Using Arrays.js if imported
// Try adding "../docs/data/Arrays.js" to imports!

const arr = [1, 2, 3, 4, 5];
console.log("Original Array:", arr);

// Arrays.shift.right(arr, 2, 99); // Uncomment if imported
// console.log("Shifted:", arr);

console.log("Hello from OpenLib IDE!");
`;

const defaultImports = [
    // Pre-populate with local Arrays.js for convenience if hosted relative
    // '../docs/data/Arrays.js' 
];

// Load State
codeEditor.value = localStorage.getItem('ide_code') || defaultCode;
let imports = JSON.parse(localStorage.getItem('ide_imports') || JSON.stringify(defaultImports));

// --- Imports Management ---
function renderImports() {
    importsListEl.innerHTML = '';
    imports.forEach((url, index) => {
        const item = document.createElement('div');
        item.className = 'import-item';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'import-input';
        input.value = url;
        input.placeholder = 'https://... or path/to/script.js';
        input.addEventListener('change', (e) => updateImport(index, e.target.value));

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-icon';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remove';
        removeBtn.addEventListener('click', () => removeImport(index));

        item.appendChild(input);
        item.appendChild(removeBtn);
        importsListEl.appendChild(item);
    });
}

function addImport() {
    imports.push('');
    saveState();
    renderImports();
}

function removeImport(index) {
    imports.splice(index, 1);
    saveState();
    renderImports();
}

function updateImport(index, value) {
    imports[index] = value;
    saveState();
}

// --- Console Logic ---
function createLogEntry(type, args) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;

    // Convert args to string
    const text = args.map(arg => {
        if (typeof arg === 'object') {
            try {
                return JSON.stringify(arg, null, 2);
            } catch (e) {
                return '[Circular/Object]';
            }
        }
        return String(arg);
    }).join(' ');

    entry.textContent = `> ${text}`;
    consoleOutput.appendChild(entry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info
};

// Override console
console.log = function (...args) {
    originalConsole.log.apply(console, args);
    createLogEntry('log', args);
};
console.error = function (...args) {
    originalConsole.error.apply(console, args);
    createLogEntry('error', args);
};
console.warn = function (...args) {
    originalConsole.warn.apply(console, args);
    createLogEntry('warn', args);
};
console.info = function (...args) {
    originalConsole.info.apply(console, args);
    createLogEntry('info', args);
};

window.onerror = function (message, source, lineno, colno, error) {
    createLogEntry('error', [`Uncaught Error: ${message} at line ${lineno}`]);
};

// --- Execution ---
async function runScript() {
    // 1. Clear Console
    consoleOutput.innerHTML = '';
    createLogEntry('info', ['--- Running Script ---']);

    // 2. Load Imports dynamically
    // We remove previously added scripts? No, that's hard.
    // simpler: append new scripts. note: duplicate scripts might run again or cache.
    // For a playground, simplistic approach:
    // We cannot easily 'unload' scripts. We can just append new ones.
    // If user changes import URL, we load the new one.
    // Ideally we would use an iframe for isolation, but that complicates console capture.
    // For this generic IDE, we'll try to just load them.

    // PRO TIP: For cleaner execution, we could use an iframe, but requested "Below text area console".
    // Let's stick to same-window execution for simplicity unless isolation is needed.

    for (const url of imports) {
        if (!url.trim()) continue;
        try {
            await loadScript(url);
            createLogEntry('info', [`Loaded: ${url}`]);
        } catch (e) {
            createLogEntry('error', [`Failed to load: ${url}`]);
        }
    }

    // 3. Execute Code
    const code = codeEditor.value;
    try {
        // Wrap in async IIFE to allow await
        const asyncCode = `(async () => { ${code} \n})();`;

        // Use Blob/Script injection for better debugging? Or just eval? 
        // eval is simplest for preserving context.
        // But let's try strict mode?

        // Using Indirect Eval
        const result = (0, eval)(asyncCode);
        // Note: Result of IIFE promise is ignored unless we capture it.

    } catch (e) {
        console.error(e);
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Check if already loaded? (Naively)
        if (document.querySelector(`script[src="${src}"]`)) {
            // Already there
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function saveState() {
    localStorage.setItem('ide_code', codeEditor.value);
    localStorage.setItem('ide_imports', JSON.stringify(imports));
}

// Event Listeners
runBtn.addEventListener('click', runScript);
addImportBtn.addEventListener('click', addImport);
clearConsoleBtn.addEventListener('click', () => consoleOutput.innerHTML = '');
codeEditor.addEventListener('input', saveState);

// Init
renderImports();
