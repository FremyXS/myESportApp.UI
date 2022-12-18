import * as React from 'react'
import { Button, ButtonGroup, Checkbox, Chip, ChipsInput, FormItem, FormLayout, Group, HorizontalCell, HorizontalScroll, IconButton, ModalPage, ModalPageHeader, ModalRoot, PanelHeader, PanelHeaderButton, PanelHeaderClose, PanelHeaderContent, Placeholder, RangeSlider, SubnavigationButton } from '@vkontakte/vkui';
import { Avatar, Card, CardGrid, Div, Header, InfoRow, Panel, SimpleCell, SplitCol, SplitLayout, Title, View } from '@vkontakte/vkui';
import { UserType,  UserInfo} from '@Pages/Main/types';
import bridge from '@vkontakte/vk-bridge';
import { Icon12Cancel, Icon12Check, Icon20FunnelOutline, Icon24Dismiss, Icon56ReportOutline } from '@vkontakte/icons';
import PetsRowList from './components/PetsRowList/PetsRowList';
// 186800902
import { Paragraph } from '@vkontakte/vkui';

import ApiManager from '@Helpers/ApiManager';
import { data } from './data';

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
    const[listUsers, setListUsers] = React.useState<UserType[]>([]);
    const[selectUserId, setSelectUserId] = React.useState(0);
    const[selectUser, setSelectUser] = React.useState<UserType>({
      vk_id: 0,
    city: '',
    my_pet: {
      pet: {
        pet_id: 0,
        name: '',
        image: ''
      },
      pet_sex: '',
      pet_name: '',
      pet_age: 0
  },
    my_age: 0,
    description: '',
    my_sex: ''
    });

    const [userInfo, setUserInfo] = React.useState<UserInfo>({
      first_name: '',
        last_name: '',
        photo_max_orig: '',
    });

    const [isActive, setIsActive] = React.useState(true);
    React.useEffect(() => {
        getUsersListAsync();
    }, [])

    const [filtersModalOpened, setFiltersModalOpened] = React.useState(false);
    const [filtersUserSex, setFiltersUserSex] = React.useState([0]);
    const [userAge, setUserAge] = React.useState([18, 90]);
    const [filtersDogSex, setFiltersDogSex] = React.useState([0]);
    const [dogAge, setDogAge] = React.useState([2, 10]);
    

    function onAppenedClick(){
      if(selectUserId + 1 >= listUsers.length){        
        setIsActive(false);
        return;
      }
      getUserAsycn(selectUserId + 1, listUsers)
      setSelectUserId(selectUserId + 1);
    }

    function onCancelClick(){
      if(selectUserId + 1 >= listUsers.length){
        setIsActive(false);
        return;
      }
      getUserAsycn(selectUserId + 1, listUsers)
      setSelectUserId(selectUserId + 1);
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
    console.log(userInfo)
    return(
        <SplitLayout modal={modal}>
            <SplitCol>
            <View activePanel='panel1'>
            <Panel id="panel1">
                <PanelHeader>
                  <Div style={{display: 'flex', height: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                  Поиск
                  <IconButton style={{float: 'right'}}                        
                    onClick={openModal}>
                    <Icon20FunnelOutline/>
                  </IconButton>
                  </Div>
                </PanelHeader>
                {isActive? 
                <CardGrid size={'l'}>
                <Card mode="shadow">
                      <Group>
                        
                        <Div style={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '100%'}}>
                            <Avatar size={225} src={userInfo.photo_max_orig}>                            
                            </Avatar>
                        </Div>
                        <Div>
                            <Title>
                                {userInfo.first_name} {userInfo.last_name}
                            </Title>
                        </Div>
                        <Div>
                            <Paragraph style={{wordBreak: 'break-all', color: '#979797'}}>
                              {selectUser.description}
                            </Paragraph>
                        </Div>
                      </Group>
                       <PetsRowList pets={selectUser.my_pet}/>
                      <Group>
                        <Div>
                            <Header mode="secondary">О пользователе:</Header>
                            <SimpleCell multiline>
                                    <InfoRow header="Город">{selectUser.city}</InfoRow>
                            </SimpleCell>
                            <SimpleCell multiline>
                                    <InfoRow header="Пол">{selectUser.my_sex}</InfoRow>
                            </SimpleCell>
                        </Div>                          
                      {/* <FormItem top="Интересы" style={{width:'100%'}}>
                          <ChipsInput
                          readOnly
                          value={selectUser.interests}
                          renderChip={({ id, label, ...rest }) => (
                              <Chip
                                value={id}
                                removable={false}
                                {...rest}
                              >
                                {label}
                              </Chip>
                            )}
                          />
                      </FormItem>        */}
                      </Group>                       
                  </Card>
                  <Div style={{width: '100%'}}>
                      <ButtonGroup mode="horizontal" gap="m" stretched>
                          <Button size='l' appearance="negative" stretched onClick={() => onAppenedClick()}>
                              <Icon12Cancel></Icon12Cancel>
                          </Button>    
                          <Button size='l' appearance="positive" stretched onClick={() => onCancelClick()}>
                              <Icon12Check></Icon12Check>
                          </Button>                        
                      </ButtonGroup>
                    </Div>
              </CardGrid>
              :
              <Placeholder icon={<Icon56ReportOutline/>}>
                Упс, кикого не удалось найти. Пожалуйста измините фильтр поиска или зайдите чуть позже
              </Placeholder>
              }
                
            </Panel>
          </View> 
        </SplitCol>
      </SplitLayout>
        
    )
    
    async function getUserAsycn(id: number, data: UserType[]) {
      setSelectUser(data[id]);
      getUserByID(data[id].vk_id)
    }

    async function getUserByID(vkId:number) {
       await bridge.send('VKWebAppGetUserInfo', {
            user_id: vkId
            })
            .then((data) => { 
                console.log(data);
                setUserInfo(data);
            })
            .catch((error) => {
              // Ошибка
              console.log(error);
            });
    }

    async function getUsersListAsync() {
      
      //  await bridge.send('VKWebAppGetUserInfo', {
      //       user_id: 186800902
      //       })
      //       .then((data) => { 
      //           console.log(data)
      //           setUserInfo(data);
      //       })
      //       .catch((error) => {
      //         // Ошибка
      //         console.log(error);
      //       });

      const {data: based} = await ApiManager.interestingMatchingUsers();
      console.log(based.data);
      setListUsers(based.data);
      getUserAsycn(selectUserId, based.data);
      // setListUsers(data);
      // getUserAsycn(selectUserId, data);
      
    }
}

export default Main
