/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-30 20:36:58
 */
import { readdirSync } from 'fs'
import cmd from '../func/cmd'

export default class BasePro {

    public subProgarms: Map<string, string>
    private command: string
    constructor(props: string) {
        this.subProgarms = new Map();
        this.command = props;
    }
    // 收集项目
    public async collectProject() {
        const cwd = process.cwd();
        const Projects = readdirSync(cwd);

        Projects.forEach((name) => {
            this.subProgarms.set(name, `${cwd}\\${name}`)
        })

        this.startTask();
    }
    // 开启
    public startTask() {
        const projects = [...this.subProgarms];
        while (projects.length) {
            // 当前服务
            const [name, url] = projects.pop();
            this.runCmd(name, url);

            if (projects.length == 0) {
                setTimeout(() => {
                    process.exit(-1)
                }, 1000)
            }
        }
    }
    // cmd
    public runCmd(name: string, url: string, cb?: () => void) {
        // 启动服务
        
        cmd(
            `start cmd /k "cd ${url} && ${this.command}"
`,
            (data) => {
                if (data) {
                    console.log(`微服务 *${name}* 异常`, data)
                }
                console.log('ok');
            }
        );

        cb && cb();
    }
}