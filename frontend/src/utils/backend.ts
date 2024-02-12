import $ from 'jquery'
import {deleteCookie, getCookie, setCookie} from './cookies'

const backendURL = 'http://localhost/GSA-Website/backend/'
const shortRememberTimeHours = 4

export interface sendData {
    [key:string]:string|undefined
}

export interface responseDataType {
    status:string
    text:string
}

export interface loginInfoType {
    username:string
    token:string
}

export const getLoginInfo = ():loginInfoType|null => {
    const username = getCookie('user-login-name')
    const token = getCookie('user-login-token')
    return token === '' && username === '' ? null : {token: token, username: username}
}

export const setLoginInfo = (username:string, token:string, days:number=365):void => {
    setCookie('user-login-name', username, days)
    setCookie('user-login-token', token, days)
}

export const backendRequest = async (url:string, data:sendData, updateToken:boolean=false, stayLoggedIn:boolean|null=null):Promise<responseDataType> => {
    const headers:Record<string, string> = {}
    const login:loginInfoType|null = getLoginInfo()

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

                if(parsedResult.status === 'success') {
                    if(updateToken) {
                        try {
                            const parsed = JSON.parse(parsedResult.text)

                            const stay:null|boolean = stayLoggedIn ?? !!getCookie('user-stay-loggedin')
                
                            if(stay) {
                                setCookie('user-stay-loggedin', 'true', 1000)
                                setLoginInfo(parsed.username, parsed.token)
                            } else {
                                deleteCookie('user-stay-loggedin')
                                setLoginInfo(parsed.username, parsed.token, shortRememberTimeHours / 24)
                            }
                        } catch(error) {
                            reject({status: 'connerror', text: "Update token parameter was set but php response didn't match requirements: " + parsedResult.text})
                        }
                    }

                    resolve(parsedResult)
                } else {
                    // don't delete the stored user data if only the connection to server failed
                    if(updateToken && parsedResult.status !== 'connerror') {
                        setLoginInfo('', '')
                    }

                    reject(parsedResult)
                }

            } catch(error) {
                reject({status: 'connerror', text: result})
            }

        },

        error(xhr) {
            reject({status: 'connerror', text: 'Connection to server failed, please inform site admin'})
        }
    }))
}

export const syncBackendRequest = (url:string, data:sendData, updateToken:boolean=false, stayLoggedIn:null|boolean=null):responseDataType => {
    let returnVal:responseDataType = {status: 'connerror', text: 'No answer from server'}
    const headers:Record<string, string> = {}
    const login:loginInfoType|null = getLoginInfo()

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
            try {
                const parsedResult = JSON.parse(result)
                returnVal = parsedResult
            } catch(error) {
                returnVal = {status: 'connerror', text: result}
            }
        },

        error(xhr) {
            returnVal = {status: 'connerror', text: xhr.statusText}
        },
    })

    if(updateToken) {
        if(returnVal.status === 'success') {
            try {
                const parsed = JSON.parse(returnVal.text)
                const stay:null|boolean = stayLoggedIn ?? !!getCookie('user-stay-loggedin')
                
                if(stay) {
                    setCookie('user-stay-loggedin', 'true', 1000)
                    setLoginInfo(parsed.username, parsed.token)
                } else {
                    deleteCookie('user-stay-loggedin')
                    setLoginInfo(parsed.username, parsed.token, shortRememberTimeHours / 24)
                }
            } catch(error) {
                console.error("Update token parameter was set but php response didn't match requirements: " + returnVal.text)
            }
        // don't delete the stored user data if only the connection to server failed
        } else if(returnVal.status !== 'connerror') {
            setLoginInfo('', '')
        }
    }

    return returnVal
}
