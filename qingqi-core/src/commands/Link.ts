/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 09:51:23
 */
import { resolve } from 'path'
import { readFileSync, readdirSync, existsSync } from 'fs'
import chalk from "chalk";

import { runCwd } from '../func/cmdRunner'
import BasePro from "../class/BasePro";
import Command from "../interface/Command";
export default class Link extends BasePro implements Command {
    name: string = 'link'
    constructor() {
        super('npm link')
    }

    async run() {
        this.collect()
    }

    // 收集lib项目
    async collect() {
        const cwd = process.cwd();
        const dirs = readdirSync(cwd);

        dirs.forEach(e => {
            const url = resolve(cwd, e, 'package.json')

            try {
                // 是否存在 json
                if (existsSync(url)) {
                    const content = JSON.parse(readFileSync(url, 'utf-8'))
                    //  项目类型 
                    if (content?.qingqi?.type == 'lib') {
                        this.subProgarms.set(e, `${cwd}\\${e}`)
                    }
                }
            } catch (err) {
                console.error(chalk.red(`异常：【${e}】项目解析异常！`));
            }

        })
        // 收集完成
        this.startTask();

    }
    // 开启
    public async startTask() {
        const projects = [...this.subProgarms];
        while (projects.length) {
            // 当前服务
            const [name, url] = projects.pop();
            await runCwd(`${name} link`, { cwd: url });
        }
    }
}