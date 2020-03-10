import React from 'react';
import { Grid } from 'semantic-ui-react';
import './index.scss';

export const Sidenav = ({ children }) => {
    return (
        <Grid.Column className='sidenav' width={4}>
            <div className='sidenav__content'>{children}</div>
        </Grid.Column>
    );
};
