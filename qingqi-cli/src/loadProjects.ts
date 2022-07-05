/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 20:44:58
 */
import { readdirSync, statSync } from 'fs'
import path, { resolve } from 'path'
import { Package } from './package'
import Packages from './packages'

function* walk(pattern: RegExp, dir: string, exclude: RegExp): Generator<any> {

    const files = readdirSync(dir)

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fullname = path.resolve(dir, file)
        if (fullname.match(exclude)) {
            continue
        }
        if (fullname.match(pattern)) {
            yield [file, dir]
        }
        if (statSync(fullname).isDirectory()) {
            yield* walk(pattern, fullname, exclude)
        }
    }
}
export function loadProjects(): Packages {
    const result = [...walk(/package\.json$/, resolve(__dirname, '../../'), /(node_modules|\.git|qingqi-template|qingqi-cli|qingqi-core)/)]

    return new Packages(result.map(([file, dir]) => new Package(file, dir)))
}