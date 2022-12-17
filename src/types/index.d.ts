export class User{
    id: number;
    photo: string;
    country: number;
    firstName: string;
    lastName: string;
    city: string;
    sex: number;

    // @ts-ignore
    constructor(id:number,photo,country,name,lastName,city, sex:number){
        this.id = id;
        this.photo = photo;
        this.country = country;
        this.firstName = name;
        this.lastName = lastName;
        this.city = city;
        this.sex = sex;
    }
}
export class Pet{
    _id: number;
    name: string;
    age: number;
    sex: Sex;
    genre: Genre;
    // @ts-ignore
    constructor(id,name,age,sex,genre) {
        this.genre = genre;
        this._id = id;
        this.name = name;
        this.age= age;
        this.sex = sex;
    }
}
export enum Sex {
    secret = "Не важно",
    male = "Самец",
    female = "Самка"
}
export class Genre{
    id:number;
    name:string;
    image:string;
    // @ts-ignore
    constructor(id,image,name) {
        this.image = image;
        this.name = name
    }
}