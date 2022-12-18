import { Avatar, Div, Group, Header, InfoRow, SimpleCell } from '@vkontakte/vkui';
import * as React from 'react';
import { PetType } from '@Pages/Main/types';

function PetsRowList({pets}:{pets: PetType}){
    return (
        <Group>
        <Header mode="secondary">Питомец:</Header>
        {/* <SimpleCell>
                <InfoRow>{pets.pet_sex === 'ma'}</InfoRow>
            </SimpleCell> */}
            <SimpleCell>
                <Avatar size={60} src={pets.pet?pets.pet.image:""}></Avatar>
            </SimpleCell>
            <SimpleCell>
                <InfoRow header="Имя">{pets.pet_name}</InfoRow>
            </SimpleCell>
            <SimpleCell>
                <InfoRow header="Парода">{pets.pet?pets.pet.name:"Парода"}</InfoRow>
            </SimpleCell>
            <SimpleCell>
                <InfoRow header="Возраст">{pets.pet_age}</InfoRow>
            </SimpleCell>
        </Group>
    )
}

export default PetsRowList;