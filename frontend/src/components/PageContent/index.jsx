import React from 'react';
import { Grid } from 'semantic-ui-react';
import './index.scss';

export const PageContent = ({ children }) => {
    return (
        <Grid.Column className='pagecontent' width={12}>
            <main className='pagecontent__content'>{children}</main>
        </Grid.Column>
    );
};
