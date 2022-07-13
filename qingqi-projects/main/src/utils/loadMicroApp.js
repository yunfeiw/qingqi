/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-13 18:18:07
 */
import { loadMicroApp } from 'qiankun'

export const loadApp = (option) => {

    // 封住一层，用于特殊处理
    return new Promise((result, reject) => {

        const app = loadMicroApp(option)
        // 服务状态·
        app.mountPromise.then(() => {
            result(app);
        }).catch(err => {
            reject(err);
        })
    })
}