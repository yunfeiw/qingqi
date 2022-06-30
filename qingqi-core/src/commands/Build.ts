/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-30 17:45:10
 */

import Command from "../interface/Command";
import BasePro from '../class/BasePro';

export default class Build extends BasePro implements Command {
    name: string = 'build'
    constructor() {
        super('npm run build')
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