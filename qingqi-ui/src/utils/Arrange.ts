/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-14 18:29:56
 */
let objs = {
    "_1": { id: 1, x: 30, y: 50 },
    '_2': { id: 2, x: 80, y: 50 },
    '_3': { id: 3, x: 160, y: 50 },
    '_4': { id: 4, x: 30, y: 100 },
    '_5': { id: 5, x: 80, y: 100 },
    '_6': { id: 6, x: 160, y: 100 },
}
export const Arrange = () => {
    let res = Object.keys(objs)
    res = res.map(e => objs[e])
}