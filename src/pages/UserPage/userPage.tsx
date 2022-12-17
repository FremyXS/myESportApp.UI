import * as React from "react"
import {
    View,
    Panel,
    Div,
    PanelHeader,
    PanelHeaderButton,
    Avatar,
    Text,
    Card,
    Title,
    Spinner,
    SplitLayout,
    SplitCol,
    CellButton, Group
} from '@vkontakte/vkui';
import {
    Icon28Notifications,
    Icon28PawOutline,
    Icon28UserCardOutline,
    Icon28SkirtOutline,
    Icon28AddOutline
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import { User, Pet } from "../../types/index.d.ts";
import DataManager from "@Helpers/DataManager";
import MockManager from "@Helpers/MockManager";
import Loader from "@Components/Loader/laoder";
import PetCard from "@Components/PetCard/petCard";
import PetModal from "@Components/PetModal/PetModal";

const UserPage = () => {
    const manager:DataManager = new MockManager();
    const [isOpen,setIsOpen] = React.useState(false)
    const [user,setUser] = React.useState(undefined)
    const [pet,setPet] = React.useState(undefined)
    React.useEffect(()=>{
        getUser()
    },[])
    React.useEffect(() => {
        //getPets()
    })
    const getPets = () => {
        if(user){
            manager.getPetOfUser(user.id)
                .then(value=>{
                    setPet(value)
                })
        }
    }
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
    const addPet = (pet: Pet) => {
        setPet(pet)
    }
    const getModal = () => {
        return(<PetModal isOpen={isOpen} setIsOpen={setIsOpen} addPet={addPet}/>)
    }
    const openModal = () => {
        setIsOpen(true)
    }
    return (
        <SplitLayout modal={getModal()}>
            <SplitCol>
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
                        {
                            user?(
                                <Group>
                                <Div style={{padding: 40}}>
                                    <Div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <Avatar key={100} size={100} src={user?user.photo:'#'}>
                                        </Avatar>
                                    </Div>
                                    <Card mode="shadow">
                                        <Div>
                                            <Title style={{textAlign: "center"}}>
                                                {user?getName():'username'}
                                            </Title>
                                        </Div>
                                    </Card>
                                    {
                                        pet?(<PetCard pet={pet}/>):(
                                            <CellButton before={<Icon28AddOutline />} style={{marginTop:"16px"}}
                                                        onClick={openModal}>
                                                Добавить питомца
                                            </CellButton>
                                        )
                                    }
                                </Div>
                                </Group>
                            ):(
                                <Loader />
                            )
                        }
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    )
};
export default UserPage;