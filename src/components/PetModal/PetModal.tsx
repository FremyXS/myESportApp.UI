import {
    FormItem,
    FormLayout,
    ModalPage,
    ModalPageHeader,
    Input,
    IconButton,
    Slider,
    PanelHeaderBack, PanelHeaderButton, Select, CustomSelectOptionInterface, Search, Group, Cell, Footer, Avatar
} from "@vkontakte/vkui";
import {ModalRoot} from "@vkontakte/vkui/dist/components/ModalRoot/ModalRootAdaptive";
import * as React from "react";
import {Icon16Clear, Icon28Done} from "@vkontakte/icons";
import {useState} from "react";
import {Sex, Pet, Genre} from "../../types"
import ApiManager from "../../helpers/ApiManager"

import {socket} from "../../socket"

const PetModal = ({close, addPet}) => {
    const [isOpen, setIsOpen] = useState(true)
    const [age, setAge] = useState(10)
    const [sex, setSex] = useState(0)
    const [genre, setGenre] = useState(undefined)
    const [search, setSearch] = React.useState("");


    const onChange = async (e?) => {
        if (e){
            setSearch(e.target.value)
        }
        console.log('do emit!')
        if (search.length >= 3) {
            socket.emit('breedSearch', search, (response) => {
                setFilteredDogs(response)
            });
        }
        else {
            setTimeout(() => onChange, 300)
        }
    };

    const [filteredDogs, setFilteredDogs] = useState(null)


    const closeModal = async () => {
        if (close) {
            await close()
        }
            setIsOpen(false)
    }
    React.useEffect(() => {
        const fetch = async () => {
            const user = await ApiManager.getUserProfile()
        }
        fetch().then()
    }, [])
    const acceptModal = async () => {
        if (addPet) {
            const name = textInput.current.value
            let petSex
            switch (sex) {
                case(0):
                    petSex = Sex.secret;
                    break;
                case(1):
                    petSex = Sex.male;
                    break;
                case(2):
                    petSex = Sex.female;
                    break;
            }
            addPet(new Pet(0, name, age, petSex,genre))
            setIsOpen(false)
        }
        if (close) {
            await close()
        }
        setIsOpen(false)
    }
    const clear = () => {
        textInput.current.value = ""
    }
    const sexOptions = (): CustomSelectOptionInterface[] => {
        const option = [];
        let index = 0;
        for (let key in Sex) {
            option.push({value: index, label: Sex[key]})
            index++;
        }
        return option;
    }
    // const genreOptions = (): CustomSelectOptionInterface[] => {
    //     const option = [];
    //     for (let petGenre of genres) {
    //         if (petGenre && petGenre.pet_id && petGenre.name)
    //             option.push({value: petGenre.id, label: petGenre.name})
    //     }
    //     return option;
    // }
    const textInput = React.createRef<HTMLInputElement>();
    return (
        <ModalRoot
            activeModal={isOpen ? "games" : null}
            onClose={closeModal}>
            <ModalPage id={"games"} header={
                <ModalPageHeader
                    before={<PanelHeaderBack onClick={closeModal}/>}
                    after={<PanelHeaderButton>
                        <Icon28Done onClick={acceptModal}/>
                    </PanelHeaderButton>
                    }>
                    Питомец
                </ModalPageHeader>}>
                <FormLayout>
                    <FormItem top="Кличка">
                        <Input name="name" type="text" defaultValue="Шарик" getRef={textInput}
                               after={
                                   <IconButton
                                       hoverMode="opacity"
                                       aria-label="Очистить поле"
                                       onClick={clear}>
                                       <Icon16Clear/>
                                   </IconButton>}/>
                    </FormItem>
                    <FormItem top="Возраст">
                        <Slider
                            min={0}
                            max={25}
                            value={age}
                            onChange={(value) => {
                                setAge(Math.round(value))
                            }}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            value={String(age)}
                            onChange={(e) => setAge(Math.round(Number(e.target.value)))}
                            type="number"
                        />
                    </FormItem>
                    <FormItem top="Пол">
                        <Select onChange={(e) => setSex(Number(e.target.value))}
                                value={sex}
                                options={sexOptions()}>

                        </Select>
                    </FormItem>
                    <FormItem top="Порода">

                        <Group>
                            <Search value={search} onChange={onChange} after={null}/>
                            {
                                filteredDogs
                                    ? filteredDogs.length > 0 && filteredDogs.map((thematic) => (
                                        <Cell key={thematic.id}
                                              onClick={ (e) => {
                                                  setSearch(thematic.name)
                                                  setGenre(thematic)
                                              }
                                        }
                                            before={<Avatar size={28} src={thematic.image}/>}>
                                            {thematic.name}
                                        </Cell>
                                    ))
                                    : <Footer>Ничего не найдено</Footer>
                            }
                        </Group>
                    </FormItem>
                </FormLayout>
            </ModalPage>
        </ModalRoot>
    )
}
export default PetModal