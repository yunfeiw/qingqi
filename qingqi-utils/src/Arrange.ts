/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-14 18:29:56
 */
let objs: any = {
    '_5': { id: 5, x: 80, y: 95 },
    "_1": { id: 1, x: 30, y: 45 },
    '_3': { id: 3, x: 160, y: 40 },

    '_4': { id: 4, x: 30, y: 100 },
    '_2': { id: 2, x: 80, y: 50 },

    '_6': { id: 6, x: 160, y: 110 },
}
let threshold: number = 8;

export const Arrange = () => {
    let res = []
    for (let key in objs) {
        res.push(objs[key])
    }


    // 计算出几行 
    let obj: any = {}
    res.forEach(e => {
        // 判断是否存在值
        let nums = Object.keys(obj);
        if (nums.length) {
            let flag = true
            // 比较
            nums.forEach((n: any) => {
                n = Number(n)
                if ((n - threshold) < e.y && e.y < (n + threshold)) {
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

    console.log(obj)
    // 组排序
    let rows = Object.keys(obj)
    let rowSort = rows.sort((a: any, b: any) => a - b)

    // 组内排序
    rows.forEach(key => {
        obj[key] = obj[key].sort((a: any, b: any) => a.x - b.x)
    })

    // 组合
    let compons = []
    rowSort.forEach(key => {
        compons.push(...obj[key])
    })

    console.log('结果', compons)
    return compons;
}

Arrange()