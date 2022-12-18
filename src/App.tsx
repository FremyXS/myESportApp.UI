import * as React from 'react';
import { AppRoot, Epic } from '@vkontakte/vkui';
import Main from "@Pages/Main/main";
import Navigation from '@Components/Navigation/Navigation';
import Matches from '@Pages/Matches/Matches';

const ID_VIEWS = {
  search_page: 'reccomendations',
  profile: 'profile',
  matches: 'matches'
};

function App() {
  const [activePage, setActivePage] = React.useState(ID_VIEWS.search_page);

  const onChangeActivePage = (e) =>{
    setActivePage(e.currentTarget.dataset.story);
  }

  return (
    <AppRoot>
      <Epic
      activeStory={activePage}
      tabbar={<Navigation onChangeActivePage={onChangeActivePage}/>}
      >
          <Main id={ID_VIEWS.search_page}/>  
          <Matches id={ID_VIEWS.matches}/>
        </Epic>         
    </AppRoot>
  );
}

export default App;
