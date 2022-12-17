import {useState} from "react";
import MockManager from "@Helpers/MockManager";
import * as React from "react";
import {Pet, Sex} from "../../types";
import {
    CustomSelectOptionInterface, FormItem, FormLayout, IconButton, Input,
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

const InterestModal = ({close, addInterest}) => {
    const [isOpen,setIsOpen] = React.useState(true)
    const manager: DataManager = new MockManager();
    const [interests, setInterest] = useState([]);
    const closeModal = () => {
        if(close){
            close()
        }
        setIsOpen(false)
    }
    const acceptModal = () => {
        if (addInterest) {

        }
        if(close){
            close()
        }
        setIsOpen(false)
    }
    React.useEffect(()=>{
        manager.getInterests().then(value=>{
            setInterest(value)
        })
    },[])
    console.log(interests)
    return(
        <ModalRoot
            activeModal={isOpen ? "interest" : null}
            onClose={closeModal}>
            <ModalPage id={"interest"} header={
                <ModalPageHeader
                    before={<PanelHeaderBack onClick={closeModal} />}
                    after={<PanelHeaderButton>
                        <Icon28Done onClick={acceptModal} />
                    </PanelHeaderButton>
                    }>
                    Увлечение
                </ModalPageHeader>}>
                <FormLayout>
                    <FormItem top="Выберите свои увлечения">
                        <Checkbox defaultChecked>Я участвую в сборе</Checkbox>
                        {interests?interests.map(value=> (<Checkbox key={value.id}>{value.title}</Checkbox>)
                        ):''}
                    </FormItem>
                </FormLayout>
            </ModalPage>
        </ModalRoot>
    )
}
export default InterestModal