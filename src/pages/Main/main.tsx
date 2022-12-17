import * as React from 'react'
import CustomTabbar from '@Components/custom tabbar/CustomTabbar';
import {Panel,PanelHeader,View,PanelHeaderButton, usePlatform, ModalRoot, ModalPage, ModalPageHeader, PanelHeaderClose, Platform, FormLayout, FormItem, Checkbox, Button, Group, CardGrid, SplitLayout, SplitCol} from '@vkontakte/vkui';
import { Icon24Dismiss, Icon28Notifications } from '@vkontakte/icons';
import DataManager from "@Helpers/DataManager";
import MockManager from "@Helpers/MockManager";
import { Apply } from './types';
import { useEffect, useState } from 'react';
import { applyes } from './data';
import RecommendationsFilters from '../../components/RecommendationsFilters/RecommendationsFilters';
import RecommendationsTicket from '../../components/RecommendationsTicket/RecommendationsTicket';


const FILTERS_SIZE = [
    { value: 0, label: "All" },
    { value: 1, label: "CS:GO" },
    { value: 2, label: "DOTA 2" },
    { value: 3, label: 'Brawl Stars'},    
    { value: 4, label: "PUBG" },
    { value: 5, label: "FORTNIGHT" },
  ];

const Main = () => {
    const manager: DataManager = new MockManager()
    const addNotify = () => {

    }
    const addTask = () => {
        manager.addRequest({}).then(value=>{
            console.log(value)
        })
    }

    const platform = usePlatform();

    const [tickets, setTickets] = useState<Apply[]>([])   
    const [filtersModalOpened, setFiltersModalOpened] = useState(false)
    const [filtersCount, setFiltersCount] = useState(0);
    const [filterGames, setFilterGames] = useState([0]);

    useEffect(() => {
        setTickets(applyes);
    }, [])


    const openModal = () => {
        setFiltersModalOpened(true);
    };

    const closeModal = () => {
        setFiltersModalOpened(false);
    };

    const onChangeFilterSize = (e: any) => {
        const { value, checked } = e.currentTarget;
        const indexAll = filterGames.indexOf(0);
        if (checked) {
            const updateFilters = filterGames.slice();
            if(indexAll > -1){                
                updateFilters.slice(indexAll, 1);
            }
            console.log(updateFilters);
            setFilterGames([...updateFilters, +value]);
        } else {
            setFilterGames(filterGames.filter((v) => v !== +value));
        }
    };  

    const applyFilters = () => {
        let count = 0;
    
        filterGames.length && count++;
    
        closeModal();
        setFiltersCount(count);

        console.log(filterGames);
    };

    const modal = (
        <ModalRoot
          activeModal={filtersModalOpened ? "games" : null}
          onClose={closeModal}
        >
          <ModalPage
            id={"games"}
            header={
              <ModalPageHeader
                before={
                  platform !== Platform.IOS && (
                    <PanelHeaderClose onClick={closeModal} />
                  )
                }
                after={
                  platform === Platform.IOS && (
                    <PanelHeaderButton onClick={closeModal}>
                      <Icon24Dismiss />
                    </PanelHeaderButton>
                  )
                }
              >
                Фильтры
              </ModalPageHeader>
            }
          >
            <FormLayout>
              <FormItem top="Игры">
                {FILTERS_SIZE.map(({ value, label }) => {
                  return (
                    <Checkbox
                      value={value}
                      checked={filterGames.includes(value)}
                      onChange={onChangeFilterSize}
                    >
                      {label}
                    </Checkbox>
                  );
                })}
              </FormItem>
    
              <FormItem>
                <Button size="l" stretched onClick={applyFilters}>
                    Готово
                </Button>
              </FormItem>
            </FormLayout>
          </ModalPage>
        </ModalRoot>
      );
    return(
        <SplitLayout modal={modal}>
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