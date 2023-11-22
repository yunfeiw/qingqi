import { defineStore } from 'pinia'

export const useItems = defineStore('items', {
    state: () => {
        return {
            list: {}
        }
    },
    actions: {
        setItem(item: { _id: string }) {
            this.list = { ...this.list, [item._id]: item }
        },
        rm(key: string) {
            let list: any = { ...this.list }
            delete list[key]
            this.list = list
        }
    }
})