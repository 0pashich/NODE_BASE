#!/usr/bin/env node
const fs = require('fs');
// const fs = require('fs/promises');
const yargs = require('yargs');
const readline = require('readline');
const path = require('path');
const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt')

// const [path] = process.argv.slice(2);
// // console.log(path);
// const data = fs.readFileSync(path)
// console.log(data);

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

console.log(options);
let executionDir = process.cwd();
// @ts-ignore
if (options.path != null) { executionDir = options.path }

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('Введите путь до файла: ',(filePath) => {
//     console.log(filePath);
//
//     rl.question('Введите поисковый запрос: ',(searchString) => {
//         console.log(searchString);
//         rl.close();
//     });
// });

// const question = async (query) => new Promise(resolve => rl.question(query, resolve));
//
// (async () => {
//     const filePath = await question('Введите путь до файла: ');
//     const encoding = await question('Введите кодировку файла: ');
//
//     // const fullPath = path.join(__dirname, filePath);
//     const fullPath = path.resolve(__dirname, filePath);
//     const data = await fs.readFile(fullPath, encoding);
//
//     console.log(data);
//     rl.close();
// })();


// inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
const isFile = (filename) => fs.lstatSync(filename).isFile();
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
            // console.log(dir);
            // console.log(fileList(dir));
            const fullPath = path.join(dir, file);
            if (isDir(fullPath)) { run(fullPath) }
            else {
                const data = fs.readFileSync(fullPath, 'utf-8');
                // @ts-ignore
                if (options.search != null) {
                    // @ts-ignore
                    // console.log(data);
                    const regexp = new RegExp(`^.*(${options.search}).*$`, 'gm');
                    // console.log(regexp);
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



// const executionDir = process.cwd();
// const isFile = (filename) => fs.lstatSync(filename).isFile();
// const fileList = fs.readdirSync(executionDir).filter(isFile);

// inquirer.prompt([
//     {
//         name: 'fileName',
//         type: 'list', // input, number, confirm, list, checkbox, password
//         message: 'Введите путь до файла: ',
//         choices: fileList,
//     }
// ]).then(({ fileName }) => {
//     const fullPath = path.join(executionDir, fileName);
//     const data = fs.readFileSync(fullPath, 'utf-8');

//     console.log(data);
// });
