import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as YammerStore from '../store/Yammer';
import $scriptjs from 'scriptjs'
// satisfy typescript with yam not being a property in 'window'
declare global {
    interface Window {
        yam: any;
    }
}

type CounterProps =
    YammerStore.CounterState &
    typeof YammerStore.actionCreators &
    RouteComponentProps<{}>;

class Yammer extends React.Component<CounterProps> {

    componentDidMount() {
        //script loader
        $scriptjs('https://s0-azure.assets-yammer.com/assets/platform_embed.js', function () {
            // All Company in Yammer
            window.yam.connect.embedFeed({
                container: "#embedded-feed",
                network: "core-eng.com",
                feedType: "general",
                feedId: "all",
                // to stay signed in - maybe?
                config: {
                    use_sso: true, // this line enables SSO
                    header: true,
                    footer: true,
                    showOpenGraphPreview: false,
                    defaultGroupId: "all"      // specify default group id to post to 
                }
            });
        })

    }

    public render() {
        return (
            <React.Fragment>
                <div id="embedded-feed" style={{ height: '600px', width: '700px', border: '3px solid red' }}></div>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.yammer,
    YammerStore.actionCreators
)(Yammer);
