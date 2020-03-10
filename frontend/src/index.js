import { toast, cssTransition } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';

import * as serviceWorker from './serviceWorker';
import { App } from './components';

toast.configure({
    className: 'toasty',
    toastClassName: 'toasty__toast',
    progressClassName: 'toasty__bar',
    position: 'bottom-right',
    autoClose: 4000,
    transition: cssTransition({
        enter: 'enter',
        exit: 'exit',
        duration: 300,
    }),
});

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
