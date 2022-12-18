import { Avatar, Card, CardGrid, InfoRow, SimpleCell } from '@vkontakte/vkui';
import * as React from 'react';
import ApiManager from '@Helpers/ApiManager';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';

function ColumnListInfo({users}:{users: number[]}){
    const[list, setList] = React.useState<UserInfo[]>([]);


    async function getInfoUser(id: number){
        await bridge.send('VKWebAppGetUserInfo', {
            user_id: id
            })
            .then((data) => { 
                setList([ ...list, data]);
            });
    }

    React.useEffect(()=>{
        for (let index = 0; index < users.length; index++) {
            getInfoUser(users[index]);
            
        }
    }, [])
    
    return(
        <CardGrid size='l'>
            {list.map((el, index) => 
            <Card key={index}>
            <SimpleCell>
                <Avatar size={60} src={el.photo_max_orig}></Avatar>
            </SimpleCell>
            <SimpleCell>
                <InfoRow header="Имя">{`${el.first_name} ${el.last_name}`}</InfoRow>
            </SimpleCell>
            </Card>
            )}
        </CardGrid>


    )


}

export default ColumnListInfo;