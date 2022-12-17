import DataManager from "@Helpers/DataManager";
import {Pet, User, Sex, Genre, Interest} from "../types";

export default class MockManager implements DataManager {
    getInterestOfUser(): Promise<Interest[]> {
        return Promise.resolve([new Interest(0,"hello"),new Interest(1,"gay"),
            new Interest(2,"work"), new Interest(3,"walk")]);
    }
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

    getInterests(): Promise<Interest[]> {
        return Promise.resolve([]);
    }
}