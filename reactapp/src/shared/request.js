//http://192.168.1.91:5000/
const localUrl = "http://192.168.1.91"
export const baseUrl = document.location.href.includes(localUrl) ? localUrl+":5000/api/" : "/api/";

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
        let head = this.body.length > 0 ? {
            ...headers,
            "Content-Type": "application/json"
        } : {...headers};

        head =  document.location.href.includes("localhost") ?
            {...head, "sid": localStorage.getItem("sid"), "key": localStorage.getItem("key")} : {...head};

        let optn = {
            method: this.method,
            body: this.body.length > 0 ? JSON.stringify(this.body) : null,
            headers: head
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
