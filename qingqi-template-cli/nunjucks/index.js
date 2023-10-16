/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-16 10:45:45
 */
const fs = require('fs')
const moment = require('moment');
const nunjucks = require('nunjucks')

let res = nunjucks.render('index.vv', {
    '@foo': "hello world",
    "@Data": moment().format("YYYY-MM-DD HH-mm-ss"),
    arr: [
        { name: 'a' },
        { name: 'd' },
    ]
})

// 写入
fs.writeFile('./build.vue', res, () => {
    console.log()
})
