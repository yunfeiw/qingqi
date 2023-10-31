/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-30 20:44:11
 */
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs';
import { base } from '../../../static/globaljs/global.js' // 根据需求是否导入qs模块

const {{ apiname }} = {
    // 列表
    list(params) {
        return axios.get(`${base.sq + base.version}/taskWarningConfig/list?` + qs.stringify(params))
    },
    // 启用-停用
    startAndStop(params) {
        return axios.get(`${base.sq + base.version}/taskWarningConfig/startAndStop?` + qs.stringify(params))
    },
    // 任务类型
    taskType(params) {
        return axios.get(`${base.sq + base.version}/taskWarningConfig/taskType?` + qs.stringify(params))
    },
    // 下载
    downLoadXmlTwo(params) {
        return axios.get(`${base.sq + base.version}/gtbtVersionReportZhb/downLoadXmlTwo?` + qs.stringify(params), { responseType: 'blob', timeout: 60000 });
    },
}

export default {{ apiname }}