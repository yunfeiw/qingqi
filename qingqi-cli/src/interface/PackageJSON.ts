/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 20:49:45
 */
export interface PackageJSON {
    name: string,
    version: [number, number, number],
    main: string,
    qingqi?: {
        devLinks?: string[],
        type?: 'service' | 'app' | 'lib' | 'cli'
    },
    dependencies: {
        [dep: string]: string,
    },
    devDependencies: {
        [dep: string]: string
    }
}