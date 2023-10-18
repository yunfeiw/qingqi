export const TxtLower = (str: string) => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}