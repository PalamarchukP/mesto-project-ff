export const apiMethodsEnum = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
    patch: 'PATCH',
}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41/',
  headers: {
    authorization: '4137014f-17d6-4069-af09-c5b9f7fc2b66',
    'Content-Type': 'application/json'
  }
}

export async function apiServer(method, namespace, body, query = '') {
    return fetch(`${config.baseUrl}${namespace}/${query}`, {
        method: method,
        headers: config.headers,
        [body ? 'body' : '']: body ? JSON.stringify(body) : null,
    }).then(res => {
        if (res.ok)
            return res.json();
        
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error(err);
    })
}