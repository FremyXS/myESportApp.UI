import * as React from 'react';

import { Icon28Profile } from '@vkontakte/icons';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';

function Navigation(){
    return (
        <Tabbar>
            <TabbarItem>
                <Icon28Profile/>
            </TabbarItem>
        </Tabbar>
    )
}

export default Navigation;