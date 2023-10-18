/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-17 16:17:54
 */
import { resolve } from 'path'
import { CMD } from '../types/cmd'

import { DrawerCmd } from './DrawerCmd'
import { ListCmd } from './ListCmd'
import { ModalCmd } from './ModalCmd'
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

        let newcmd = {
        }
        if (cmd.feature == 'Drawer') {
            newcmd = DrawerCmd(cmd)
        } else if (cmd.feature == 'Modal') {
            newcmd = ModalCmd(cmd)
        } else {
            newcmd = ListCmd(cmd)
        }

        this.newCmd = newcmd
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