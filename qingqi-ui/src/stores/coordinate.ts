/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-13 15:47:57
 */
import { defineStore } from 'pinia'

export const useCoordinate = defineStore('coordinate', {
    state: () => {
        return { target: {} as HTMLDivElement, flag: false, offX: 0, offY: 0, '_id': '' }
    },
    actions: {
        setXY(offsetX: number, offsetY: number) {
            this.offX = offsetX;
            this.offY = offsetY;
        },
        setFlag(state: boolean) {
            this.flag = state;
        },
        setTarget(e: HTMLDivElement, id: string) {
            this.target = e;
            this['_id'] = id
        }
    }
})


