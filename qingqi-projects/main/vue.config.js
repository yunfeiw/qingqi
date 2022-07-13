/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-29 20:22:15
 */
const { name } = require('./package.json');
const { resolve } = require('path')
module.exports = {
  devServer: {
    port: 8099,
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve('src'))
  }
}
