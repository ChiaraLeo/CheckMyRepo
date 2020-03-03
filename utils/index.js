export const serviceApi = (url, data = [], method = 'POST') =>
  fetch(url, {
    method,
    headers: {
      "mode": 'no-cors',
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain"
    },
    body: method === 'POST' ? JSON.stringify(data) : null
  })
  .then(response => {
    return response
  }).then(response => {
    return response.text()
  }).catch(error => {
    return Promise.reject(error)
  })