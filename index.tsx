import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import bridge from '@vkontakte/vk-bridge';
import App from "./src/App";

const root = ReactDOM.createRoot(
  document.getElementById('app-root') as HTMLElement
);

bridge.send("VKWebAppInit").then(r => {
    console.log(r)
});
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
