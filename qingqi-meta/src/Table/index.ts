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
        xh: '',
        action: false,
        size: "default",
        style: {
            width: '1000px'
        },
        data: [{
            date: '2016-05-03',
            name: 'Tom',
            age: "18",
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            age: "19",
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            age: "20",
        }],
        column: [
            {
                fixed: 'left',
                prop: "date",
                label: "date",
                width: '180',
            },
            {
                prop: "name",
                label: "name",
                width: '200'
            },
            {
                fixed: 'right',
                prop: "age",
                label: "age",
                width: '180'
            }
        ]
    },
    btns: [],
    btnprops: {
        fixed: 'right',
        label: "操作",
        width: '180'

    }
}