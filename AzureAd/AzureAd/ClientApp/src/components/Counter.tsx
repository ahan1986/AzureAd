import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';
import Yammer from './Yammer/Yammer';

// satisfy typescript with yam not being a property in 'window'
declare global {
    interface Window {
        yam: any;
    }
}

type CounterProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators &
    RouteComponentProps<{}>;

class Counter extends React.PureComponent<CounterProps> {

    public render() {
        return (
            <React.Fragment>
                <Yammer yammerGroup={"4438907"} />
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.counter,
    CounterStore.actionCreators
)(Counter);
