import {Avatar, Card, Div, Text, Title} from "@vkontakte/vkui";
import {Icon28PawOutline, Icon28SkirtOutline, Icon28UserCardOutline} from "@vkontakte/icons";

import * as React from "react";

const PetCard = ({pet}) => {
    const divStyle:React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "start"
    }
    return(<Card mode="shadow" style={{marginTop:"40px", padding: "8px"}}>
        <Div style={divStyle}>
            <Icon28PawOutline color="#0000CD"/>
            <Title style={{textAlign: "center", marginLeft: "12px"}}>{pet.name}</Title>
        </Div>
        <hr/>
        <Div style={divStyle}>
            <Avatar size={40} src={pet.genre.image}/>
            <Text style={{textAlign: "center", marginLeft: "12px", fontSize: "1.2em"}}>{pet.genre.name}</Text>
        </Div>
        <Div style={divStyle}>
            <Icon28UserCardOutline color="#0000CD"/>
            <Text style={{textAlign: "center", marginLeft: "12px"}}>{`${pet.age} ${pet.age > 4?"Лет":"Года"} `}</Text>
        </Div>
        <Div style={divStyle}>
            <Icon28SkirtOutline color="#0000CD"/>
            <Text style={{textAlign: "center", marginLeft: "12px"}}>{pet.sex}</Text>
        </Div>
    </Card>)
}
export default PetCard