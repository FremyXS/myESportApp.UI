import * as React from 'react';
import { AppRoot, Root } from '@vkontakte/vkui';
import Main from "@Pages/Main/main";

function App() {
  return (
    <AppRoot>
      <Root activeView='main'>
        <Main id='main'/>
      </Root>
    </AppRoot>
  );
}

export default App;
