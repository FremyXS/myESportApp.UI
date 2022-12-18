import * as React from 'react';

import { Icon28Profile, Icon28LikeOutline, Icon28SearchLikeOutline } from '@vkontakte/icons';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';

function Navigation({onChangeActivePage}:{onChangeActivePage: (e) => void}){
    return (
        <Tabbar>
            <TabbarItem onClick={onChangeActivePage}
            data-story='reccomendations'>
                <Icon28SearchLikeOutline/>
            </TabbarItem>
            <TabbarItem onClick={onChangeActivePage}
            data-story='matches'>
                <Icon28LikeOutline/>
            </TabbarItem>
            <TabbarItem onClick={onChangeActivePage}
            data-story='profile'>
                <Icon28Profile/>
            </TabbarItem>
        </Tabbar>
    )
}

export default Navigation;