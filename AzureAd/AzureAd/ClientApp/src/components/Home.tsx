import * as React from 'react';
import { connect } from 'react-redux';
import { adalApiFetch, getToken, authContext } from '../adalConfig';
import Yammer from './Yammer/Yammer';

const Home = () => {

    const [user, setUser] = React.useState<string>("general");

    React.useEffect(() => {
        fetchData();

    }, []);

    const fetchData = () => {
        const headers = { Authorization: `Bearer ${getToken()}` };
        authContext.handleWindowCallback();
        const user = authContext.getCachedUser();

        //fetch('User/current', { headers })
        //    .then(response => {
        //        console.log('no error?', response)
        //        if (response.ok) {
        //            response.json().then(u => console.log('what is this u: ', u));
        //        } else {
        //            console.log('u is not okay and it is: ', response);
        //        }
        //    })
        //    .catch(err => console.log('here are some errors: ', err))

        adalApiFetch('User/current', { headers })
            .then(res => res.json())
            .then(data => console.log('testing the api', data))
            .catch(error => console.log('there was an error', error))
            
    };

    return (
        <div>
            <Yammer yammerGroup={user ? user : "general"} />
        </div>
    )
};

export default connect()(Home);
