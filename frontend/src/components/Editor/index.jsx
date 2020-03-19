import React from 'react';
import './index.scss';

export const Editor = ({ draft }) => {
    console.log(draft);
    return <video src={draft.asset.src} autoPlay loop />;
};
