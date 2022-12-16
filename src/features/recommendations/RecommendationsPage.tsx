import { Panel, PanelHeader, View } from "@vkontakte/vkui";
import React from "react";

function RecommendationsPage({id}:{id: string}){
    return(
        <View activePanel="panel1.1">
            <Panel id="panel1.1">
                <PanelHeader>View 1</PanelHeader>
            </Panel>
        </View>
    )
}

export default RecommendationsPage;