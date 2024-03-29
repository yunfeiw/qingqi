/*
 * @Descripttion: 元素序列，感觉差点意思
 * @Author: yunfei
 * @Date: 2023-11-14 18:29:56
 */

const THRESHOLD: number = 8;

export const Arrange = (objs: any) => {
    let res = []
    for (let key in objs) {
        res.push(objs[key])
    }

    // 分组（依据 Y）
    let obj: any = {}
    res.forEach(e => {
        // 判断是否存在值
        let nums = Object.keys(obj);
        if (nums.length) {
            let flag = true
            // 比较
            nums.forEach((n: any) => {
                n = Number(n)
                if ((n - THRESHOLD) < e.y && e.y < (n + THRESHOLD)) {
                    obj[n].push(e);
                    flag = false;
                }
            })
            if (flag) {
                obj[e.y] = [e]
            }
        } else {
            obj[e.y] = [e]
        }
    })

    // 组排序
    let rows = Object.keys(obj)
    let rowSort = rows.sort((a: any, b: any) => a - b)

    // 组内排序
    rows.forEach(key => {
        obj[key] = obj[key].sort((a: any, b: any) => a.x - b.x)
    })

    // 组合
    let compons: any = []
    rowSort.forEach(key => {
        compons.push(...obj[key])
    })

    return compons
}
