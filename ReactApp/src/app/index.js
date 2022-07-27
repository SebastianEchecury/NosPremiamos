import React, { Suspense, useEffect } from "react";
import HomePage from "../pages/HomePage";
import { Toaster } from 'react-hot-toast';
import { loadReCaptcha } from 'react-recaptcha-google'

const App = () => {

    useEffect(() => {
        loadReCaptcha();
    }, [])

    return (
        <Suspense fallback={() => 'loading'} >
            <HomePage />
            <Toaster />
        </Suspense>
    );
};

export default App;