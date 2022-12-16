import React from 'react';
import { AppRoot, Root  } from '@vkontakte/vkui';
import RecommendationsPage from './features/recommendations/RecommendationsPage';

function App() {
  return (
    <AppRoot>
      <Root activeView='recommendations'>
        <RecommendationsPage id='recommendations'/>
      </Root>
    </AppRoot>
  );
}

export default App;
