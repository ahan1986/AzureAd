import * as React from 'react';

import $scriptjs from 'scriptjs'

// satisfy typescript with yam not being a property in 'window'
declare global {
    interface Window {
        yam: any;
    }
}

interface state {

}

interface Props {
    yammerGroup: string
}

export default class Yammer extends React.Component<Props, {}> {

    componentDidMount() {
        this.yammerComp();
    }

    yammerComp = () => {
        const type = this.props.yammerGroup;
        const groupId = this.props.yammerGroup == "general" ? "all" : this.props.yammerGroup
        console.log(type)

        $scriptjs('https://s0-azure.assets-yammer.com/assets/platform_embed.js', function () {
            // All Company in Yammer
            window.yam.connect.embedFeed({
                container: "#embedded-feed",
                network: "core-states.com",
                feedType: type,
                feedId: "all",
                // to stay signed in - maybe?
                config: {
                    //use_sso: true, // this line enables SSO
                    //header: true,
                    //footer: true,
                    //showOpenGraphPreview: false,
                    defaultGroupId: groupId      // specify default group id to post to 
                }
            });
        })
    }

    public render() {

        return (
            <React.Fragment>
                <div id="embedded-feed" style={{ height: '700px', width: '700px', border: '1px solid red' }}></div>
            </React.Fragment>
        );
    }
};
