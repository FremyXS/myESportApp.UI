import * as React from 'react'
import CustomTabbar from '../../components/custom tabbar/CustomTabbar';
import {Panel,PanelHeader,View,PanelHeaderButton} from '@vkontakte/vkui';
import { Icon28Notifications } from '@vkontakte/icons';
import DataManager from "@Helpers/DataManager";
import MockManager from "@Helpers/MockManager";

const Main = () => {
    const manager: DataManager = new MockManager()
    const addNotify = () => {

    }
    const addTask = () => {
        manager.addRequest({}).then(value=>{
            console.log(value)
        })
    }
    return(
        <View id="main" activePanel="panel1">
            <Panel id="panel1">
                <PanelHeader
                    before={
                        <PanelHeaderButton onClick={addNotify}>
                            <Icon28Notifications />
                        </PanelHeaderButton>
                    }
                >Заявки</PanelHeader>
                <CustomTabbar addTask={addTask}/>
            </Panel>
        </View>
    )
}
export default Main