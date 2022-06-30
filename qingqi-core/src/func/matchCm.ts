/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-30 15:16:00
 */
import { readdirSync } from 'fs'

export default (dir: string, cmd: string | number): boolean => {
    return readdirSync(dir).includes(`${cmd}.js`)
}