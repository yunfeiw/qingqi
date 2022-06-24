type ObserverFunction = (data: any) => void

export class Emiter<Topic extends string | number> {

    private observers: Map<Topic, ObserverFunction[]>

    constructor() {
        this.observers = new Map();
    }

    private addObserverFun(topic: Topic, fn: ObserverFunction) {
        // 是否存在
        if (!this.observers.get(topic)) {
            this.observers.set(topic, []);
        }
        // 存储
        this.observers.get(topic).push(fn);
    }
    cancellation(topic: Topic) {
        this.observers.get(topic) && this.observers.delete(topic);
    }
    on(topic: Topic | Topic[], fn: ObserverFunction) {
        // 数组
        if (Array.isArray(topic)) {
            topic.forEach(t => {
                this.addObserverFun(t, fn);
            })
        } else {
            this.addObserverFun(topic, fn);
        }
    }
    emit(topic: Topic, data?: any) {
        this.observers.get(topic)?.forEach(fn => {
            fn(data);
        })
    }
}