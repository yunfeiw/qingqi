import { resolve } from "path"

export class Project {
    private cwd: string
    constructor(private type: string, private name: string) {
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
}