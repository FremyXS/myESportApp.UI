import { Icon28UsersOutline } from "@vkontakte/icons";
import { Button, Card, Group, Headline, Title, Cell, Counter } from "@vkontakte/vkui";
import React from "react";
import { Apply } from "../../types";
// import './Ticket.less';

function Ticket({apply}: {apply: Apply}){
    return(
        <Card color="Lavender 800">
            <Group>
                <Headline>{apply.game}</Headline>
                <Title level="2">{apply.header}</Title>            
            </Group>
            <Group>
                <Cell
                    before={<Icon28UsersOutline />}
                    indicator={<Counter mode="primary">{apply.countSeats}</Counter>}
                    >
                    Количество мест
                </Cell>
                <Cell
                    before={<Icon28UsersOutline />}
                    indicator={<Counter mode="prominent">{apply.countOccupiedSeats}</Counter>}
                    >
                    Доступно мест
                </Cell>
            </Group>
            <Group>
                <Button size="l" appearance="accent" stretched>
                    Принять
                </Button>
            </Group>
        </Card>
    )
}

export default Ticket;