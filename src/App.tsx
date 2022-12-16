import React from 'react';
import { AppRoot, Panel, PanelHeader, Root, View } from '@vkontakte/vkui';
import RecommendationsPage from './features/recommendations/RecommendationsPage';

function App() {
  return (
    <AppRoot>
      <Root activeView='view1'>
        <RecommendationsPage id='view1'/>
      </Root>
    </AppRoot>
  );
}

export default App;
