import moment from 'moment';
import { render } from 'nunjucks';
import { writeFileSync } from 'fs';

import { Cmd, CMD_TYPES } from './types/cmd.js';
// 时间
const DATE = moment().format('YYYY年MM月DD日 HH:mm:ss');

export default class CreatePage {
    constructor(cmd: CMD_TYPES) {
        let obj = new Cmd(cmd);
    }
}

