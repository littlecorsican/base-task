import { base } from '../constants'

export const request = async(url, type = "GET", body= null) => {

    const credentials = localStorage.getItem('user_credentials')
    console.log("credentials111", credentials)
    let access_token = ""
    if (credentials) {
        access_token = JSON.parse(credentials).access_token
    }
    console.log("credentials222", access_token)

    if (type === "POST") {
        const response = await fetch(base + url , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${access_token}`
            },
            body: JSON.stringify(body)
            });
            console.log('response', response)
            const response2 = await response.json()
            console.log('response2', response2)
            return response2
    } else if (type === "PUT") {
        const response = await fetch(base + url , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${access_token}`
            },
            body: JSON.stringify(body)
            });
            console.log('response', response)
            const response2 = await response.json()
            console.log('response2', response2)
            return response2
    } else if (type === "DELETE") {
        const response = await fetch(base + url , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${access_token}`
            },
            body: body,
            });
            console.log('response', response)
            const response2 = await response.json()
            console.log('response2', response2)
            return response2
    }
    const response = await fetch(base + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${access_token}`
        },
    });
    console.log('response', response)
    const response2 = await response.json()
    console.log('response2', response2)
    return response2
}