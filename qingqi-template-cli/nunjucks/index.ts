/*
 * @Descripttion: 解析命令
 * @Author: yunfei
 * @Date: 2023-10-13 16:55:31
 */
import { compileFile } from 'pug'
import { resolve } from 'path'
import { writeFile } from 'fs'

const compiledFunction = compileFile(resolve(__dirname, './tmp/vue.pug'));

const context = compiledFunction({
    name: 1,
    bb: { name: '1' }
})

writeFile(resolve(__dirname, 'index.vue'), context, (err) => {
    console.log(err)
})