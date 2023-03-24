
const URL = "http://localhost:3001/";
export function post(endpoint, data) {
    let uri = URL + endpoint
    fetch(uri, {
        method: 'POST',
        mode: 'cors',
        body: data,
        
    })
}
export function get(endpoint) {
    let uri = URL + endpoint;
    fetch(uri, {
        method: 'GET',
        mode: 'cors',
        

    })
}
