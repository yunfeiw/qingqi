/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 14:23:11
 */
import { CustomPage } from "../class/CustomPage";
import Command from "../interface/Command";

export default class Custom implements Command {
    name: string = 'custom'
    async run(argv: any) {
        let page = new CustomPage();
        page.create();
    }
}