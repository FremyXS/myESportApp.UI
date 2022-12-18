import * as React from 'react';

import { Icon16Dropdown } from '@vkontakte/icons';
import { Card, Panel, PanelHeader, Tabs, TabsItem, View } from '@vkontakte/vkui';


const TABS_ROTATE = {
    matches: 'mathes',
    likes: 'likes',
}

function Matches(){
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
                <Card>
                        
                </Card>
            </Panel>
        </View>
    )
}

export default Matches;