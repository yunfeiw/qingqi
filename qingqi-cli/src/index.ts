/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 20:09:11
 */
import chalk from 'chalk';
import parser from 'yargs-parser'
import { loadProjects } from './loadProjects'

const argv = parser(process.argv.slice(2));
const cmd = argv._[0]


const projects = loadProjects()

async function run() {
    switch (cmd) {
        case "start":
            projects.start()
            break
        case "list":
            projects.listProjects()
            break
        case "reinstall":
            projects.reinstall()
            break
        case "install":
            projects.install()
            break
        case "install-link":
            projects.installLinks(argv.name)
            break
        case "build-ts":
            projects.buildTS(argv.name)
            break
        default:
            console.log(chalk.red('Command not find!'));

    }
}

run()