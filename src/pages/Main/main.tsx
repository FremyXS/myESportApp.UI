import * as React from 'react'
import { Button, ButtonGroup, Checkbox, FormItem, FormLayout, HorizontalCell, HorizontalScroll, ModalPage, ModalPageHeader, ModalRoot, PanelHeader, PanelHeaderButton, PanelHeaderClose, RangeSlider, SubnavigationButton } from '@vkontakte/vkui';
import { Avatar, Card, CardGrid, Div, Header, InfoRow, Panel, SimpleCell, SplitCol, SplitLayout, Title, View } from '@vkontakte/vkui';
import { UserType,  UserInfo} from '@Pages/Main/types';
import bridge from '@vkontakte/vk-bridge';
import { Icon12Cancel, Icon12Check, Icon20FunnelOutline, Icon24Dismiss } from '@vkontakte/icons';
// 186800902

enum SexSwitch {
    'Не указан' = 0,
    'Женский' = 1,
    'Мужской' = 2,
}

const FILTERS_USER_SEX = [
  { value: 0, label: 'Не указан' },
  { value: 1, label: 'Хозяйка' },
  { value: 2, label: 'Хозяин' },
]

const FILTERS_DOG_SEX = [
    { value: 0, label: 'Не указан' },
    { value: 1, label: 'Самка' },
    { value: 2, label: 'Самец' },
]

const Main = () => {
    const[searchUser, setSearchUser] = React.useState<UserType>({
        vkId: 0,
        desk: "dkfjlsjhdklfjhakljfhsalkfjahlsahfksbjksabnfm,sabfsas,bafsbmnsabfmnsabfmsafmnasbfm,bsa,mfbnsasa",
        pets: [
            {
                name: 'Серж',
                age: 2,
                gener: "Псина"
            },
            {
                name: 'Котя',
                age: 6,
                gener: "Кот"
            },
        ]
    })

    const [userInfo, setUserInfo] = React.useState<UserInfo>({
        first_name: '',
        last_name: '',
        sex: 1,
        city: {
            title: '',
        },
        country: {
            title: '',
        },
        photo_max_orig: '',
    });

    React.useEffect(() => {
        getUserAsync();
    }, [])

    const [filtersModalOpened, setFiltersModalOpened] = React.useState(false);
    const [filtersUserSex, setFiltersUserSex] = React.useState([0]);
    const [userAge, setUserAge] = React.useState([18, 90]);
    const [filtersDogSex, setFiltersDogSex] = React.useState([0]);
    const [dogAge, setDogAge] = React.useState([2, 10]);
    

    function onAppenedClick(){

    }

    function onCancelClick(){

    }

    const openModal = () =>{
        setFiltersModalOpened(true);
    }

    const closeModal = () =>{
        setFiltersModalOpened(false);
    }

    const onChangeFilterUserSex = (e) => {
        const { value, checked } = e.currentTarget;
        if (checked) {
            setFiltersUserSex([...filtersUserSex, +value]);
        } else {
            setFiltersUserSex(filtersUserSex.filter((v) => v !== +value));
        }
    };

    const onChangeFilterDogSex = (e) => {
        const { value, checked } = e.currentTarget;
        if (checked) {
            setFiltersDogSex([...filtersDogSex, +value]);
        } else {
            setFiltersDogSex(filtersDogSex.filter((v) => v !== +value));
        }
    };

    const applyFilters = () => {    
        closeModal();
    };

    const MODAL_NAME = 'filters'

    const modal = (
        <ModalRoot
          activeModal={filtersModalOpened ? MODAL_NAME : null}
          onClose={closeModal}
        >
          <ModalPage 
            id={MODAL_NAME}
            header={
              <ModalPageHeader
                before={
                    <PanelHeaderClose onClick={closeModal} />
                }
                after={
                    <PanelHeaderButton onClick={closeModal}>
                        <Icon24Dismiss />
                    </PanelHeaderButton>
                }
              >
                Фильтры
              </ModalPageHeader>
            }
          >
            <FormLayout>
            <Header>Хозяин</Header>
              <FormItem top="Пол">
                {FILTERS_USER_SEX.map(({ value, label }) => {
                  return (
                    <Checkbox
                      value={value}
                      checked={filtersUserSex.includes(value)}
                      onChange={onChangeFilterUserSex}
                    >
                      {label}
                    </Checkbox>
                  );
                })}
              </FormItem>
              <FormItem top={`Возрост: от ${userAge[0]} до ${userAge[1]}`}>
                <RangeSlider min={0} max={100} step={1} defaultValue={userAge}  onChange={setUserAge}/>
              </FormItem>
              <Header>Собака</Header>
              <FormItem top="Пол">
                {FILTERS_DOG_SEX.map(({ value, label }) => {
                  return (
                    <Checkbox
                      value={value}
                      checked={filtersDogSex.includes(value)}
                      onChange={onChangeFilterDogSex}
                    >
                      {label}
                    </Checkbox>
                  );
                })}
              </FormItem>
              <FormItem top={`Возрост: от ${dogAge[0]} до ${dogAge[1]}`}>
                <RangeSlider min={0} max={50} step={1} defaultValue={dogAge}  onChange={setDogAge}/>
              </FormItem>
              <FormItem>
                <Button size="l" stretched onClick={applyFilters}>
                  Показать результаты
                </Button>
              </FormItem>
            </FormLayout>
          </ModalPage>
        </ModalRoot>
      );

    return(
        <SplitLayout modal={modal}>
            <SplitCol>
            <View activePanel='panel1'>
            <Panel id="panel1">
                <PanelHeader>
                    <Div style={{display: 'flex', justifyContent: 'space-between'}}>
                        Поиск
                        <SubnavigationButton
                        before={<Icon20FunnelOutline />}
                        onClick={openModal}
                        expandable />
                    </Div>
                </PanelHeader>
                <CardGrid size={'l'}>
                        <Div style={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '100%'}}>
                            <Avatar size={225} src={userInfo.photo_max_orig}>                            
                            </Avatar>
                        </Div>
                    <Card mode="shadow">
                        <Div>
                            <Title>
                                {userInfo.first_name} {userInfo.last_name}
                            </Title>
                        </Div>
                    </Card>
                    <Card mode="shadow">
                        <Div>
                            <Header mode="secondary">{searchUser.desk}</Header>
                        </Div>
                    </Card>
                    <Card mode="shadow">
                        <Div>
                            <Header mode="secondary">О пользователе:</Header>
                            <SimpleCell multiline>
                                    <InfoRow header="Город">{userInfo.city.title}</InfoRow>
                            </SimpleCell>
                            <SimpleCell multiline>
                                    <InfoRow header="Пол">{SexSwitch[userInfo.sex]}</InfoRow>
                            </SimpleCell>
                        </Div>
                    </Card>
                    <Card mode="shadow">
                        <Header mode="secondary">Питомцы:</Header>
                            <HorizontalScroll
                            showArrows
                            getScrollToLeft={(i) => i - 120}
                            getScrollToRight={(i) => i + 120}>                            
                            <div style={{display: 'flex'}}>
                            {searchUser.pets.map((el, index) =>
                                <HorizontalCell key={index} size='l'>
                                    <Div style={{display:'flex', width:'100%'}}>
                                        <SimpleCell>
                                            <Avatar size={40}></Avatar>
                                        </SimpleCell>
                                        <SimpleCell>
                                            <InfoRow header="Имя">{el.name}</InfoRow>
                                        </SimpleCell>   
                                        <SimpleCell>
                                            <InfoRow header="Парода">{el.gener}</InfoRow>
                                        </SimpleCell>      
                                        <SimpleCell>
                                            <InfoRow header="Возраст">{el.age}</InfoRow> 
                                        </SimpleCell>                                                                 
                                    </Div>
                                </HorizontalCell>  
                            )}   
                            </div>       
                            </HorizontalScroll>
                    </Card>
                    <Div style={{width: '100%'}}>
                    <ButtonGroup mode="horizontal" gap="m" stretched>
                            <Button size='l' appearance="positive" stretched onClick={() => onCancelClick()}>
                                <Icon12Check></Icon12Check>
                            </Button>
                            <Button size='l' appearance="negative" stretched onClick={() => onAppenedClick()}>
                                <Icon12Cancel></Icon12Cancel>
                            </Button>                            
                        </ButtonGroup>
                    </Div>
                </CardGrid>
            </Panel>
        </View> 
            </SplitCol>
        </SplitLayout>
        
    )

    async function getUserAsync() {
       await bridge.send('VKWebAppGetUserInfo', {
            user_id: 186800902
            })
            .then((data) => { 
                console.log(data)
                setUserInfo(data);
            })
            .catch((error) => {
              // Ошибка
              console.log(error);
            });
    }
}
export default Main