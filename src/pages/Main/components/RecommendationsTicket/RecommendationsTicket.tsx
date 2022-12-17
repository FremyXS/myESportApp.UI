import { Icon12Cancel, Icon12Add  } from '@vkontakte/icons';
import { Button, Card, Group, Headline, Title, Cell, Counter, Div, HorizontalScroll, HorizontalCell, Avatar, IconButton } from "@vkontakte/vkui";
import * as React from "react";
import { games } from "../../data";
import { Apply} from "../../types";
import PlayersRow from "../PlayersRow/PlayersRow";

function RecommendationsTicket({apply}: {apply: Apply}){

    const ganeName = games.find((el) => el.id === apply.game)

    return(
        <Card>
            <Div>
                <Group>
                    <Headline>{ganeName?.name}</Headline>
                    <Title level="2">{apply.header}</Title>            
                </Group>
                <Group>
                    <div style={{display: 'flex', justifyContent:'space-around'}}>  
                                                        
                        <PlayersRow players={apply.usersLeft}/>      
                            <IconButton height={40} width={40} style={{backgroundColor: 'inherit'}}>
                                <Icon12Add height={30} width={30} color='#c4c4c4'/>
                            </IconButton>                            
                        <Div>
                            <Icon12Cancel height={30} width={30} color='#c4c4c4'/>
                        </Div>
                        <IconButton>
                            <Icon12Add height={30} width={30} color='#c4c4c4'/>
                        </IconButton>
                        <PlayersRow players={apply.usersRight}/>
                    </div>
                </Group>
            </Div>
        </Card>
    )
}

export default RecommendationsTicket;