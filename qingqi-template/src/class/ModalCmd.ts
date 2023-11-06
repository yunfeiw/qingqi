/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-17 16:17:54
 */
import moment from 'moment';
import { TxtLower } from '@qingqi/utils'
import { CMD } from '../types/cmd'

export const ModalCmd = (cmd: CMD) => {

    return {
        ...cmd,
        apiname: cmd.name.split('-').map(e => TxtLower(e)).join(''),
        "@date": moment().format('YYYY年MM月DD日 HH:mm:ss'),
        // 表单-显隐
        form: !cmd.forms.includes('void'),
        // 表单-查询
        formsearch: cmd.forms.includes('formsearch'),
        // 导入 && 导出
        download: cmd.other.includes('donwload'),
        upload: cmd.other.includes('upload'),
        // 删除
        delete: cmd.other.includes('delete'),
        // 保存
        save: cmd.other.includes('save'),
        // 列表
        tableselection: cmd.table.includes('selection'),
        table: !cmd.table.includes('void'),
        tableaction: cmd.table.includes('action'),
    }
}
