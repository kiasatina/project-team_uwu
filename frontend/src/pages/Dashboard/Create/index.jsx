import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ViewDrafts } from './ViewDrafts';
import { EditDraft } from './EditDraft';

export default () => (
    <Switch>
        <Route path='/create' exact component={ViewDrafts} />
        <Route path='/create/:draft' exact component={EditDraft} />
    </Switch>
);
