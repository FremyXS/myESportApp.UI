import * as React from 'react';
import { AppRoot, Root } from '@vkontakte/vkui';
import Main from "@Pages/Main/main";
import UserPage from "@Pages/UserPage/userPage";

function App() {
    return (
    <AppRoot>
      <Root activeView='user'>
        <UserPage id="user"/>
        <Main id="main"/>
      </Root>
    </AppRoot>
  );
}

export default App;
