/*
 * @Descripttion: 自定义界面
 * @Author: yunfei
 * @Date: 2023-10-17 16:05:58
 */
import { writeFileSync } from 'fs';
import inquirer from 'inquirer'
import { CreatePage } from '@qingqi/page-cli'
import { resolve } from 'path'

export class CustomPage {
    public async create() {
        let result = await inquirer.prompt([
            {
                type: 'list',
                choices: ['vue', 'jsx', 'jsp', 'html'],
                message: "请选择生成的语法",
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
            },
            {
                type: 'list',
                choices: ['List', 'Modal', 'Drawer'],
                message: "请选择生成的语法",
                name: 'feature'
            },
            {
                type: 'checkbox',
                choices: ['input', 'select', 'month', 'date', 'multiple-select', 'formshow', 'void'],
                message: "请选择表单元素",
                name: 'forms',
            },
            {
                type: 'checkbox',
                choices: ['selection', 'action', 'slot', 'void'],
                message: "请选择table元素",
                name: 'table',
            },
            {
                type: 'checkbox',
                choices: ['delete', 'donwload', 'upload', 'void'],
                message: "其他元素",
                name: 'other',
            },
        ])
        new CreatePage(result)
    }
}