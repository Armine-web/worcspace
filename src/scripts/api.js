class API {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(endpoint) {
        return fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .catch(error => console.error("GET request error:", error));
    }

    post(endpoint, data) {
        return fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
          .catch(error => console.error("POST request error:", error));
    }

    put(endpoint, data) {
        return fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
          .catch(error => console.error("PUT request error:", error));
    }

    delete(endpoint) {
        return fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .catch(error => console.error("DELETE request error:", error));
    }


   
}


export { API };
