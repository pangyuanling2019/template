import React, { useContext, useEffect, useState } from "react";
import { TyContext } from "@/tyContext";
import { message } from "antd";
import { getTokenInfo, isDev, setTokenInfo } from "@/utils/constants";

export default () => {
    const { logHttpClient, tingyunHttpClient, tyStateClient } = useContext(TyContext);

    return <div>欢迎页</div>
};
