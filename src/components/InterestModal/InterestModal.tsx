import {useState} from "react";
import MockManager from "@Helpers/MockManager";
import * as React from "react";
import {Pet, Sex} from "../../types";
import {
    CustomSelectOptionInterface, FormItem, FormLayout, IconButton, Input,
    ModalPage,
    ModalPageHeader,
    PanelHeaderBack,
    PanelHeaderButton, Select, Slider
} from "@vkontakte/vkui";
import {ModalRoot} from "@vkontakte/vkui/dist/components/ModalRoot/ModalRootAdaptive";
import {Icon16Clear, Icon28Done} from "@vkontakte/icons";
import DataManager from "@Helpers/DataManager";

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
        setIsOpen(false)
    }
    const interestOptions = (): CustomSelectOptionInterface[] => {
        return interests.map(x => ({value: x.id, label: x.title}));
    };
    React.useEffect(()=>{
        manager.getInterests()
    },[])
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

                </FormLayout>
            </ModalPage>
        </ModalRoot>
    )
}
export default InterestModal