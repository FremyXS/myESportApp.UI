import React, { useEffect, useState } from "react";

import { Panel, PanelHeader, View, Group, Card, CardGrid, Div, Title, PanelHeaderButton, SubnavigationBar, SubnavigationButton, Counter, SplitLayout, ModalRoot, ModalPage, ModalPageHeader, PanelHeaderClose, FormLayout, FormItem, Checkbox, Button, SplitCol, Platform, usePlatform } from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Filter, Icon28Notifications, Icon28SettingsOutline } from '@vkontakte/icons';

import {applyes} from './data';
import Ticket from "./components/RecommendationsTicket/RecommendationsTicket";
import { Apply } from "./types";
import RecommendationsFilters from "./components/RecommendationsFilters/RecommendationsFilters";


const FILTERS_SIZE = [
    { value: 0, label: "All" },
    { value: 1, label: "CS:GO" },
    { value: 2, label: "DOTA 2" },
    { value: 3, label: 'Brawl Stars'},    
    { value: 4, label: "PUBG" },
    { value: 5, label: "FORTNIGHT" },
  ];

function RecommendationsPage({id}:{id: string}){
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
                <View activePanel="panel1.1">
                    <Panel id="panel1.1">
                        <PanelHeader
                            before={
                                <PanelHeaderButton>
                                <Icon28Notifications />
                                </PanelHeaderButton>
                            }
                            after={
                                <PanelHeaderButton>
                                <Icon28SettingsOutline />
                                </PanelHeaderButton>
                            }>Recommendations
                            </PanelHeader>
                        <Group>
                            <RecommendationsFilters
                                filtersCount={filtersCount}
                                openModal={openModal}
                            />
                        </Group>
                        <Group>
                            <CardGrid size="l">
                                {tickets.map((el)=>
                                   (filterGames.includes(el.game) || filterGames.includes(0))  &&                                    
                                    <Ticket apply={el}/>
                            )}
                            </CardGrid>
                        </Group>
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>        
    )
}

export default RecommendationsPage;