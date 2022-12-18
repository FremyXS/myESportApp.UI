import * as React from 'react';

import { Icon16Dropdown, Icon56GhostOutline } from '@vkontakte/icons';
import { Card, Div, Panel, PanelHeader, Placeholder, Tabs, TabsItem, View } from '@vkontakte/vkui';

import ApiManager from '@Helpers/ApiManager';


const TABS_ROTATE = {
    matches: 'mathes',
    likes: 'likes',
}

function Matches(){
    const[meLikes, setMeLikes] = React.useState([]);
    const[meMatches, setMematches] = React.useState([]);
    const [tabSelect, setTabSelect] = React.useState(TABS_ROTATE.likes);
    return(
        <View activePanel='panel1'>
            <Panel id='panel1'>
                <PanelHeader>
                    Лайки
                </PanelHeader>
                <Tabs>
                    <TabsItem
                        after={
                        <Icon16Dropdown
                            style={{
                            transform: `rotate(${tabSelect === TABS_ROTATE.likes ? "180deg" : "0"})`,
                            }}
                        />
                        }
                        selected={tabSelect === TABS_ROTATE.likes}
                        onClick={ () => setTabSelect(TABS_ROTATE.likes) }
                        id="tab-likes"
                    >
                        Симпатии
                    </TabsItem>
                    <TabsItem
                        after={
                            <Icon16Dropdown
                                style={{
                                transform: `rotate(${tabSelect === TABS_ROTATE.matches ? "180deg" : "0"})`,
                                }}
                            />
                            }
                            selected={tabSelect === TABS_ROTATE.matches}
                            onClick={ () => setTabSelect(TABS_ROTATE.matches) }
                            id="tab-mathes"
                    >
                        Взаимности
                    </TabsItem>
                    
                </Tabs>
                 {tabSelect === TABS_ROTATE.likes? 
                    <Card>
                        {
                        meLikes.length > 0?
                        <Div>

                        </Div>
                        :
                        <Placeholder icon={<Icon56GhostOutline/>}>
                            Вас ещё никто не лайкнул :3
                        </Placeholder>    
                        }
                    </Card>
                    :
                    <Card>
                        {
                        meMatches.length > 0?
                        <Div>

                        </Div>
                        :
                        <Placeholder icon={<Icon56GhostOutline/>}>
                            Жаль, но взаимности ещё нет ()
                        </Placeholder>    
                        }
                    </Card> 
                }     
            </Panel>
        </View>
    )

    async function getMeLikes(){
        const {data: based} = await ApiManager.getMeLikes();
        setMeLikes(based.data);
    }
}

export default Matches;