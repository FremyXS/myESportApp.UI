import * as React from 'react'
import { Button, ButtonGroup } from '@vkontakte/vkui';
import { Avatar, Card, CardGrid, Div, Header, InfoRow, Panel, SimpleCell, SplitCol, SplitLayout, Title, View } from '@vkontakte/vkui';
import { UserType,  UserInfo} from '@Pages/Main/types';
import bridge from '@vkontakte/vk-bridge';
import { Icon12Cancel, Icon12Check } from '@vkontakte/icons';
// 186800902

enum SexSwitch {
    'Не указан' = 0,
    'Женский' = 1,
    'Мужской' = 2,
}

const Main = () => {
    const[searchUser, setSearchUser] = React.useState<UserType>({
        vkId: 0,
        desk: "dkfjlsjhdklfjhakljfhsalkfjahlsahfksbjksabnfm,sabfsas,bafsbmnsabfmnsabfmsafmnasbfm,bsa,mfbnsasa",
        pets: [
            {
                name: 'Серж',
                age: 2,
                gener: "Псина"
            },
            {
                name: 'Котя',
                age: 6,
                gener: "Кот"
            },
        ]
    })

    const [userInfo, setUserInfo] = React.useState<UserInfo>({
        first_name: '',
        last_name: '',
        sex: 1,
        city: {
            title: '',
        },
        country: {
            title: '',
        },
        photo_max_orig: '',
    });

    React.useEffect(() => {
        getUserAsync();
    }, [])

    function onAppenedClick(){

    }

    function onCancelClick(){

    }

    return(
        <View activePanel='panel1'>
            <Panel id="panel1">
                <CardGrid size={'l'}>
                    <Card mode="shadow">
                        <Div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                            <Avatar size={225}>                            
                            </Avatar>
                        </Div>
                    </Card>
                    <Card mode="shadow">
                        <Div>
                            <Title>
                                {userInfo.first_name} {userInfo.last_name}
                            </Title>
                        </Div>
                    </Card>
                    <Card mode="shadow">
                        <Div>
                            <Header mode="secondary">{searchUser.desk}</Header>
                        </Div>
                    </Card>
                    <Card mode="shadow">
                        <Div>
                            <Header mode="secondary">О пользователе:</Header>
                            <SimpleCell multiline>
                                    <InfoRow header="Город">{userInfo.city.title}</InfoRow>
                            </SimpleCell>
                            <SimpleCell multiline>
                                    <InfoRow header="Пол">{SexSwitch[userInfo.sex]}</InfoRow>
                            </SimpleCell>
                        </Div>
                    </Card>
                    <Card mode="shadow">
                        <Div>
                            <Header mode="secondary">Питомцы:</Header>
                            {searchUser.pets.map((el, index) =>
                                <Div key={index}>
                                    <SimpleCell multiline>
                                        <InfoRow header="Имя">{el.name}</InfoRow>
                                    </SimpleCell>
                                    <SimpleCell multiline>
                                        <InfoRow header="Парода">{el.gener}</InfoRow>
                                    </SimpleCell>
                                    <SimpleCell multiline>
                                        <InfoRow header="Возраст">{el.age}</InfoRow>
                                    </SimpleCell>
                                </Div>
                            )}                            
                        </Div>
                    </Card>
                    <Div style={{width: '100%'}}>
                    <ButtonGroup mode="horizontal" gap="m" stretched>
                            <Button size='l' appearance="positive" stretched onClick={() => onCancelClick()}>
                                <Icon12Check></Icon12Check>
                            </Button>
                            <Button size='l' appearance="negative" stretched onClick={() => onAppenedClick()}>
                                <Icon12Cancel></Icon12Cancel>
                            </Button>                            
                        </ButtonGroup>
                    </Div>
                </CardGrid>
            </Panel>
        </View> 
    )

    async function getUserAsync() {
       await bridge.send('VKWebAppGetUserInfo', {
            user_id: 186800902
            })
            .then((data) => { 
                console.log(data)
                setUserInfo(data);
            })
            .catch((error) => {
              // Ошибка
              console.log(error);
            });
    }
}
export default Main