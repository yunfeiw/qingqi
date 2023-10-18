/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-13 16:55:31
 */
import { render } from 'nunjucks';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path'
import { CMD } from './types/cmd';
import { ParseCmd } from './class/ParseCmd';

export class CreatePage {
    constructor(private cmd: CMD) {
        this.run(new ParseCmd(cmd));
    }

    private run(cmd: ParseCmd) {
        const res = render(resolve(__dirname, `../template/${cmd.getFeature()}.ejs`), cmd.getCmd());
        this.write(res, cmd)
    }
    private write(content: string, cmd: ParseCmd) {
        // 文件夹
        if (cmd.getDir()) {
            let to = resolve(cmd.getCwd())
            let toFile = resolve(to, `index.${cmd.getFile()}`)
            // 目录是否存在
            if (!existsSync(to)) {
                mkdirSync(to)
            }
            writeFileSync(toFile, content, 'utf-8');
        } else {
            let toFile = resolve(`${cmd.getCwd()}.${cmd.getFile()}`)
            writeFileSync(toFile, content, 'utf-8');
        }
    }
}