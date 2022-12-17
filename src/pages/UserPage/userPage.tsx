import * as React from "react"
import {View, Panel, Div, PanelHeader, PanelHeaderButton, Avatar, Text} from '@vkontakte/vkui';
import {Icon28Notifications, Icon28Users} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import { User } from "../../types/index.d.ts";

const UserPage = () => {
    const [user,setUser] = React.useState(undefined)
    React.useEffect(()=>{
        getUser()
    },[])
    const getUser = () =>{
        const url = new URL(window.location.href);
        const userId = url.searchParams.get('vk_user_id')
        bridge.send('VKWebAppGetUserInfo', {
            user_id: Number(userId)
        })
        .then((data) => {
            if (data.id) {
                const user = new User(Number(userId),data.photo_200,data.country.title,
                    data.first_name,data.last_name,data.city.title,data.sex)
                setUser(user)
            }
        })
    }
    const getName = () => {
        if(user){
            return `${user.firstName} ${user.lastName}`
        }
    }

    return (
        <View activePanel="userPanel" id ="user">
            <Panel id="userPanel">
                <PanelHeader
                    before={
                        <PanelHeaderButton>
                            <Icon28Notifications />
                        </PanelHeaderButton>
                    }>
                    Профиль
                </PanelHeader>
                <Div style={{padding: 80}}>
                    <Div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Avatar key={100} size={100} src={user?user.photo:'#'}>
                        </Avatar>
                    </Div>
                    <Text>{user?getName():'username'}</Text>
                </Div>
            </Panel>
        </View>
    )
};
export default UserPage;