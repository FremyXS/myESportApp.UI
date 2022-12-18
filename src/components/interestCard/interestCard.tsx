import {Card, CardGrid} from "@vkontakte/vkui";
import * as React from "react";

const InterestCard = ({interestings}) => {
    return (
        <CardGrid size="s">
            {interestings.map(value=>(
                <Card mode="shadow" style={{textAlign:"center", padding: "8px 0"}} key={value.interest.id}>
                    {value.interest.title}
                </Card>
            ))}
        </CardGrid>);
}
export default InterestCard