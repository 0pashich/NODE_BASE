const fs = require('fs');
const ACCESS_LOG = './access.log';
const { Transform } = require('stream');

const IP_ARR = [
    '89.123.1.41',
    '34.48.240.111'
]
const readStream = fs.createReadStream(ACCESS_LOG,
    {
        flags: 'r',
        encoding: 'utf-8',
        // autoClose
        // start
        // end
        // highWaterMark: 164,
    }
);


IP_ARR.forEach(ip => {

    const writeStream = fs.createWriteStream(
        `${ip}_requests.log`,
        {
            encoding: 'utf-8',
            flags: 'a',
        }
    );
    const regexp = new RegExp(`^${ip}.*$`, 'gm')
    var lastStingOfChunk = '';

    const tStream = new Transform({
        transform(chunk, encoding, callback) {
            const chunkWithoutLastString = chunk.toString().match(/(.*)\n/gs).join();
            const transformedChunk = (lastStingOfChunk + chunkWithoutLastString).match(regexp) ? (lastStingOfChunk + chunkWithoutLastString).match(regexp).join('\n') + '\n' : '';
            lastStingOfChunk = chunk.toString().match(/\n(.*$)/)[1];
            this.push(transformedChunk);

            callback();
        }
    });

    readStream
        .pipe(tStream)
        .pipe(writeStream);
})