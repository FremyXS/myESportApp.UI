import {PanelHeaderButton, usePlatform, ModalRoot, ModalPage, ModalPageHeader, PanelHeaderClose, Platform, FormLayout, FormItem, Checkbox, Button, Group, CardGrid, SplitLayout, SplitCol} from '@vkontakte/vkui';
import { Icon24Dismiss } from '@vkontakte/icons';
import * as React from 'react';
const FILTERS_SIZE = [
    { value: 0, label: "All" },
    { value: 1, label: "CS:GO" },
    { value: 2, label: "DOTA 2" },
    { value: 3, label: 'Brawl Stars'},
    { value: 4, label: "PUBG" },
    { value: 5, label: "FORTNIGHT" },
];
const FilterModal = ({filtersModalOpened , setFiltersModalOpened, filterGames, setFilterGames, setFiltersCount}) => {
    console.log("filter",filterGames)
    const onChangeFilterSize = (e: any) => {
        const { value, checked } = e.currentTarget;
        const indexAll = filterGames.indexOf(0);
        if (checked) {
            const updateFilters = filterGames.slice();
            if(indexAll > -1){
                updateFilters.slice(indexAll, 1);
            }
            setFilterGames([...updateFilters, +value]);
        } else {
            setFilterGames(filterGames.filter((v) => v !== +value));
        }
    };
    const closeModal = () => {
        setFiltersModalOpened(false);
    };
    const applyFilters = () => {
        let count = 0;

        filterGames.length && count++;

        closeModal();
        setFiltersCount(count);
    };
    const platform = usePlatform();
    return (
        <ModalRoot
            activeModal={filtersModalOpened ? "games" : null}
            onClose={closeModal}
        >
            <ModalPage
                id={"games"}
                header={
                    <ModalPageHeader
                        before={
                            platform !== Platform.IOS && (
                                <PanelHeaderClose onClick={closeModal} />
                            )
                        }
                        after={
                            platform === Platform.IOS && (
                                <PanelHeaderButton onClick={closeModal}>
                                    <Icon24Dismiss />
                                </PanelHeaderButton>
                            )
                        }
                    >
                        Фильтры
                    </ModalPageHeader>
                }
            >
                <FormLayout>
                    <FormItem top="Игры">
                        {FILTERS_SIZE.map(({ value, label }) => {
                            return (
                                <Checkbox
                                    value={value}
                                    checked={filterGames.includes(value)}
                                    onChange={onChangeFilterSize}
                                >
                                    {label}
                                </Checkbox>
                            );
                        })}
                    </FormItem>

                    <FormItem>
                        <Button size="l" stretched onClick={applyFilters}>
                            Готово
                        </Button>
                    </FormItem>
                </FormLayout>
            </ModalPage>
        </ModalRoot>
    )
}
export default  FilterModal