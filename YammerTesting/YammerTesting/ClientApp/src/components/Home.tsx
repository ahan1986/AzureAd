import * as React from 'react';
import { connect } from 'react-redux';
import MyEditor from './FetchData';

const Home = () => (
    <div>
        hello
        <MyEditor />
  </div>
);

export default connect()(Home);
