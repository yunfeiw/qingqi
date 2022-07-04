/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 11:18:38
 */
import { exec, ExecOptions } from 'child_process';
import chalk from 'chalk';
import { resolve } from 'path';
export function runCwd(command: string, options?: ExecOptions, silent = false): Promise<void> {
    console.log(chalk.yellow(`cwd(${options.cwd})`));
    console.log(chalk.blueBright(`run command> ${command}`));
    // 兼容处理
    if (process.platform == 'win32') {
        command = `@chcp 65001 >nul & cmd /d/s/c ${command}`
    }
    return new Promise((res, rej) => {
        try {
            const proc = exec(command, options);
            proc.stdout.on('data', (chunk: string) => {
                console.log(chunk);
            })
            proc.stderr.on('data', (chunk: string) => {
                console.log(chunk);
            })
            proc.on('close', () => {
                res()
            })
        } catch (ex) {
            if (silent) {
                console.log(ex.message);
                res();
                return
            }
            rej(ex)
        }
    })
}