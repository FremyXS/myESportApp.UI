import * as React from 'react';
import { AppRoot, Epic } from '@vkontakte/vkui';
import Main from "@Pages/Main/main";
import Navigation from '@Components/Navigation/Navigation';
import Matches from '@Pages/Matches/Matches';
import UserPage from '@Pages/UserPage/userPage';

const ID_VIEWS = {
  search_page: 'reccomendations',
  profile: 'profile',
  matches: 'matches'
};

function App() {
  const [activePage, setActivePage] = React.useState(ID_VIEWS.profile);

  const onChangeActivePage = (e) =>{
    setActivePage(e.currentTarget.dataset.story);
  }

  return (
    <AppRoot>
      <Epic
      activeStory={activePage}
      tabbar={<Navigation onChangeActivePage={onChangeActivePage}/>}
      >
          <UserPage id={ID_VIEWS.profile}/>
          <Main id={ID_VIEWS.search_page}/>  
          <Matches id={ID_VIEWS.matches}/>
        </Epic>         
    </AppRoot>
  );
}

export default App;
