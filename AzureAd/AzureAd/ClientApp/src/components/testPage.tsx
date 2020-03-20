import * as React from 'react';
import { connect } from 'react-redux';
import { adalApiFetch, getToken, authContext } from '../adalConfig';
import Yammer from './Yammer/Yammer';

export const TestPage = () => {

    React.useEffect(() => {
        fetchData();

    }, []);

    const fetchData = () => {
        const headers = { Authorization: `Bearer ${getToken()}` };
        authContext.handleWindowCallback();
        const user = authContext.getCachedUser();

        fetch('User/current', { headers })
            .then(response => {
                console.log('no error?', response)
                //if (response.ok) {
                //    response.json().then(u => setUser(u));
                //} else {
                //    setUser(undefined);
                //}
            })
            .catch(err => console.log('here are some errors: ', err))
    };

    return (
        <div>

            <Yammer yammerGroup={"4439365"} />
        </div>
    )
};

