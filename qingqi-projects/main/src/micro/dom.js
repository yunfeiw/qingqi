/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-14 19:10:20
 */

// 隐藏
export const hideMicro = () => {
    document.querySelector("#micro_container").childNodes.forEach((e) => {
        e.classList.add("micro-hide");
    });
}
// 显示
export const showMicro = (dom) => {
    if (!dom) console.warn('微服务节点不存在！');
    hideMicro();
    dom && dom.classList.remove("micro-hide");
}
// 创建
export const createDOM = (name) => {
    const container = document.createElement("div");
    container.classList.add("micro-item");
    container.setAttribute("micro-name", name);
    // 隐藏
    hideMicro();
    // append
    document.querySelector("#micro_container").appendChild(container);
    return container;
}
// 删除
export const removeAutoDom = (dom) => {
    // 节点
    let nextDOM = dom.previousSibling || dom.nextSibling;
    // 隐藏
    hideMicro();
    // 删除节点
    dom.remove();
    // 展示
    nextDOM && nextDOM.classList.remove("micro-hide");
}

export const rmMircoDom = (dom) => {
    // 删除节点
    dom.remove();
}