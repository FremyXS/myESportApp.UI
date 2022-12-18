import { Avatar, Div, Group, Header, HorizontalCell, HorizontalScroll, InfoRow, SimpleCell } from '@vkontakte/vkui';
import * as React from 'react';

function PetsRowList({pets}:{pets: PetType}){
    return (
        <Group>
                        <Header mode="secondary">Питомцы:</Header>
                        <HorizontalScroll
                        showArrows
                        getScrollToLeft={(i) => i - 120}
                        getScrollToRight={(i) => i + 120}>                            
                        <div style={{display: 'flex'}}>
                        {searchUser.pets.map((el, index) =>
                            {
                                return <HorizontalCell key={index} size='l'>
                                    <Div style={{ display: 'flex', width: '100%' }}>
                                        <SimpleCell>
                                            <Avatar size={40}></Avatar>
                                        </SimpleCell>
                                        <SimpleCell>
                                            <InfoRow header="Имя">{el.name}</InfoRow>
                                        </SimpleCell>
                                        <SimpleCell>
                                            <InfoRow header="Парода">{el.gener}</InfoRow>
                                        </SimpleCell>
                                        <SimpleCell>
                                            <InfoRow header="Возраст">{el.age}</InfoRow>
                                        </SimpleCell>
                                    </Div>
                                </HorizontalCell>;
                            }  
                        )}   
                        </div>       
                        </HorizontalScroll>
                        </Group>
    )
}

export default PetsRowList;