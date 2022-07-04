/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 16:56:03
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import inquirer from 'inquirer'
import { resolve } from 'path';
import { Project } from './Project';

export class PageCreator {
    public async create() {
        const result = await inquirer.prompt([
            {
                type: 'list',
                choices: ['vue', 'jsx', 'jsp', 'html'],
                message: "请选择page类型",
                name: 'type'
            },
            {
                type: "input",
                message: "请输入page名称",
                name: 'name',
                default: "index"
            },
            {
                type: "confirm",
                message: "是否生成文件夹",
                name: 'dir',
                default: false
            }
        ])

        const project = new Project(result.type, result.name, result.dir);

        // copy 文件
        this.createProjectFromTemplate(project)
    }

    public createProjectFromTemplate(project: Project) {
        const templateDir = resolve(project.getName(), __dirname, '../../../qingqi-template/page', project.getType())
        // 模板可能不存在
        if (!existsSync(templateDir)) {
            throw new Error(`type ${project.getType()} not supported`)
        }

        this.recursiveCopy(
            templateDir,
            resolve(project.getName()),
            {
                "PROJECT_NAME": project.getName(),
                "ROUTER_NAME": project.getName(),
            },
            project
        );

    }

    private recursiveCopy(from: string, to: string, envs: Record<string, string>, project: Project) {
        // 目录不存在
        if (!existsSync(to)) {
            mkdirSync(to)
        }

        const files = readdirSync(from);
        // 分析
        files.forEach(file => {
            // 拼接地址
            const fullnameFrom = resolve(from, file);
            const fullnameTo = project.getDir() ? resolve(to, file) : resolve(`${to}.${project.getType()}`);


            // 编译模板
            if (fullnameFrom.match(/.(html|json|js|jsxts|tsx|yml|yaml)/)) {
                // 替换内容
                const content = readFileSync(fullnameFrom, 'utf-8').replace(
                    /\{\{.*\}\}/g,
                    x => {
                        x = x.replace('{{', "");
                        x = x.replace('}}', "");
                        x = x.trim();
                        return envs[x] || '--'
                    }
                )

                writeFileSync(fullnameTo, content, 'utf-8')
            } else {
                copyFileSync(fullnameFrom, fullnameTo)
            }
        })
    }
}