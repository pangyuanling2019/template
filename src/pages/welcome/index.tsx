import React, { useContext, useEffect, useState } from 'react';
import { TyContext } from '@/tyContext';
import { message } from 'antd';

export default () => {
    const { tyStateClient } = useContext(TyContext);

    return <div>欢迎页</div>;
};
