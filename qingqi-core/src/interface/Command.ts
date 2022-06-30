/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-30 14:17:07
 */
export default interface Command {
    name: string,
    run: (arg: any) => Promise<void>
}