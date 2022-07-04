const { name } = require('./package.json');

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
}
