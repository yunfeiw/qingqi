/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-05 17:28:20
 */
const { readFileSync } = require("fs");
const { resolve } = require("path");
console.log(readFileSync(resolve(__dirname, './help.txt'), 'utf-8'));
