const worker_threads = require('worker_threads');
const fs = require('fs');
const readline = require('readline')
const { Transform } = require('stream');

const file = worker_threads.workerData.file;
const searchText = worker_threads.workerData.searchText;

const readStream = fs.createReadStream(file, 'utf-8');
let count = 0;


const regexp = new RegExp(`^.*${searchText}.*$`, 'gm')
var lastStingOfChunk = '';


const tStream = new Transform({
    transform(chunk, encoding, callback) {
        const chunkWithoutLastString = chunk.toString().match(/(.*)\n/gs).join();
        count = count + (lastStingOfChunk + chunkWithoutLastString).match(regexp).length;
        lastStingOfChunk = chunk.toString().match(/\n(.*$)/)[1];
        callback();
    }
});

readStream.pipe(tStream);

readStream.on('close', () => worker_threads.parentPort.postMessage(count));


