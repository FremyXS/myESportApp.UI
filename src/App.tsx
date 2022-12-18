import * as React from 'react';
import { AppRoot, Root } from '@vkontakte/vkui';
import Main from "@Pages/Main/main";
import Navigation from '@Components/Navigation/Navigation';

function App() {
  return (
    <AppRoot>
      <Root activeView='main'>
        <Main id='main'/>        
      </Root>
      <Navigation/>
    </AppRoot>
  );
}

export default App;
