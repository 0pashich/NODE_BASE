#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const inquirer = require('inquirer');

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
                const data = fs.readFileSync(fullPath, 'utf-8');
                if (options.search != null) {
                    const regexp = new RegExp(`^.*(${options.search}).*$`, 'gm');
                    const dataSearch = data.match(regexp);
                    console.log(dataSearch.join('\n'));
                    console.log('найдено совпадений: ', dataSearch.length )
                } else {
                    console.log(data);
                }

            }
        });
}

run(executionDir);

