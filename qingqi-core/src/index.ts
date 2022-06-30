#!/usr/bin/env node
/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-24 20:19:00
 */
import chalk from 'chalk';
import yargsParser from 'yargs-parser';

import Command from './interface/Command';

import { help } from './help';
import ucFirst from './func/ucFirst';
import matchCm from './func/matchCm';

// 命令提取
const args = yargsParser(process.argv);
const cmd: string | number = args._[2];

if (!cmd) {
    console.error(chalk.red('Command is needed!'));
    help();
    process.exit(-1);
}

// 设计语法
async function run() {
    let Cmd = ucFirst(cmd)
    if (matchCm(`${__dirname}/commands/`, Cmd)) {
        const cmdClass = require(`./commands/${Cmd}`).default;
        const inst: Command = new cmdClass();

        args.groupAndName = args._[3];
        try {
            // 运行
            await inst.run(args)
        } catch (ex) {
            console.error(ex)
        }
    } else {
        console.error(chalk.red(`Command [${cmd}] is needed! (ಥ _ ಥ )`));
        help();
        process.exit(-1);
    }
}

run()