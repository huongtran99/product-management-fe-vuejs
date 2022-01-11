let host = 'http://localhost:3000'
let call = function (method, url, body) {
    return new Promise(resolve => {
        fetch(host + url, {
            method: method,
            body: method === 'POST' ? JSON.stringify(body) : undefined,
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(data => data.json()).then(data => resolve(data)).catch(err => resolve(err))
    })
}
module.exports = {call}
