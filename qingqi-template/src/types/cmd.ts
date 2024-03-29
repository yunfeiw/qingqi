/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 15:03:09
 */
import { resolve } from "path"

export type CMD = {
    type: string,
    name: string,
    dir: boolean,
    feature: 'List' | 'Modal' | 'Drawer' | 'Tabs',
    // contens: ['form' | 'table'],
    forms: ['input' | 'select' | 'month' | 'date' | 'multiple-select' | 'formshow' | 'formsearch' | 'void'],
    table: ['selection' | 'action' | 'slot' | 'void'],
    other: ['save' | 'delete' | 'donwload' | 'upload' | 'void']
}

export class Cmd {
    private cwd: string
    constructor(private cmd: CMD) {
        this.cwd = resolve(process.cwd(), cmd.name)
    }
    // 地址
    public getCwd() {
        return this.cwd
    }
    // 文件名
    public getName() {
        return this.cmd.name
    }
    // 类型
    public getType() {
        return this.cmd.type
    }
    // 是否生成文件夹
    public getDir() {
        return this.cmd.dir
    }
    // 页面类型
    public getFeature() {
        return this.cmd.feature
    }
    // 页面元素
    // public getContens() {
    //     return this.cmd.contens
    // }
}