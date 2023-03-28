
const URL = "http://localhost:3001/";
export function post(endpoint, data) {
    let uri = URL + endpoint
    return fetch(uri, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}

export function get(endpoint) {
    let uri = URL + endpoint;
    return fetch(uri, {
        method: 'GET',
        mode: 'cors',
    }).then(response => response.json());
}
