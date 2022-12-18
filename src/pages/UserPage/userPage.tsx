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
    Icon28AddOutline
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import {User, Pet} from "../../types";
import Loader from "@Components/Loader/laoder";
import PetCard from "@Components/PetCard/petCard";
import PetModal from "@Components/PetModal/PetModal";
import InterestCard from "@Components/interestCard/interestCard";
import InterestModal from "@Components/InterestModal/InterestModal";
import ApiManager from "@Helpers/ApiManager";
import {Simulate} from "react-dom/test-utils";
import transitionEnd = Simulate.transitionEnd;

const UserPage = () => {
    const [modal, setModal] = React.useState(null)
    const [user, setUser] = React.useState(undefined)
    const [pet, setPet] = React.useState(undefined)
    const [interests, setInterests] = React.useState(undefined)

    const [userProfile, setUserProfile] = React.useState(null)



    React.useEffect(() => {
        const getUser = async () => {
            const url = new URL(window.location.href);
            const userId = url.searchParams.get('vk_user_id')
            bridge.send('VKWebAppGetUserInfo', {
                user_id: Number(userId)
            })
                .then(async (data) => {
                    if (data.id) {
                        console.log(data)
                        const user = new User(Number(userId), data.photo_200, data.country.title,
                            data.first_name, data.last_name, data.city.title, data.sex)
                        setUser(user)


                        await ApiManager.getUserProfile()
                            .then(e => setUserProfile(e.data))
                            .catch(e => {
                                if (e.message.code)
                                    console.log('not registered user!')
                                else
                                    console.log('unhandled error')
                            })
                    }
                })
        }
        getUser().then()
    }, [])
    React.useEffect(() => {
        async function registered() {

        }
        registered().then()
    }, [])
    React.useEffect(() => {
        const getPet = async () => {
            const pet = await ApiManager.myPet().then(r => r.data.data).then(() => openPetModal())
            console.log(pet)
            console.log(pet)
            setPet(pet)
        }
        getPet().then()
    }, [user])
    React.useEffect(() => {
        const getInterest = async () => {
            const int = await ApiManager.getInterestOfUser().then(v => v.data.data)
            setInterests(int)
        }
        getInterest().then()
    }, [user])

    const getName = () => {
        if (user) {
            return `${user.firstName} ${user.lastName}`
        }
    }
    const addPet = async (pet: Pet) => {
        setPet(pet)
        await ApiManager.getUserProfile()
            .then(r => {
                console.log(r.data.data, 'user')

            })
            .catch(async () => {
                await ApiManager.createUserProfile({
                    pet: {
                        pet_age: pet.age,
                        pet_name: pet.name,
                        pet_sex: pet.sex,
                        pet_breed_id: pet.genre.id
                    },
                    city: user?.city ?? 'Не указано',
                    sex: user.sex,
                    age: user.age,
                    interests: user.interests,
                    description: user.description
                })
            })
    }
    const openPetModal = () => {
        setModal((<PetModal close={() => {
            setModal(null);
        }} addPet={addPet}/>))
    }
    const openInterestModal = () => {
        setModal((<InterestModal close={() => {
            setModal(null);
        }} addInterest={() => {
        }} userInterest={undefined}/>))
    }
    return (
        <SplitLayout modal={modal ?? ''}>
            <SplitCol>
                <View activePanel="userPanel" id="user">
                    <Panel id="userPanel">
                        <PanelHeader
                            before={
                                <PanelHeaderButton>
                                    <Icon28Notifications/>
                                </PanelHeaderButton>
                            }>
                            Профиль
                        </PanelHeader>
                        {
                            user ? (
                                <Group>
                                    <Div style={{padding: 40}}>
                                        <Div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Avatar key={100} size={100} src={user ? user.photo : '#'}>
                                            </Avatar>
                                        </Div>
                                        <Card mode="shadow">
                                            <Div>
                                                <Title style={{textAlign: "center"}}>
                                                    {user ? getName() : 'username'}
                                                </Title>
                                                <Caption level="1" style={{marginTop: 16, textAlign: "center"}}>
                                                    {user.description}
                                                </Caption>
                                            </Div>
                                        </Card>
                                        <Card mode="shadow" style={{marginTop: "40px", padding: "8px"}}>
                                            {
                                                interests ? (<InterestCard interestings={interests}/>) : ""
                                            }
                                            {
                                                interests && interests.length < 6 ? (
                                                    <CellButton before={<Icon28AddOutline/>}
                                                                style={{marginTop: "16px"}}
                                                                onClick={openInterestModal}>
                                                        Добавить Интересы
                                                    </CellButton>
                                                ) : ""
                                            }
                                        </Card>

                                        {
                                            pet ? (<PetCard pet={pet}/>) : (
                                                <CellButton before={<Icon28AddOutline/>} style={{marginTop: "16px"}}
                                                            onClick={openPetModal}>
                                                    Добавить питомца
                                                </CellButton>
                                            )
                                        }
                                    </Div>
                                </Group>
                            ) : (
                                <Loader/>
                            )
                        }
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    )
};

export default UserPage;