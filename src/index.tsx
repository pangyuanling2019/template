import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.less';
import { initAppInfo } from './tyContext';

const config = process.env.CONFIG as any;
const basename = process.env.NODE_ENV === 'production' ? `/${config.appName}` : '';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

if (window.__POWERED_BY_WUJIE__) {
    window.__WUJIE_MOUNT = () => {
        initAppInfo(!!window.__POWERED_BY_WUJIE__).then((res) => {
            if (res) {
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
    initAppInfo(!!window.__POWERED_BY_WUJIE__).then((res) => {
        if (res) {
            root.render(
                <BrowserRouter basename={basename}>
                    <App />
                </BrowserRouter>,
            );
        }
    });
}
