#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const inquirer = require('inquirer');
const findText = require('./utils/findText/');

const options = yargs
    .usage('Usage: -p <path to the file> -s <search string>')
    .option({
        'path': {
            alias: 'p',
            describe: 'Path to file',
            type: 'string'
        },
        'search': {
            alias: 's',
            describe: 'Search string in file',
            type: 'string'
        }
    }
    ).argv;

let executionDir = process.cwd();
if (options.path != null) { executionDir = options.path }

const isDir = (filename) => fs.lstatSync(filename).isDirectory();
const fileList = (dir) => ['..', ...fs.readdirSync(dir)];
let tick = 0

let timerId = setInterval(() => console.log('tick', tick++), 10000);

const run = (dir) => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'file',
                message: `${dir}: choose a file`,
                choices: fileList(dir),
                loop: false,
                pageSize: 10
            }
        ])
        .then(({ file }) => {
            const fullPath = path.join(dir, file);
            if (isDir(fullPath)) { run(fullPath) }
            else {
                if (options.search != null) {
                    return findText(fullPath, options.search);
                } else {
                    const readStream = fs.createReadStream(fullPath, 'utf-8');
                    readStream.pipe(process.stdout);
                }

            }
        })
        .then(text => {
            console.log(text);
            clearInterval(timerId);
        },
            error => console.log(error));
}

run(executionDir);


