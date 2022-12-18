import * as React from 'react';

import { Icon28Profile, Icon28LikeOutline, Icon28SearchLikeOutline } from '@vkontakte/icons';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';

function Navigation(){
    return (
        <Tabbar>
            <TabbarItem>
                <Icon28SearchLikeOutline/>
            </TabbarItem>
            <TabbarItem>
                <Icon28LikeOutline/>
            </TabbarItem>
            <TabbarItem>
                <Icon28Profile/>
            </TabbarItem>
        </Tabbar>
    )
}

export default Navigation;