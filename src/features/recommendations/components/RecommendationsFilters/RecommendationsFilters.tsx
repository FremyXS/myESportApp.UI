import { Icon24Filter } from "@vkontakte/icons";
import { Counter, SubnavigationBar, SubnavigationButton } from "@vkontakte/vkui";
import React from "react";

interface RecommendationsFiltersProps{
    filtersCount: number,
    openModal(): void,
}   

function RecommendationsFilters({filtersCount, openModal}:RecommendationsFiltersProps){
    return(
        <SubnavigationBar mode='fixed'>
            <SubnavigationButton
                before={<Icon24Filter />}
                expandable
                after={
                    filtersCount > 0 && (
                        <Counter size="s">{filtersCount}</Counter>
                    )
                }
                onClick={openModal}
            >
                Игры
            </SubnavigationButton>
        </SubnavigationBar>
    )    
}

export default RecommendationsFilters;