/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 14:44:39
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import inquirer from 'inquirer'
import { resolve } from 'path';
import { Project } from './Project';
export class ProjectCreator {
    public async create() {
        const result = await inquirer.prompt([
            {
                type: 'list',
                choices: ['vue-cli', 'vue-qiankun'],
                messgae: "请选择项目类型",
                name: 'type'
            },
            {
                type: "input",
                messgae: "请输入项目名称",
                name: 'name',
                default: "creator-project"
            }
        ])

        const project = new Project(result.type, result.name);

        // copy 文件
        this.createProjectFromTemplate(project)
    }

    public createProjectFromTemplate(project: Project) {
        const templateDir = resolve(project.getName(), __dirname, '../../../qingqi-projects', project.getType())
        console.log(templateDir);
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
            }
        );

    }

    private recursiveCopy(from: string, to: string, envs: Record<string, string>) {
        // 目录不存在
        if (!existsSync(to)) {
            mkdirSync(to)
        }

        const files = readdirSync(from);
        // 分析
        files.forEach(file => {
            // 拼接地址
            const fullnameFrom = resolve(from, file);
            const fullnameTo = resolve(to, file);
            // 目录递归
            if (statSync(fullnameFrom).isDirectory()) {
                this.recursiveCopy(fullnameFrom, fullnameTo, envs);
                return
            }

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