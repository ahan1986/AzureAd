import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Yammer from './components/Yammer';
import MyEditor from './components/FetchData';
import FileExplorer from './components/FileExplorer';

import './custom.css'


export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/yammer' component={Yammer} />
        <Route path='/fetch-data/' component={MyEditor} />
        <Route path='/fileexplorer' component={FileExplorer} />
    </Layout>
);
