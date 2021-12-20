#!/usr/bin/env node
const http = require("http");
const fs = require('fs');
const url = require('url');
const path = require('path');


const host = 'localhost';
const port = 8000;
const dir = process.cwd();


const isDir = (filename) => fs.lstatSync(filename).isDirectory();
const fileList = (dir) => {
    return ['../', ...fs.readdirSync(dir, { withFileTypes: true }).map(file => file.isDirectory() ? file.name + '/' : file.name)];
}

const requestListener = (req, res) => {
    if (req.method === 'GET') {
        try {
            const { pathname } = url.parse(req.url, false);
            if (isDir('.' + pathname)) {
                const filenames = fileList('.' + pathname);
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                });
                res.write(`<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <title>Hello Node JS</title>
                            </head>
                            <body>
                            <h1>${pathname}</h1>`);
                filenames.forEach(file => {
                    res.write(`<a href="${pathname}${file}">${file}</a></br>`);
                });
                res.write(`</body>
                           </html>`);
                res.end();
            } else {
                const readStream = fs.createReadStream('.' + pathname);
                res.writeHead(200);
                readStream.pipe(res);
            }
        } catch (error) {
            console.log(error);
            res.writeHead(500);
            res.end('Internal server error');
        }
    } else {
        res.writeHead(405);
        res.end('HTTP method not allowed');
    }

}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

