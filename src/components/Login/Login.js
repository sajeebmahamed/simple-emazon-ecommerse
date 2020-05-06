import React from 'react';
import Auth from './UseAuth';
const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
            .then(res => {
                window.location.pathname = '/review';
            })
    }
    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = '/';
        })
    }
    return (
        <div>
            {
                auth.user ? <button onClick={handleSignOut}> Sign Out </button> :
                    <button onClick={handleSignIn}>Sign In With Google</button>
            }
        </div>
    );
};

export default Login;