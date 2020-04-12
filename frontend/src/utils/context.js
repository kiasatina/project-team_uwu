import React from 'react';

export const UserContext = React.createContext({ user: {}, loading: true });
export const StreamContext = React.createContext({ stream: {}, loading: true });
export const DraftContext = React.createContext({});
