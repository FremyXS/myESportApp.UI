import {useState} from "react";
import MockManager from "@Helpers/MockManager";
import * as React from "react";
import {Pet, Sex} from "../../types";
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

const InterestModal = ({close, addInterest}) => {
    const [isOpen, setIsOpen] = React.useState(true)
    const manager: DataManager = new MockManager();
    const [interests, setInterest] = useState([]);
    const closeModal = async () => {
        if (close) {
            close()
        }
        setIsOpen(false)
    }
    const acceptModal = () => {
        if (addInterest) {

        }
        if (close) {
            close()
        }
        setIsOpen(false)
    }
    React.useEffect(() => {
        const fetch = async () => {
            const inte = await ApiManager.getAllInterests()
            console.log(inte.data.data)
            setInterest(inte.data.data)
        }
        fetch().then()
    }, [])
    console.log(interests)
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
                        interests.map(e => (<Checkbox key={e.id}>{e.title}</Checkbox>))
                    }
                </FormItem>


            </ModalPage>
        </ModalRoot>
    )
}
export default InterestModal