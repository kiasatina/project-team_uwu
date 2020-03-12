import React from 'react';
import { PageContent, Sidenav, Editor } from '../../components';

export default () => {
    return (
        <>
            <PageContent>
                <Editor/>
            </PageContent>
            <Sidenav>Sidenav</Sidenav>
        </>
    );
};
