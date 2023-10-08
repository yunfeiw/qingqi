/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 16:56:03
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import inquirer from 'inquirer'
import { resolve } from 'path';
import { Project } from './Project';

const MAPS = {
    'vue': {
        "默认列表": 1,
        "下拉多选": 2,
        "折叠查询": 3,
        "弹出层": 4,
        "抽屉": 5,
        "tab列表": 6,
        "tree列表": 7,
    },
    'jsx': {
        "默认列表": 1
    }
}

export class PageCreator {
    public async create() {

        // 文件
        let fileResult = await inquirer.prompt([
            {
                type: 'list',
                choices: ['vue', 'jsx', 'jsp', 'html'],
                message: "请选择page类型",
                name: 'type'
            },
            {
                type: 'checkbox',
                choices: ['默认列表', '下拉多选', '折叠查询', '弹出层', '抽屉', 'tab列表', 'tree列表'],
                message: "请选择页面元素内容",
                name: 'feature'
            },

            // ])

            // await inquirer.prompt([
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
        // .then(res => {
        //     fileResult = { ...fileResult, ...res }
        // })

        // 文件类型
        let features = fileResult.feature.map(e => MAPS[fileResult.type][e])

        const project = new Project(fileResult.type, fileResult.name, fileResult.dir, `${fileResult.type}${features.join('')}`);
        // copy 文件
        this.createProjectFromTemplate(project)
    }

    public createProjectFromTemplate(project: Project) {
        const templateDir = resolve(project.getName(), __dirname, '../../../qingqi-template/page', project.getFeature())
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
        console.log(!existsSync(to))

        if (!existsSync(to) && project.getDir()) {
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