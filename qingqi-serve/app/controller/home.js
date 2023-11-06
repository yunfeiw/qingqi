/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-01 17:11:22
 */
'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      name: 'yunfei',
      age: 18
    };
    // ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
