

export const request = async(url, type = "GET", body= null) => {

    const credentials = localStorage.getItem('user_credentials')
    let access_token = ""
    if (credentials) {
        access_token = JSON.parse(credentials).access_token
    }

    if (type === "POST") {
        try {
            const response = await fetch(process.env.REACT_APP_BASE + url , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify(body)
                });
                const response2 = await response.json()
                return response2
        } catch(e) {
            return {
                success: 0,
                message: e.toString()
            }
        }
    } else if (type === "PUT") {
        try {
            const response = await fetch(process.env.REACT_APP_BASE + url , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify(body)
                });
                const response2 = await response.json()
                return response2
            } catch(e) {
            return {
                success: 0,
                message: e.toString()
            }
        }
    } else if (type === "DELETE") {
        try {
            const response = await fetch(process.env.REACT_APP_BASE + url , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: body,
                });
                const response2 = await response.json()
                return response2
        } catch(e) {
            return {
                success: 0,
                message: e.toString()
            }
        }
    }
    try {
        const response = await fetch(process.env.REACT_APP_BASE + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        });
        const response2 = await response.json()
        return response2
    } catch(e) {
        return {
            success: 0,
            message: e.toString()
        }
    }
}

export const addExtraZero =(string)=> {
    if (string.length == 1) {
        return "0" + string
    }
    return string
}


export const iSOToReadable=(datetime)=>{
    return addExtraZero(new Date(datetime).getDate().toString()) + "-" + addExtraZero((new Date(datetime).getMonth()+1).toString()) + "-" + new Date(datetime).getFullYear()
}