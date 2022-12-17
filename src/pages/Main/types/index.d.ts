export type UserType = {
    vkId: number,
    desk: string,
    pets: PetType[]

}

export type PetType = {
    name: string,
    age: number,
    gener: string
}

export type UserInfo = {
        first_name: string,
        last_name: string,
        sex: number,
        city: {
            title: string,
        },
        country: {
            title: string;
        };
        photo_max_orig?: string;
}