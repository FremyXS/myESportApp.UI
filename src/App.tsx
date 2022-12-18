import * as React from 'react';
import { AppRoot, Epic } from '@vkontakte/vkui';
import Main from "@Pages/Main/main";
import Navigation from '@Components/Navigation/Navigation';

const ID_VIEWS = {
  search_page: 'reccomendations',
  profile: 'profile',
  matches: 'matches'
};

function App() {
  return (
    <AppRoot>
      <Epic
      activeStory={ID_VIEWS.search_page}
      tabbar={<Navigation/>}
      >
          <Main id={ID_VIEWS.search_page}/>  
        </Epic>         
    </AppRoot>
  );
}

export default App;
