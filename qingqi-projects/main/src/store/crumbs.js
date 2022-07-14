/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-14 17:32:50
 */
export default {
    state: {
        crumbs: []
    },
    mutations: {
        addCrumbs(state, data) {
            state.crumbs = [...state.crumbs, data]
        },
        rmCrumbs(state, key) {
            let { crumbs } = state;
            state.crumbs = crumbs.filter(e => e.key != key);
        }
    },
    actions: {
        addCrumbs({ commit }, data) {
            // // 校验
            // let res = crumbs.some(e => e.key == data.key)

            // if (!res) {
            commit('addCrumbs', data)
            // } else {
            //     console.warn('当前Tab已存在！')
            // }
        },
        rmCrumbs({ commit }, key) {
            console.log('key is', key);
            commit('rmCrumbs', key);
        }
    }
}