import 'bootstrap/dist/css/bootstrap.css';

import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';

import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

const DO_NOT_LOGIN = false;

runWithAdal(authContext, () => {
    require('./indexApp.tsx')
}, DO_NOT_LOGIN)
