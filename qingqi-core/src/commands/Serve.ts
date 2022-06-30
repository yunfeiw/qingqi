/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-30 19:51:58
 */

import Command from "../interface/Command";
import BasePro from '../class/BasePro';

export default class Serve extends BasePro implements Command {
    name: string = 'serve'
    constructor() {
        super('npm run serve')
    }
    async run(argv: any) {
        // 参数解析
        const { groupAndName } = argv;
        if (groupAndName) {
            this.runCmd(groupAndName, `${process.cwd()}\\${groupAndName}`, () => {
                setTimeout(() => {
                    process.exit(-1)
                }, 1000)
            })
            return
        }
        this.collectProject();
    }



}
