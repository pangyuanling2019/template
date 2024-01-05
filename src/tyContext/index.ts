import React from "react";
import { TyStateClient, TyHttpClient } from "@ty-sdk/core";
import { getTokenInfo, isDev, setTokenInfo } from "@/utils/constants";

const cfg = process.env.CONFIG as any;

//获取配置信息 应用名称（必须）
const tyStateClient = new TyStateClient(cfg);

//创建获取日志的服务
const logHttpClient = new TyHttpClient();

//创建获取wukong的服务
const tingyunHttpClient = new TyHttpClient();

//初始信息
export const initAppInfo = async () => {
  //本地跨域
  const getBaseUrl = (baseURL: string) => {
    if (window.__POWERED_BY_WUJIE__) return baseURL ?? "";
    return isDev ? "" : baseURL ?? "";
  };
  try {
    if (isDev) {
      const tyToken =
        "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODg4ZDQxYy01N2ViLTRlZDctYjkxYi0yNDkyMDFhODRkODYiLCJpZCI6IjhkZDFmZTk2LTA5ODEtNDZhMC04OTM1LTBmMmM5ZDc2YmVjYiIsIm5hbWUiOiJmODBjZjA5ZS01OGYwLTQ0NzUtODIzMi02Y2U3ZjBmOTkxMTgiLCJjb2RlIjoiNzMzZWJjMWYtMTJjNC00NTJiLTgwOTgtMGVkNzVjZjM5MzMzIiwiYWdyZWVtZW50SWQiOiI2MjE2MTMxMy1iM2QxLTQ4MTctYjhkZi05ZjJjNGQ0YjZhNDYiLCJ0eXBlIjoiNjQ1NmU2M2MtZjAzOS00YjQxLWIxN2EtZjkxYzM0ZDdmYzg2IiwicmlnaHRSYW5nZSI6IjFiMGM2YjlhLTdjOGEtNGUzMy1iMDY3LTgzNDEwNzBmNGM4ZCIsInJhbmRvbSI6IjBkN2NjYmRmLTY1YTctNGM1NS04MDY0LTE1ZTM2ZmY5MzY5ZiJ9.OpMR5kPIg-pX2LBHEFU4o5nFo6b8kvh6cCq7G5yUhAjfPMD623FJgAlMoJZdqLnWPb9HIcyO-U33mhxksf2nzDhtwsXEqTNudgPCBQDYPx7zXOagudTSNG0yMa_tmDZbpnED0lcR0_Zz3AZ3DCM5PeNbRBQmjllCBd5ZV94KkicChm9BeNywTJTS1ua9dlmVHPG3GbzadFsoZOREVaCxYGvofwsnpsoNTVn2H3jYX17n7ri1IBBb0PGDNzwPJl-pn72eY3gy8q7JLytB243FZ9DrMuDdebg7WFfpFyc6cf0Eb10y3cVnEIXUPmpeUaWGj6cDro5IXBoL_j9lRe4YpA";
      setTokenInfo({ token: tyToken });
    }

    // 使用获取授权信息
    const credential = await tyStateClient.getAppCredential("default");
    // 获取应用其它信息
    const host = await tyStateClient.getAppState(["wukongHost", "logHost"]);

    //设置log 认证信息
    logHttpClient.setRequestConfig({
      baseURL: getBaseUrl(host?.logHost),
      headers: { Authorization: credential.default },
    });

    //设置tingyun 认证信息
    tingyunHttpClient.setRequestConfig({
      baseURL: getBaseUrl(host?.wukongHost),
      headers: { Authorization: "Bearer " + getTokenInfo()?.token },
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const TyContext = React.createContext({
  logHttpClient,
  tingyunHttpClient,
  tyStateClient,
  tyConfig: cfg,
});
