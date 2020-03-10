import React from 'react';
import Navigation from './Navigation';
import { Grid } from 'semantic-ui-react';
import './index.scss';

export const PageLayout = ({ children }) => {
    return (
        <Grid className='pagelayout' padded>
            <Navigation />
            <Grid.Row className='pagelayout__content'>{children}</Grid.Row>
        </Grid>
    );
};
