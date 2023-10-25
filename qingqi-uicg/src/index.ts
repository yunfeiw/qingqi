/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-13 16:55:31
 */
// import { render, renderString, compile } from 'nunjucks';
import nunjucks from 'nunjucks';
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { resolve, join } from 'path'
import { CMD } from './types/cmd';
import { ParseCmd } from './class/ParseCmd';

export class CreatePage {
    constructor(private cmd: CMD) {
        this.run(new ParseCmd(cmd));
    }

    private async run(cmd: ParseCmd) {
        nunjucks.configure(join(__dirname, '../template/'), { autoescape: true });
        nunjucks.render(cmd.getFeature() + '.ejs', cmd.getCmd(), (err,res) => {
            this.write(res, cmd)
        })
    }
    private write(content: string, cmd: ParseCmd) {
        console.log('content',content)
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