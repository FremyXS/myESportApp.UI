import {Genre, Pet, User, Interest} from "../types";

export default interface DataManager{
    getPetOfUser(userId):Promise<Pet>
    registerUser(user:User): Promise<boolean>
    getAllGenre():Promise<Genre[]>
    getInterestOfUser():Promise<Interest[]>
    getInterests():Promise<Interest[]>
}