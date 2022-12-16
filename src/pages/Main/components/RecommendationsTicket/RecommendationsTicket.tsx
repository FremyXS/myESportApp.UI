import { Icon28UsersOutline } from "@vkontakte/icons";
import { Button, Card, Group, Headline, Title, Cell, Counter, Div } from "@vkontakte/vkui";
import * as React from "react";
import { games } from "../../data";
import { Apply} from "../../types";

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
            </Div>
        </Card>
    )
}

export default RecommendationsTicket;