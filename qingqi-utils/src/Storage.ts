/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-13 17:21:22
 */

interface result {
    (name: string): ({})
}
// local
export const setLocaStorage = (name: string, value: string) => {
    localStorage.setItem(name, value);
}

export const getLocaStorage: result = (name: string) => {
    let v = localStorage.getItem(name);
    return v ? JSON.parse(v) : {};
}

export const rmLocaStorage = (name?: string) => {
    if (name) {
        localStorage.removeItem(name);
    } else {
        localStorage.clear()
    }
}

// session
export const setSessionStroage = (name: string, value: string) => {
    sessionStorage.setItem(name, value);
}

export const getSessionStroage: result = (name: string) => {
    let v = sessionStorage.getItem(name);
    return v ? JSON.parse(v) : {};
}
