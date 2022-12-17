import DataManager from "@Helpers/DataManager";
import {Pet, User} from "../types/index.d.ts";

export default class ApiManager implements DataManager{
    _url:string = "https://backend.dlsky.site/"

    getPetOfUser(userId): Promise<Pet> {
        return Promise.resolve([]);
    }

    async registerUser(user: User): Promise<boolean> {
        const jsonUser = {
            pets:[],
            city: user.city,
            sex: user.sex,
            description: "description",
            age: 0,
            interests: [],
            vk_id: user.id
        }
        const response = await fetch(this._url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify(jsonUser)
        })
        return Promise.resolve(response.ok)
    }
}