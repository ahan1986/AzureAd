import { AuthenticationContext, AdalConfig, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig: AdalConfig = {
    instance: 'https://login.microsoftonline.com/',
    tenant: '32cb5add-5aee-4fa6-9230-04ab67ef29cb',
    clientId: '3a3e5e51-1192-41cc-9904-04beda0f7d75', // this goes to the url after signing in
    redirectUri: 'http://localhost:55328/signin-oidc', // redirectUri is required. has to match clientId in the Authentication portion in azure portal
    endpoints: {
        api: `3a3e5e51-1192-41cc-9904-04beda0f7d75`, // this matches the cliendId
    },
    // 'cacheLocation' is set to 'sessionStorage' by default, for more info see https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki/Config-authentication-context#configurable-options
    // We change it to'localStorage' because 'sessionStorage' does not work when our app is served on 'localhost' in development.
    cacheLocation: 'localStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

export const getToken = () => authContext.getCachedToken(adalConfig.clientId);

export const adalApiFetch = (url: string, options: any = {}) => {
    return adalFetch(authContext, adalConfig.endpoints!.api, fetch, url, options);
}

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints!.api);
