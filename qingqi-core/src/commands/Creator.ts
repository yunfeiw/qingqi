/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 14:23:11
 */
import BasePro from "../class/BasePro"
import { ProjectCreator } from "../class/ProjectCreator";
import Command from "../interface/Command";

export default class Creator extends BasePro implements Command {
    name: string = 'Creator'
    async run(argv: any) {
        let project = new ProjectCreator();
        project.create();
    }
}