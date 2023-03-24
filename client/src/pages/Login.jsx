import React from 'react';
import {useGoogleLogin, useGoogleLogout} from '@leecheuk/react-google-login';
import { useState } from 'react';
import { Button } from "reactstrap";

const clientId = '410143290104-uo4i3j4jg0o03kr8momlu3ro1ogg0vee.apps.googleusercontent.com';

function Login() {
    const [user, setUser] = useState({
        name: "",
        loggedIn: false,
        prof: null,
    });

    const onSuccess = (res) => {
        setUser({
            name: res.profileObj.givenName,
            loggedIn: true,
            prof: res.profileObj,
        })

        console.log('Login Success: currentUser:', res.profileObj);
        localStorage.setItem('authToken', res.tokenObj.id_token);
        localStorage.setItem('user', res.profileObj.givenName);
        localStorage.setItem('userEmail', res.profileObj.email);
        refreshTokenSetup(res);
    };

    const onLogoutSuccess = (res) => {
        setUser({
            name: "",
            loggedIn: false,
        })
        localStorage.setItem('authToken', '');
        localStorage.setItem('user', '');
        localStorage.setItem('email',' ');
        console.log('Logged out Success');

        window.location.replace("/")
    };

    const onLogoutFailure = () => {
        setUser({
            name: "",
            loggedIn: false,
        })
        console.log('Handle failure cases');
    };

    const refreshTokenSetup = (res) => {
        let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

        const refreshToken = async () => {
            const newAuthRes = await res.reloadAuthResponse();
            refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
            localStorage.setItem('authToken', newAuthRes.id_token);
            setTimeout(refreshToken, refreshTiming);
            setUser({
                name: user.name,
                loggedIn: true,
                hasAccount: user.hasAccount,
            })
        };

        setTimeout(refreshToken, refreshTiming);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        setUser({
            name: "",
            loggedIn: false,
        })
    };

    const {signIn} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
    });

    const {signOut} = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onLogoutFailure,
    });

    if (user.loggedIn === true) {
        return (
            <>
                <Button variant="outline-success" onClick={signOut}>
                    Sign out
                </Button>
            </>
        )
    }  else {
        return (
            <Button variant="outline-success" onClick={signIn}>
                Sign in
            </Button>
        )
    }
}

export default Login;