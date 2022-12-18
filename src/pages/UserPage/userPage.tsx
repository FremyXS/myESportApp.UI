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
    CellButton, Group, Caption, Input
} from '@vkontakte/vkui';
import {
    Icon28Notifications,
    Icon28AddOutline,
    Icon12Check
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import {User, Pet, Sex, Genre} from "../../types";
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
    const [interests, setInterests] = React.useState([])
    const [isRegister, setIsRegister] = React.useState(false)
    const [isRedactDescription, setIsRedactDescription] = React.useState(false)
    const textInput = React.createRef<HTMLInputElement>();
    React.useEffect(() => {
        const getUser = async () => {
            const url = new URL(window.location.href);
            const userId = url.searchParams.get('vk_user_id')
            console.log(userId)
            bridge.send('VKWebAppGetUserInfo', {
                user_id: Number(userId)
            })
                .then(async (data) => {
                    if (data.id) {
                        const user = new User(Number(userId), data.photo_200, data.country.title,
                            data.first_name, data.last_name, data.city.title, data.sex)
                        setUser(user)

                        await ApiManager.getUserProfile()
                            .then(e => {
                                user.description = e.data.data.description
                                user.age = e.data.data.my_age
                                setIsRegister(true)
                            })
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
        ApiManager.myPet().then(r => {

            const myPet = r.data.data.my_pet;
            const genre = new Genre(myPet.pet.pet_id,myPet.pet.image,myPet.pet.name)
            setPet(new Pet(myPet.id,myPet.pet_name,myPet.pet_age,Sex[myPet.pet_sex],genre))
        }).then()

    }, [user])
    React.useEffect(() => {
        ApiManager.getInterestOfUser().then(v => setInterests(v.data.data.UserInterests))
    }, [user])

    const getName = () => {
        if (user) {
            return `${user.firstName} ${user.lastName}`
        }
    }
    const addPet = async (pet: Pet) => {
        setPet(pet)
        setIsRegister(true)
        ApiManager.getUserProfile()
            .then(r => {
                console.log(r.data.data, 'user')
                setIsRegister(true)
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
                }).then(()=>{
                    setIsRegister(true)
                })
            })
    }
    const changeDescription = async () => {
        user.description = textInput.current.value
        setIsRedactDescription(false)
        const value = await ApiManager.updateUserProfile({},textInput.current.value)
        console.log(value)
    }
    const openPetModal = () => {
        setModal((<PetModal close={() => {
            setModal(null);
        }} addPet={addPet}/>))
    }
    const openInterestModal = () => {
        setModal((<InterestModal close={() => {
            setModal(null);
        }} addInterest={(value) => {
            setInterests(value)
            ApiManager.updateInterests(value.map(x=>({interestId:x.interest.id}))).then(()=>{
                console.log("change interest")
            })
        }} userInterest={interests}/>))
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
                                                {
                                                    isRedactDescription?(
                                                        <Input key={'description'} after={
                                                        <Icon12Check color="#0000CD" onClick={changeDescription}/>
                                                    } getRef={textInput} defaultValue={user.description}/>
                                                    ):(
                                                        <Caption level="1" style={{marginTop: 16, textAlign: "center"}}
                                                        onClick={()=>{setIsRedactDescription(true)}}>
                                                            {user.description}
                                                        </Caption>
                                                    )
                                                }
                                            </Div>
                                        </Card>
                                        {
                                            isRegister?(
                                                <Card mode="shadow" style={{marginTop: "40px", padding: "8px"}}>
                                                    {
                                                        interests ? (<InterestCard interestings={interests}/>) : ""
                                                    }
                                                    {
                                                        interests ? (
                                                            <CellButton before={<Icon28AddOutline/>}
                                                                        style={interests.length?{marginTop: "16px"}:{}}
                                                                        onClick={openInterestModal}>
                                                                Изменить Интересы
                                                            </CellButton>
                                                        ) : ""
                                                    }
                                                </Card>
                                            ):""
                                        }

                                        <Card mode="shadow" style={{marginTop:"40px", padding: "8px"}}>
                                            {
                                                pet ? (<PetCard pet={pet}/>) :""
                                            }
                                            <CellButton before={<Icon28AddOutline/>}
                                                        style={pet?{marginTop: "16px"}:{}}
                                                        onClick={openPetModal} >
                                                Изменить питомца
                                            </CellButton>

                                        </Card>

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