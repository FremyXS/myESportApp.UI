import * as React from 'react'
import CustomTabbar from '@Components/custom tabbar/CustomTabbar';
import {Panel,PanelHeader,View,PanelHeaderButton, usePlatform, ModalRoot, ModalPage, ModalPageHeader, PanelHeaderClose, Platform, FormLayout, FormItem, Checkbox, Button, Group, CardGrid, SplitLayout, SplitCol} from '@vkontakte/vkui';
import { Icon24Dismiss, Icon28Notifications } from '@vkontakte/icons';
import DataManager from "@Helpers/DataManager";
import MockManager from "@Helpers/MockManager";
import { Apply } from "../../types";
import FilterModal from "@Components/FilerModal/filterModal"
import { useEffect, useState } from 'react';
import { applyes } from './data';
import RecommendationsFilters from '@Components/RecommendationsFilters/RecommendationsFilters';
import RecommendationsTicket from '@Components/RecommendationsTicket/RecommendationsTicket';


const Main = () => {
    const manager: DataManager = new MockManager()
    const [tickets, setTickets] = useState<Apply[]>([])
    const [filtersModalOpened, setFiltersModalOpened] = useState(false)
    const [filtersCount, setFiltersCount] = useState(0);
    const [filterGames, setFilterGames] = useState([0]);
    useEffect(() => {
            setTickets(applyes);
        }, [])
    const addNotify = () => {

    }
    const addTask = () => {
        manager.addRequest({}).then(value=>{
            console.log(value)
        })
    }
    const openModal = () => {
        setFiltersModalOpened(true);
    };
    const modal = () => (<FilterModal filtersModalOpened={filtersModalOpened} setFiltersModalOpened = {setFiltersModalOpened}
        filterGames = {filterGames} setFilterGames={setFilterGames} setFiltersCount={setFiltersCount}/>);
    return(
        <SplitLayout modal={modal()}>
            <SplitCol>
                <View id="main" activePanel="panel1">
                    <Panel id="panel1">
                        <PanelHeader
                            before={
                                <PanelHeaderButton onClick={addNotify}>
                                    <Icon28Notifications />
                                </PanelHeaderButton>
                                }>
                                Заявки
                        </PanelHeader>
                        <Group>
                            <RecommendationsFilters
                            filtersCount={filtersCount}
                            openModal={openModal}
                            />
                        </Group>
                        <Group style={{paddingBottom:'80px'}}>
                            <CardGrid size="l">
                                {tickets.map((el)=>
                                (filterGames.includes(el.game) || filterGames.includes(0))  &&                                    
                                    <RecommendationsTicket apply={el}/>
                                )}
                            </CardGrid>
                        </Group>
                        <CustomTabbar addTask={addTask}/>
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    
    )
}
export default Main