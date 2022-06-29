#!/usr/bin/env node
console.log(1);

import parser from "yargs-parser";
// import { readFileSync } from "fs";
// import { resolve } from "path";
// // import chalk from "chalk";
const args = parser(process.argv);

const cmd: string | number = args._[2];

// // function help() {
// //     console.log(readFileSync(resolve(__dirname, "../help.txt"), "utf-8"));
// // }
// console.log(1111);

// 设计语法
async function run() {
    switch (cmd) {
        case "help":
            break;
        case "create":

            break;

        case "dev":
            // 开启监听

            break;

        default:
            throw new Error("Unsuported command " + cmd);
    }
}

// 异常捕获

run().catch((err) => {
});