import React, { useEffect, useState } from "react";

import { Panel, PanelHeader, View, Group, Card, CardGrid, Div, Title, PanelHeaderButton } from "@vkontakte/vkui";

import {applyes} from './data';
import Ticket from "./components/Ticket/Ticket";
import { Apply } from "./types";
import { Icon28Notifications, Icon28SettingsOutline } from '@vkontakte/icons';

function RecommendationsPage({id}:{id: string}){
    const [tickets, setTickets] = useState<Apply[]>([])

    useEffect(() => {
        setTickets(applyes);
    }, [])
    return(
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
                  }>Recommendations</PanelHeader>
                <Group>
                    <CardGrid size="l">
                        {tickets.map((el)=>
                        <Card key={el.id}>
                            <Div>
                                <Ticket apply={el}/>
                            </Div>
                        </Card>
                    )}
                    </CardGrid>
                </Group>
            </Panel>
        </View>
    )
}

export default RecommendationsPage;