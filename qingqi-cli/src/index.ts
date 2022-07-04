/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 20:09:11
 */
import parser from 'yargs-parser'
import fs from 'fs'
import chalk from 'chalk'

const argv = parser(process.argv.slice(2));
const cmd = argv._[0]

async function run() {
    switch (cmd) {
        case "start":
            break;
    }
}

