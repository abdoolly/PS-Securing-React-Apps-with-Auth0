import auth0 from 'auth0-js';

const beforeLoginLocation = 'beforeLoginLocation';

export default class Auth {
    constructor(history) {
        this.history = history;
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_CLIENTID,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
            responseType: 'token id_token',
            scope: 'openid profile email',
            audience: process.env.REACT_APP_AUTH0_AUD
        });
    }

    login = () => {
        localStorage.setItem(
            beforeLoginLocation,
            JSON.stringify(this.history.location)
        );
        this.auth0.authorize();
    }

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {

            if (err) {
                console.log('err', err);
                this.history.push('/');
                return alert(`Error ${err.error} Check the console for further details`);
            }

            if (authResult && authResult.accessToken && authResult.idToken) {
                // putting data in localstorage
                this.setSession(authResult);
                this.history.push(this.getRedirectUrlAfterLogin());
            }
        });
    }

    getRedirectUrlAfterLogin() {
        let goToAfterLogin = JSON.parse(localStorage.getItem(beforeLoginLocation));

        if (goToAfterLogin)
            return goToAfterLogin.pathname;

        return '/';
    }

    setSession = (authResult) => {
        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    isAuthenticated() {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.auth0.logout({
            clientID: process.env.REACT_APP_CLIENTID,
            returnTo: 'http://localhost:3000/'
        });

        // redirecting to the home path
        return this.history.push('/');
    }

    getAccessToken = () => {
        return localStorage.getItem('access_token');
    }

}