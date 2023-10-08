/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 15:03:09
 */
import { resolve } from "path"

export class Project {
    private cwd: string
    constructor(private type: string, private name: string, private dir?: string, private feature?: string,) {
        this.cwd = resolve(process.cwd(), name)
    }

    public getCwd() {
        return this.cwd
    }
    public getName() {
        return this.name
    }
    public getType() {
        return this.type
    }
    public getFeature() {
        return this.feature
    }
    public getDir() {
        return this.dir
    }
}