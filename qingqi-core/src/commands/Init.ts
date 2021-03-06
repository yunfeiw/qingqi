/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-29 15:46:03
 */
import Command from "../interface/Command";
import BasePro from '../class/BasePro';

export default class Init extends BasePro implements Command {
    name: string = 'init'
    constructor() {
        super('npm install')
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
