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
    CellButton, Group, Caption
} from '@vkontakte/vkui';
import {
    Icon28Notifications,
    Icon28PawOutline,
    Icon28UserCardOutline,
    Icon28SkirtOutline,
    Icon28AddOutline
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import {User, Pet, Interest} from "../../types";
import DataManager from "@Helpers/DataManager";
import MockManager from "@Helpers/MockManager";
import Loader from "@Components/Loader/laoder";
import PetCard from "@Components/PetCard/petCard";
import PetModal from "@Components/PetModal/PetModal";
import InterestCard from "@Components/interestCard/interestCard";
import InterestModal from "@Components/InterestModal/InterestModal";

const UserPage = () => {
    const manager:DataManager = new MockManager();
    const [modal,setModal] = React.useState(null)
    const [user,setUser] = React.useState(undefined)
    const [pet,setPet] = React.useState(undefined)
    const [interests,setInterests] = React.useState(undefined)
    React.useEffect(()=>{
        getUser()
    },[])
    React.useEffect(() => {
        getPet()
    }, [user])
    React.useEffect(() => {
        getInterest()
    }, [user])
    const getPet = () => {
        if(user){
            manager.getPetOfUser(user.id)
                .then(value=>{
                    setPet(value)
                })
        }
    }
    const getInterest = () => {
        if(user){
            manager.getInterestOfUser().then(value=>{
                setInterests(value)
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
    const addInterest = (interests: Interest) => {
        setInterests(interests)
    }
    const openPetModal = () => {
        setModal((<PetModal close={()=>{setModal(null)}} addPet={addPet}/>))
    }
    const openInterestModal = () => {
        setModal((<InterestModal userInterest={interests} close ={()=>{setModal(null)}} addInterest={addInterest}/>))
    }
    return (
        <SplitLayout modal={modal??''}>
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
                                            <Caption level="1" style={{ marginTop: 16, textAlign: "center" }}>
                                                {user.description}
                                            </Caption>
                                        </Div>
                                    </Card>
                                    <Card mode="shadow" style={{marginTop:"40px", padding: "8px"}}>
                                        {
                                            interests?(<InterestCard interestings={interests}/>):""
                                        }
                                        {
                                            interests?(
                                                <CellButton before={<Icon28AddOutline />} style={{marginTop:"16px"}}
                                                            onClick={openInterestModal}>
                                                     Изменить интересы
                                                </CellButton>
                                            ):""
                                        }
                                    </Card>

                                    {
                                        pet?(<PetCard pet={pet}/>):(
                                            <CellButton before={<Icon28AddOutline />} style={{marginTop:"16px"}}
                                                        onClick={openPetModal}>
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