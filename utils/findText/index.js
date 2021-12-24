const worker_threads = require('worker_threads');

const findText = (file, searchText) => {
    return new Promise(((resolve, reject) => {
        const worker = new worker_threads.Worker('./utils/findText/workers/findText-fast.worker.js', {
            workerData: {
                file: file,
                searchText: searchText,
            }
        });

        worker.on('message', resolve);
        worker.on('error', reject);
    }));
};

module.exports = findText;
