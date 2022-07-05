/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 20:21:39
 */
import { Package } from './package'
import { resolve } from 'path'
import chalk from 'chalk';

export default class Packages {
    packages: Array<Package>
    // package: Package
    constructor(packages: Array<Package>) {
        // 过滤指定项目
        this.packages = packages.filter((x) => ['service', 'app', 'lib', 'cli'].includes(x.getType()))
        // this.package = new Package("package.json", resolve(__dirname, '../../'))

    }

    public async start() {
        for (let pkg of this.packages) {
            await pkg.reNpmInstall();
        }

        await this.installLinks();
        await this.buildTS();
    }

    // 初始化
    public async install() {
        this.packages.forEach(pkg => pkg.npmInstall());
    }

    // 
    public async reinstall() {
        for (let pkg of this.packages) {
            await pkg.reNpmInstall()
        }
        await this.installLinks()
        await this.buildTS()
    }
    // 项目列表

    public listProjects() {
        this.packages.forEach(pkg => {
            console.log('<pkg ' + pkg.getName() + "@" + pkg.getVer().join('.') + '>')
            console.log('  type', pkg.getType())
            console.log('  name', pkg.getName())
            console.log('  version', pkg.getVer().join('.'))
            console.log('  links', pkg.getLinks().join(' '))
        })
    }
    // 关联项目依赖
    private async installLink(name: string, level: number = 0) {

        const pkg = this.packages.find(x => x.getName() === name)

        for (let link of pkg.getLinks()) {
            await this.installLink(link, level + 1)
        }
        await pkg.linkDev()

        if (level > 0) {
            await pkg.link()
        }
    }
    public async installLinks(name?: string) {
        if (name) {
            this.installLink(name)
            return
        }

        const links = new Set();
        for (let pkg of this.packages) {
            // dev
            for (let link of pkg.getLinks()) {
                if (!links.has(link)) {
                    const pkgToLink = this.find(link);
                    if (!pkgToLink) {
                        throw new Error("Cannot find link:" + link);
                    }
                    // 执行
                    await pkgToLink.link()
                }
                links.add(link)
            }
        }
        // npm link xxx
        for (let pkg of this.packages) {
            await pkg.linkDev()
        }
    }
    // 编译lib服务
    public async buildTS(name?: string) {
        let pkgs: Array<Package>;

        if (name) {
            console.log(chalk.bgCyanBright('😫，裂开了；没实现'));
        } else {
            pkgs = this.packages.filter(pkg => pkg.getType() == 'lib');
        }

        const res = new Set();
        while (res.size != pkgs.length) {
            for (let pkg of pkgs) {
                // 已编译
                if (res.has(pkg)) {
                    continue
                }

                if (!pkg.getLinks().find(x => !res.has(x))) {
                    // 可编译
                    await pkg.buildES();
                    res.add(pkg.getName())
                }
            }
        }
    }
    // 查找
    public find(name: string): (Package | null) {
        return this.packages.find(x => x.getName() === name)
    }


}