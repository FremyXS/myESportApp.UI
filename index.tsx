import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import App from "./src/App";
import {AdaptivityProvider, ConfigProvider, useAppearance, usePlatform} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const root = ReactDOM.createRoot(
  document.getElementById('app-root') as HTMLElement
);

bridge.send("VKWebAppInit");

const Aplication = () =>{
    return (<ConfigProvider platform={usePlatform()} appearance={useAppearance()}>
        <AdaptivityProvider>
            <App/>
        </AdaptivityProvider>
    </ConfigProvider>)
}
root.render(
    <Aplication/>
);
