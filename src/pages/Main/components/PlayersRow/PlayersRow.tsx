import * as React from 'react';
import { Avatar, HorizontalCell, HorizontalScroll } from '@vkontakte/vkui';

function PlayersRow({players}:{players: number[]}){
    return(
        <HorizontalScroll
        showArrows={undefined}
        getScrollToLeft={(i) => i - 120}
        getScrollToRight={(i) => i + 120}>
            <div style={{display: 'flex'}}>
                {players.map((el, index) =>
                    <HorizontalCell  key={index} size='l'>
                        <Avatar size={40}>
                        </Avatar>
                    </HorizontalCell>
                )}
            </div>
        </HorizontalScroll>
    )
}

export default PlayersRow;