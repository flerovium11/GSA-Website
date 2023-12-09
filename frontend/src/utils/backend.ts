import $ from 'jquery'
import {getCookie, setCookie} from './cookies'

const backendURL = 'http://localhost/GSA-Website/backend/'

export interface sendData {
    [key:string]:string|undefined
}

export interface responseData {
    status:string
    text:string
}

export interface loginInfo {
    username:string
    token:string
}

export const getLoginInfo = ():loginInfo|null => {
    const username = getCookie('user-login-name')
    const token = getCookie('user-login-token')
    return token === '' && username === '' ? null : {token: token, username: username}
}

export const setLoginInfo = (username:string, token:string):void => {
    setCookie('user-login-name', username, 365)
    setCookie('user-login-token', token, 365)
}

export const backendRequest = async (url:string, data:sendData):Promise<responseData> => {
    const headers:Record<string, string> = {}
    const login:loginInfo|null = getLoginInfo()

    if(login) {
        headers['GSA-Username'] = login.username
        headers['Authorization'] = `Bearer ${login.token}`
    }

    return new Promise((resolve, reject) => $.ajax({
        url: backendURL + url,
        method: 'POST',
        data: data,
        headers: headers,
        async: true,

        success(result) {
            try {
                const parsedResult = JSON.parse(result)

                if(parsedResult.status === 'success') resolve(parsedResult)
                else reject(parsedResult)

            } catch(error) {
                reject({status: 'error', text: result})
            }

        },

        error(xhr) {
            reject({status: 'error', text: xhr.statusText})
        }
    }))
}

export const syncBackendRequest = (url:string, data:sendData):responseData => {
    let returnVal:responseData = {status: 'error', text: 'No answer from server'}
    const headers:Record<string, string> = {}
    const login:loginInfo|null = getLoginInfo()

    if(login) {
        headers['GSA-Username'] = login.username
        headers['Authorization'] = `Bearer ${login.token}`
    }

    $.ajax({
        url: backendURL + url,
        method: 'POST',
        data: data,
        headers: headers,
        async: false,
    
        success(result) {
            returnVal = JSON.parse(result)
        },

        error(xhr) {
            returnVal = {status: 'error', text: xhr.statusText}
        },
    })

    return returnVal
}
