/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-30 18:42:52
 */
const cmds = require('node-cmd');

export default (command: string, callback: (data: any) => void) => {
    cmds.run(command, callback);
}
