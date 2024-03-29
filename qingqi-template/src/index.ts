/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-13 16:55:31
 */
// import { render, renderString, compile } from 'nunjucks'
import nunjucks from 'nunjucks'
import { writeFileSync, existsSync, readFileSync, mkdirSync, readdir } from 'fs'
import { resolve, join } from 'path'
import { CMD } from './types/cmd'
import { ParseCmd } from './class/ParseCmd'
import chalk from 'chalk'

export class CreatePage {
    constructor(private cmd: CMD) {
        this.run(new ParseCmd(cmd))
    }

    private async run(cmd: ParseCmd) {

        nunjucks.configure(join(__dirname, '../template/'), { autoescape: true })
        nunjucks.render(cmd.getFeature() + '.ejs', cmd.getCmd(), (err, res) => {
            this.write(res, cmd)
        })

        // list == List
        if (cmd.getFeature() == 'List') {
            this.createApi(cmd)
        }
    }
    // api
    private createApi(cmd: ParseCmd) {
        let toFile = resolve(`${cmd.getCwd()}.js`, '../')
        this.findPath(toFile).then((res: string) => {
            nunjucks.render('./api/index.js', cmd.getCmd(), (err, content) => {
                if (!err) {
                    try {
                        // already exists
                        new Promise((resp, rej) => {
                            readdir(resolve(res), (err, paths) => {
                                if (!err && paths.includes(`${cmd.getApiName()}.js`)) {
                                    rej()
                                } else {
                                    resp(true)
                                }
                            })
                        }).then(() => {
                            // write file
                            writeFileSync(resolve(res, `${cmd.getApiName()}.js`), content, 'utf-8')

                            let txt = readFileSync(resolve(res, `index.js`), 'utf-8')
                            txt = txt.replace('//##import', `import ${cmd.getApiName()} from '@/api/${cmd.getApiName()}.js'
                            //##import
                            `)
                            txt = txt.replace('//##export', `${cmd.getApiName()},
                            //##export
                            `)

                            writeFileSync(resolve(res, `index.js`), txt, 'utf-8')
                        }).catch(err => {
                            console.log(chalk.yellow(`${cmd.getApiName()} got it`))
                        })
                    } catch (err) {
                        console.log(chalk.red('api【index.js】 file not found'))
                        console.log('info', err)
                    }
                }
            })

        }).catch(err => {
            console.log(chalk.red(err))
        })

    }
    private findPath(path: string) {
        return new Promise((res, rej) => {
            readdir(path, (err, files) => {
                if (!err) {
                    if (files.includes('api')) {
                        // 在
                        res(resolve(path, 'api'))
                    } else {
                        // 当前是否在根目录
                        if (path == resolve(path, '../')) {
                            rej('目录【/api】不存在，无法生成接口')
                        } else {
                            // 不在
                            res(this.findPath(resolve(path, '../')))
                        }

                    }
                } else {
                    console.error('findpath err')
                }
            })
        })
    }

    // file
    private write(content: string, cmd: ParseCmd) {
        // 文件夹
        if (cmd.getDir()) {
            let to = resolve(cmd.getCwd())
            let toFile = resolve(to, `index.${cmd.getFile()}`)
            // 目录是否存在
            if (!existsSync(to)) {
                mkdirSync(to)
            }
            writeFileSync(toFile, content, 'utf-8')
        } else {
            let toFile = resolve(`${cmd.getCwd()}.${cmd.getFile()}`)
            writeFileSync(toFile, content, 'utf-8')
        }
    }
}