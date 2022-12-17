import DataManager from "@Helpers/DataManager";
import {Pet, User, Sex, Genre} from "../types/index.d.ts";

export default class MockManager implements DataManager{
    getPetOfUser(userId): Promise<Pet> {
        return Promise.resolve(new Pet(0,"Шарик",8,Sex.male,new Genre(
            1,"https://animal.tden.ru/wp-content/uploads/2014/10/7063159059_2682eb89ea_b.jpg","Биголь"
        )));
    }

    registerUser(user: User): Promise<boolean> {
        return Promise.resolve(false);
    }

    getAllGenre(): Promise<Genre[]> {
        return Promise.resolve([new Genre(1,
            "https://animal.tden.ru/wp-content/uploads/2014/10/7063159059_2682eb89ea_b.jpg",
            "Биголь")]);
    }
}