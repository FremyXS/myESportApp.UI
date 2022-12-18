import {useState} from "react";
import MockManager from "@Helpers/MockManager";
import * as React from "react";
import {Interest, Pet, Sex} from "../../types";
import {
    Card,
    CustomSelectOptionInterface, Div, FormItem, FormLayout, IconButton, Input,
    ModalPage,
    ModalPageHeader,
    PanelHeaderBack,
    PanelHeaderButton,
    Text
} from "@vkontakte/vkui";
import {ModalRoot} from "@vkontakte/vkui/dist/components/ModalRoot/ModalRootAdaptive";
import {Icon28Done} from "@vkontakte/icons";
import DataManager from "@Helpers/DataManager";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import ApiManager from "@Helpers/ApiManager";

const InterestModal = ({close, addInterest,userInterest}) => {
    const [isOpen, setIsOpen] = React.useState(true)
    const [interests, setInterest] = useState([]);
    const closeModal = async () => {
        if (close) {
            close()
        }
        setIsOpen(false)
    }
    const acceptModal = () => {
        if (addInterest) {
            addInterest(userInterest)
        }
        if (close) {
            close()
        }
        setIsOpen(false)
    }
    const changeCheckBox = (value,interest) => {
        if(userInterest.map(x=>x.id).includes(interest.id)){
            if(!value.target.checked){
                userInterest = userInterest.filter(x=>x.id != interest.id)
            }
        }
        else{
            if(value.target.checked){
                if(userInterest.length < 6){
                    userInterest.push(new Interest(interest.id,interest.title))
                }
                else{
                    value.target.checked = false
                }
            }
        }
    }
    React.useEffect(() => {
        const fetch = async () => {
            const inter = await ApiManager.getAllInterests()
            setInterest(inter.data.data)
        }
        fetch().then()
    }, [])
    return (
        <ModalRoot
            activeModal={isOpen ? "interest" : null}
            onClose={closeModal}>
            <ModalPage settlingHeight={100} id={"interest"} header={
                <ModalPageHeader
                    before={<PanelHeaderBack onClick={closeModal}/>}
                    after={<PanelHeaderButton>
                        <Icon28Done onClick={acceptModal}/>
                    </PanelHeaderButton>
                    }>
                    Увлечение
                </ModalPageHeader>}>

                <FormItem top={'Выбери свои увлечения'}>
                    {
                        interests.map(e => (<Checkbox key={e.id} defaultChecked={userInterest.map(x=>x.id).includes(e.id)}
                        onClick={(event) => changeCheckBox(event,e)}>
                            {e.title}</Checkbox>))
                    }
                </FormItem>

            </ModalPage>
        </ModalRoot>
    )
}
export default InterestModal