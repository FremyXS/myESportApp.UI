import * as React from 'react';

import { Icon16Dropdown, Icon56GhostOutline } from '@vkontakte/icons';
import { Card, Div, Group, Panel, PanelHeader, Placeholder, Tabs, TabsItem, View } from '@vkontakte/vkui';

import ApiManager from '@Helpers/ApiManager';
import ColumnListInfo from './components/ColumnListInfo/ColumnListInfo';


const TABS_ROTATE = {
    matches: 'mathes',
    likes: 'likes',
}

function Matches(){
    const[meLikes, setMeLikes] = React.useState<number[]>([]);
    const[meMatches, setMematches] = React.useState<number[]>([]);
    const [tabSelect, setTabSelect] = React.useState(TABS_ROTATE.likes);

    React.useEffect(() => {
        getMeLikes();
    }, [])
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
                <Group>
                {tabSelect === TABS_ROTATE.likes? 
                    meLikes.length > 0?
                    <ColumnListInfo users={meLikes} />
                    :
                    <Placeholder icon={<Icon56GhostOutline/>} style={{height: '100vh'}}>
                        Вас ещё никто не лайкнул :3
                    </Placeholder>    
                    :
                    meMatches.length > 0?
                    <ColumnListInfo users={meMatches} />
                    :
                    <Placeholder icon={<Icon56GhostOutline/>} style={{height: '100vh'}}>
                        Жаль, но взаимности ещё нет ()
                    </Placeholder>    
                }     
                </Group>
                 
            </Panel>
        </View>
    )

    async function getMeLikes(){
        const {data: based} = await ApiManager.getMeLikes();
        setMeLikes(based.data);
        const {data: based2} = await ApiManager.getMeReciprocal();
        setMematches(based2.data);
        console.log(based2.data);
    }
}

export default Matches;