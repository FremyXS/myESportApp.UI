import {Genre, Pet, User} from "../types/index.d.ts";

export default interface DataManager{
    getPetOfUser(userId):Promise<Pet>
    registerUser(user:User): Promise<boolean>
    getAllGenre():Promise<Genre[]>
}