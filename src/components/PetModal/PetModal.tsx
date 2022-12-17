import {
    FormItem,
    FormLayout,
    ModalPage,
    ModalPageHeader,
    PanelHeaderClose,
    Input,
    IconButton,
    Slider,
    PanelHeaderBack, PanelHeaderButton, Select, CustomSelectOptionInterface
} from "@vkontakte/vkui";
import { ModalRoot } from "@vkontakte/vkui/dist/components/ModalRoot/ModalRootAdaptive";
import * as React from "react";
import {Icon16Clear, Icon28Done} from "@vkontakte/icons";
import {useState} from "react";
import {Sex , Pet} from "../../types"
import MockManager from "../../helpers/MockManager";

const PetModal = ({close, addPet}) => {
    const [isOpen, setIsOpen] = useState(true)
    const [age,setAge] = useState(10)
    const [sex,setSex] = useState(0)
    const [genre,setGenre] = useState(undefined)
    const [genres,setGenres] = useState([])
    const getGenres = () => {
        new MockManager().getAllGenre().then(value => {
            setGenres(value)
            if(value.length){
                setGenre(value[0])
            }
        })
    }
    const closeModal = () => {
        if(close){
            close()
        }
        setIsOpen(false)
    }
    React.useEffect(()=>{
        getGenres()
    },[])
    const acceptModal = () => {
        if(addPet){
            const name = textInput.current.value
            let petSex = Sex.secret
            switch(sex){
                case(0):
                    petSex = Sex.secret;break;
                case(1):
                    petSex = Sex.male;break;
                case(2):
                    petSex = Sex.female;break;
            }
            addPet(new Pet(0,name,age,Sex.male,genre))
        }
        if(close){
            close()
        }
        setIsOpen(false)
    }
    const clear = () => {
        textInput.current.value = ""
    }
    const sexOptions = ():CustomSelectOptionInterface[] => {
        const option = [];
        let index = 0;
        for(let key in Sex){
            option.push({value:index,label:Sex[key]})
            index ++;
        }
        return option;
    }
    const genreOptions = ():CustomSelectOptionInterface[] => {
        const option = [];
        for(let petGenre of genres){
            option.push({value:petGenre.id,label:petGenre.name})
        }
        return option;
    }
    const textInput = React.createRef<HTMLInputElement>();
    return(
        <ModalRoot
            activeModal={isOpen ? "games" : null}
            onClose={closeModal}>
            <ModalPage id={"games"} header={
                    <ModalPageHeader
                        before={<PanelHeaderBack onClick={closeModal} />}
                        after={<PanelHeaderButton>
                            <Icon28Done onClick={acceptModal} />
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
                                       <Icon16Clear />
                                   </IconButton>}/>
                    </FormItem>
                    <FormItem top="Возраст">
                        <Slider
                            min={0}
                            max={25}
                            value={age}
                            onChange={(value) => {setAge(Math.round(value))}}
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
                        <Select onChange={(e) =>{
                            setGenre(genres.filter(x=>x.id === e.target.value)[0])
                        }}
                                value={genre?genre.id:0}
                                options={genreOptions()}>
                        </Select>
                    </FormItem>
                </FormLayout>
            </ModalPage>
        </ModalRoot>
    )
}
export default PetModal