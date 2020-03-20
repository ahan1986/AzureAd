import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'

import { withAdalLoginApi } from './adalConfig';
import { TestPage } from './components/testPage';

const MyProtectedHomePage = withAdalLoginApi(Home, () => <h1>Loading Page</h1>, (error) => <h1>Error Page : {error.msg} </h1>);

const MyProtectedTestPage = withAdalLoginApi(TestPage, () => <h1>Loading Page</h1>, (error) => <h1>Error Page : {error.msg} </h1>);

export default () => (
    <Layout>
        <Route exact path='/' render={() => <MyProtectedHomePage />} />
        <Route path='/counter' component={Counter} />
        <Route path='/loginTest' render={() => <MyProtectedTestPage />} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
