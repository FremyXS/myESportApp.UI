import DataManager from "@Helpers/DataManager";

export default class ApiManager implements DataManager{
    _url:string = "http://localhost:8080"
    async addRequest(request): Promise<boolean> {
        let response = await fetch(this._url, {method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(request)});
        return response.ok;
    }
}