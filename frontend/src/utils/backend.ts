import $ from 'jquery'

const backendPath:string = 'http://localhost/GSA-Website/backend/'

export interface sendData {
    [key:string]:string|undefined
}

export interface responseData {
    status:string
    response:string
}

export const backendRequest = async (url:string, data:sendData):Promise<responseData> => new Promise((resolve, reject) => $.ajax({
    url: backendPath + url,
    method: 'POST',
    data: data,
    async: true,

    success(result) {
        try {
            const parsedResult = JSON.parse(result)

            if(parsedResult.status === 'success') resolve(parsedResult)
            else reject(parsedResult)

        } catch(error) {
            reject({status: 'error', response: result})
        }

    },

    error(xhr) {
        reject({status: 'error', response: xhr.status + ' ' + xhr.statusText})
    }
}))

export const syncBackendRequest = (url:string, data:sendData):responseData => {
    let returnVal:responseData = {status: 'error', response: 'No answer from server'}

    $.ajax({
        url: backendPath + url,
        method: 'POST',
        data: data,
        async: false,
    
        success(result) {
            returnVal = JSON.parse(result)
        },

        error(xhr) {
            returnVal = {status: 'error', response: xhr.status + ' ' + xhr.statusText}
        },
    })

    return returnVal
}
