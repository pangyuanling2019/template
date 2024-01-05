import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.less';
import { initAppInfo } from './tyContentx';

const config = process.env.CONFIG as any;
const basename = process.env.NODE_ENV === 'production' ? `/${config.appName}` : '';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

if (window.__POWERED_BY_WUJIE__) {
    // eslint-disable-next-line no-undef
    window.__WUJIE_MOUNT = () => {
        initAppInfo().then((res) => {
            if (res) {
                // console.log(res)
                root.render(
                    <BrowserRouter basename={basename}>
                        <App />
                    </BrowserRouter>,
                );
            }
        });
    };
    window.__WUJIE_UNMOUNT = () => {
        root.unmount();
    };
} else {
    initAppInfo().then((res) => {
        if (res) {
            root.render(
                <BrowserRouter basename={basename}>
                    <App />
                </BrowserRouter>,
            );
        }
    });
}
