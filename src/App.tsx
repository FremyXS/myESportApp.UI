import * as React from 'react';
import { AppRoot, Panel, PanelHeader, Root, View } from '@vkontakte/vkui';
import RecommendationsPage from './features/recommendations/RecommendationsPage';
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
