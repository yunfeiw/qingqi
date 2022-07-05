/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 20:21:32
 */

import chalk from "chalk";
import { readFileSync } from "fs";
import { resolve } from "path";
import { runCmd } from "./func/cmdRunner";
import { PackageJSON } from "./interface/PackageJSON";

export class Package {
    private fullname: string
    private dir: string
    private json: PackageJSON

    constructor(file: string, dir: string) {
        this.fullname = resolve(dir, file)
        this.dir = dir
        const _json = this.parseJSON(readFileSync(this.fullname, 'utf-8'))
        // 版本号
        if (_json.version) {
            _json.version = _json.version.split(".").map(e => parseInt(e))
        }
        this.json = _json;
    }

    // 转json
    private parseJSON(str: string) {
        try {
            return JSON.parse(str)
        } catch (err) {
            console.error("parse json error @" + this.fullname);
            throw err
        }
    }
    // 初始化
    public async reNpmInstall() {
        await this.npmClear();
        await this.npmInstall();
    }
    // 删除本地包
    public async npmClear() {
        await this.exec("rm -rf ./package-lock.json", true)
        await this.exec("rm -rf ./node_modules", true)
    }

    // 初始化
    public async npmInstall() {
        await this.exec('npm install');
    }
    // link
    public async link() {
        console.log(chalk.cyanBright(`link ${this.getName()}`));

        if (this.getType() != 'cli') {
            await this.exec('npm unlink')
            await this.exec('npm link')
        } else {
            await this.exec('npm link --force')
        }

    }
    // 关联
    public async linkDev() {
        for (let link of this.getLinks()) {
            await this.exec(`npm link ${link}`)
        }
    }
    // 编译
    public async buildES() {
        if (["app", "cli"].indexOf(this.getType()) !== -1) {
            return
        }
        console.log(chalk.bold(chalk.yellow("build:" + this.getName())))

        await this.exec("tsc")
    }
    // 运行
    private async exec(cmd: string, silent = false, envs: any = {}) {
        await runCmd(cmd, {
            env: {
                ...process.env,
                ...envs
            },
            cwd: this.dir,
        }, silent)
    }

    public getType() {
        return this.json.qingqi?.type
    }

    public getLinks() {
        return this.json.qingqi?.devLinks || []
    }

    public getName() {
        return this.json.name
    }
    	
	public getVer() {
		return this.json.version
	}
}