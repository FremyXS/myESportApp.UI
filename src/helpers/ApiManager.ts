import DataManager from "@Helpers/DataManager";
import {Genre, Pet, User, Sex, Interest} from "../types";
import axios from "axios";
import UserPage from "@Pages/UserPage/userPage";

class ApiManager {
    vk_id: any

    constructor() {
        const url = new URL(window.location.href);
        this.vk_id = url.searchParams.get('vk_user_id')
    }

    getInterests(): Promise<Interest[]> {
        throw new Error("Method not implemented.");

    }

    _url: string = "https://backend.dlsky.site/"

    getPetOfUser(userId): Promise<Pet> {
        return Promise.resolve(new Pet(1, "slava", 2, Sex.male, new Genre(1, "s", "s")));
    }



    getAllGenre(): Promise<Genre[]> {
        return Promise.resolve([]);
    }

    async getInterestOfUser(): Promise<any> {
        const a = await axios.get(this._url + 'interests/' + this.vk_id)
        return a
    }

    async getAllInterests() {
        const a = await axios.get(this._url + 'interests/all')
        return a
    }

    //Для поиска
    async interestingMatchingUsers() {
        const a = await axios.get(this._url + 'interests/matching/' + this.vk_id)
        return a
    }
    

    async petsUsersMatching() {
        const a = await axios.get(this._url + 'pets/matching/'+this.vk_id)
        return a
    }


    async myInterests() {
        const a = await axios.get(this._url + 'interests/' + this.vk_id)
        return a
    }

    async updateInterests(interests: {
        interestId: number
    }[]) {
        const a = await axios.put(this._url + 'interests/' + this.vk_id, {
            interests: interests.map(e => {
                return {
                    interestId: e.interestId,
                    userVk_id: this.vk_id
                }
            })
        })
        return a
    }


    async getAllPets() {
        const a = await axios.get(this._url + 'pets/all')
        return a
    }
    async myPet() {
        const a = await axios.get(this._url + 'pets/'+this.vk_id)
        return a
    }

    async createUserProfile(data: {
        "pet": {
            "pet_age": number,
            "pet_name": string,
            "pet_sex": string,
            "pet_breed_id": number
        },
        city: string,
        sex: string,
        description: string,
        age: number,
        interests: number[],
    }) {
        const b = data["vk_id"] = this.vk_id
        const a = await axios.post(this._url + 'user/register/', b)
        return a
    }

    async getUserProfile() {
        const a = await axios.get(this._url + 'user/'+this.vk_id)
        return a
    }

    async updateUserProfile(interests: {
        "pet"?: {
            "pet_age"?: number,
            "pet_name"?: string,
            "pet_sex"?: string,
            "pet_breed_id"?: number
        },
        city?: string,
        sex?: string,
        description?: string,
        age?: number,
    }) {
        const a = await axios.put(this._url + 'user/'+this.vk_id)
        return a
    }
}
export default new ApiManager()
