/*
 * @Descripttion: 命令转换
 * @Author: yunfei
 * @Date: 2022-06-30 11:11:20
 */

export default (str: any) => {
    const [a, ...others] = [...str];
    return a.toUpperCase() + others.join('');
}