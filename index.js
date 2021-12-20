#!/usr/bin/env node
const http = require("http");
const fs = require('fs');
const url = require('url');

// const yargs = require('yargs');
const path = require('path');
// const inquirer = require('inquirer');


const host = 'localhost';
const port = 8000;
const dir = process.cwd();

// const options = yargs
//     .usage('Usage: -p <path to the file> -s <search string>')
//     .option({
//         'path': {
//             alias: 'p',
//             describe: 'Path to file',
//             type: 'string'
//         },
//         'search': {
//             alias: 's',
//             describe: 'Search string in file',
//             type: 'string'
//         }
//     }
//     ).argv;

// let executionDir = process.cwd();
// if (options.path != null) { executionDir = options.path }
// fileObjs = fs.readdirSync(__dirname, { withFileTypes: true });
// console.log(fileObjs);

// console.log("\nCurrent directory files:");
// fileObjs.forEach(file => {
//     console.log(file.name, file.isDirectory());
// });



const isDir = (filename) => fs.lstatSync(filename).isDirectory();
const fileList = (dir) => {
    return ['../', ...fs.readdirSync(dir, { withFileTypes: true }).map(file => file.isDirectory() ? file.name + '/' : file.name)];
}

// console.log(fileList(__dirname));

// const run = (dir) => {
//     inquirer
//         .prompt([
//             {
//                 type: 'list',
//                 name: 'file',
//                 message: `${dir}: choose a file`,
//                 choices: fileList(dir),
//                 loop: false,
//                 pageSize: 10
//             }
//         ])
//         .then(({ file }) => {
//             const fullPath = path.join(dir, file);
//             if (isDir(fullPath)) { run(fullPath) }
//             else {
//                 const data = fs.readFileSync(fullPath, 'utf-8');
//                 if (options.search != null) {
//                     const regexp = new RegExp(`^.*(${options.search}).*$`, 'gm');
//                     const dataSearch = data.match(regexp);
//                     console.log(dataSearch.join('\n'));
//                     console.log('найдено совпадений: ', dataSearch.length )
//                 } else {
//                     console.log(data);
//                 }

//             }
//         });
// }

// run(executionDir);
// let fullPath = dir;
// let subPath = './';

const requestListener = (req, res) => {
    if (req.method === 'GET') {
        try {
            const { pathname } = url.parse(req.url, false);
            console.log(pathname);
            // console.log(req.url)
            // if (pathname != null) {
            //     fullPath = path.join(fullPath, String(pathname));
            //     subPath = path.join(subPath, String(pathname));
            // }
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

