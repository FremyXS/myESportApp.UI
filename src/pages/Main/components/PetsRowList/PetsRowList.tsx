import { Avatar, Div, Group, Header, InfoRow, SimpleCell } from '@vkontakte/vkui';
import * as React from 'react';
import { PetType } from '@Pages/Main/types';

function PetsRowList({pets}:{pets: PetType}){
    return (
        <Group>
        <Header mode="secondary">Питомец:</Header>
        <Div style={{ display: 'flex', width: '100%' }}>
            {/* <SimpleCell>
                <InfoRow>{pets.pet_sex === 'ma'}</InfoRow>
            </SimpleCell> */}
            <SimpleCell>
                <Avatar size={60} src={pets.pet.image}></Avatar>
            </SimpleCell>
            <SimpleCell>
                <InfoRow header="Имя">{pets.pet_name}</InfoRow>
            </SimpleCell>
            <SimpleCell>
                <InfoRow header="Парода">{pets.pet.name}</InfoRow>
            </SimpleCell>
            <SimpleCell>
                <InfoRow header="Возраст">{pets.pet_age}</InfoRow>
            </SimpleCell>
            </Div>
        </Group>
    )
}

export default PetsRowList;