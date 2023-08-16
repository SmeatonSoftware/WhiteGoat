//http://192.168.1.91:5000/
export const baseUrl = "http://192.168.1.91:5000/api/";
export default class APIRequest {
    constructor(path, body, method) {
        this.path = path;
        this.body = body;
        this.method = method;
    }

    async execute(json = true) {
        let optn = {
            method: this.method,
            body: this.body.length > 0 ? JSON.stringify(this.body) : null,
            headers: this.body.length > 0 ? {
                "Content-Type": "application/json"
            } : {}
        }
        const response = await fetch(baseUrl + this.path, optn);
        const data = json ? await response.json() : await response.text();
        return data;
    }

    async executeWithCallback(successCallback = (data) => {
    }, errorCallback = (data) => {
    }, json = true, headers= {}) {
        let optn = {
            method: this.method,
            body: this.body.length > 0 ? JSON.stringify(this.body) : null,
            headers: this.body.length > 0 ? {
                ...headers,
                "Content-Type": "application/json"
            } : {...headers}
        }

        fetch(baseUrl + this.path, optn).then(
            async (response) => {
                const data = json ? await response.json() : await response.text();
                if (response.status == 200) {
                    successCallback(data);
                } else {
                    errorCallback(data);
                }
            }
        )
    }
}
