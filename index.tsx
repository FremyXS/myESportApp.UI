import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import App from "./src/App";
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const root = ReactDOM.createRoot(
  document.getElementById('app-root') as HTMLElement
);

bridge.send("VKWebAppInit").then(r => {
    console.log(r)
});
root.render(
    <ConfigProvider>
       <AdaptivityProvider>
          <App/>
       </AdaptivityProvider>
    </ConfigProvider>
);
