import React from 'react';
import { TyStateClient, TyHttpClient } from '@ty-sdk/core';
import { getTokenInfo, isDev, setTokenInfo } from '@/utils/constants';

const cfg = process.env.CONFIG as any;

//获取配置信息 应用名称（必须）
const tyStateClient = new TyStateClient(cfg);

//创建自定义服务
const customeHttpClient = new TyHttpClient();

//初始信息
export const initAppInfo = async (isWujie: boolean) => {
    try {
        //本地调试并且不在主应用环境下调试，需要手动配置token
        if (isDev && !isWujie) {
            //${token}
            const tyToken = '';
            setTokenInfo({ token: tyToken });
            if (!tyToken) return true;
        }

        // 使用获取授权信息
        const credential = await tyStateClient.getAppCredential('default');

        customeHttpClient.setRequestConfig({
            headers: { Authorization: credential.default },
        });

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const TyContext = React.createContext({
    customeHttpClient,
    tyStateClient,
    tyConfig: cfg,
});
