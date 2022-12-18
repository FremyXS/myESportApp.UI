export type UserType = {
    vk_id: number,
    city: string,
    my_pet: PetType,
    my_age: number,
    description: string,
    my_sex: string
}

export type PetType = {
    pet: {
      pet_id: number,
      name: string,
      image: string
    },
    pet_sex: string,
    pet_name: string,
    pet_age: number
}

export type UserInfo = {
        first_name: string,
        last_name: string,
        photo_max_orig?: string;
}