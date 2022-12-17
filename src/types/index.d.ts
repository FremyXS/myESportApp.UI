export class User{
    _id: number;
    photo: string;
    country: number;
    firstName: string;
    lastName: string;
    city: string;
    sex: number;

    // @ts-ignore
    constructor(id:number,photo,country,name,lastName,city, sex:number){
        this._id = id;
        this.photo = photo;
        this.country = country;
        this.firstName = name;
        this.lastName = lastName;
        this.city = city;
        this.sex = sex;
    }
}