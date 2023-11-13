type funcSetCookie = (name:string, value:string, days:number) => void
type funcGetCookie = (name:string) => string

export const setCookie:funcSetCookie = (name, value, days) => {
    const date:Date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const expires:string = "; expires=" + date.toUTCString()
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/"
}

export const getCookie:funcGetCookie = (name) => {
    return decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith(name+'='))?.split('=')[1] ?? '');
}
