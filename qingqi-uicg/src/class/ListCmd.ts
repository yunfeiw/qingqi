/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-17 16:17:54
 */
import moment from 'moment';
import { TxtLower } from '@qingqi/utils'
import { CMD } from '../types/cmd'


export const ListCmd = (cmd: CMD) => {
    return {
        ...cmd,
        apiname: cmd.name.split('-').map(e => TxtLower(e)).join(''),
        "@date": moment().format('YYYY年MM月DD日 HH:mm:ss'),
        form: !cmd.forms.includes('void'),
        table: !cmd.table.includes('void'),
        download: cmd.other.includes('donwload'),
        upload: cmd.other.includes('upload'),
        delete: cmd.other.includes('delete'),
        formshow: cmd.forms.includes('formshow'),
        tableselection: cmd.table.includes('selection'),
        tableaction: cmd.table.includes('action'),
    }
}