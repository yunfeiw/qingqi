/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-02-01 15:16:18
 */

export const table = {
    type: 'table',

    x: 0,

    y: 0,

    api: "",

    props: {
        border: true,
        size: "default",
        style: {
            width: '1000px'
        },
        data: [{
            date: '2016-05-03',
            name: 'Tom',
            bb: "飞机",
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            bb: "坦克",
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            bb: "大炮",
            address: 'No. 189, Grove St, Los Angeles',
        }],

        column: [
            {
                fixed: 'left',
                prop: "date",
                label: "Date",
                width: '200',
            },
            {
                prop: "name",
                label: "name",
                width: '200'
            },
            {
                prop: "name",
                label: "aa",
                width: '300'
            },
            {
                prop: "bb",
                label: "bb",
                width: '300'
            },
            {
                fixed: 'right',
                prop: "address",
                label: "address",
                width: '300'

            }
        ]
    }
}