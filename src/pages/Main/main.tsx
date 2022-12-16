import * as React from 'react'
import CustomTabbar from '@Components/custom tabbar/CustomTabbar.tsx';
import {Panel,PanelHeader,View,PanelHeaderBack,PanelHeaderButton,Counter} from '@vkontakte/vkui';
import { Icon28Notifications,Icon28ArrowLeftOutline } from '@vkontakte/icons';

const Main = ({closeApp}) => {
    return(
        <View id="main" activePanel="panel1">
            <Panel id="panel1">
                <PanelHeader
                    before={
                        <PanelHeaderButton onClick={closeApp}>
                            <Icon28Notifications />
                        </PanelHeaderButton>
                    }
                >Заявки</PanelHeader>
                <CustomTabbar id="tabbar1"/>
            </Panel>
        </View>
    )
}
export default Main