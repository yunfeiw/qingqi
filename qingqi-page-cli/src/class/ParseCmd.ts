/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-17 16:17:54
 */
import { resolve } from 'path'
import moment from 'moment';
import { CMD } from '../types/cmd'


export class ParseCmd {
    private cwd: string
    private newCmd: {}
    private file: string
    private name: string
    private dir: boolean
    private feature: string
    
    constructor(private cmd: CMD) {
        this.cwd = resolve(process.cwd(), cmd.name)
        this.file = cmd.type;
        this.name = cmd.name;
        this.dir = cmd.dir;
        this.feature = cmd.feature;

        let obj = {
            ...cmd,
            "@date": moment().format('YYYY年MM月DD日 HH:mm:ss'),
            form: true,
            table: true,
            download: false,
            upload: false,
            delete: false,
            formshow: false,
            stableelection: false,
            tableaction: false,
        }

        // 表单（更多）
        obj.formshow = cmd.forms.includes('formshow')
        // 导入 && 导出
        obj.download = cmd.other.includes('donwload')
        obj.upload = cmd.other.includes('upload')
        // 删除
        obj.delete = cmd.other.includes('delete')
        // 列表
        obj.table = !cmd.table.includes('void')
        // 表单-显隐
        obj.form = !cmd.forms.includes('void')
        // 操作
        obj.tableaction = cmd.table.includes('action')
        // 复选框
        obj.stableelection = cmd.table.includes('selection')

        this.newCmd = obj
    }

    // 地址
    public getCwd() {
        return this.cwd
    }
    public getCmd() {
        return this.newCmd
    }
    public getFile() {
        return this.file
    }
    public getName() {
        return this.name
    }
    public getDir() {
        return this.dir
    }
    public getFeature() {
        return this.feature
    }
}