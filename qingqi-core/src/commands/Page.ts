/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 14:23:11
 */
import { PageCreator } from "../class/PageCreator";
import Command from "../interface/Command";

export default class Page implements Command {
    name: string = 'page'
    async run(argv: any) {
        let page = new PageCreator();
        page.create();
    }
}