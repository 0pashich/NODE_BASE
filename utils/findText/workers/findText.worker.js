const worker_threads = require('worker_threads');
const fs = require('fs');
const readline = require('readline')

const file = worker_threads.workerData.file;
const searchText = worker_threads.workerData.searchText;

const readStream = fs.createReadStream(file, 'utf-8');
let count = 0;

const rl = readline.createInterface({
    input: readStream,
    terminal: true
});

rl.on('line', (line) => {
    if (line.includes(searchText)) {
        count++;
    }
})

rl.on('close', () => worker_threads.parentPort.postMessage(count))

