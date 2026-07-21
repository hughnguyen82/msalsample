import './App.css'

// MSAL imports
import {AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";

import SignInSignOutButton from "./ui-components/SignInSignOutButton.tsx";
import WelcomeName from "./ui-components/WelcomeName.tsx";
import Profile from "./ui-components/Profile.tsx";

import Editor from "./ui-components/Editor.tsx";
import ProfileAutoSignIn from "./ui-components/ProfileAutoSignIn.tsx";

interface AppProps {
    autoSignIn: boolean
}

function App({autoSignIn}: AppProps) {
    if (autoSignIn) {
        return (
            <>
                <ProfileAutoSignIn />
                <Editor/>
            </>
        )
    } else {
        return (
            <>
                <SignInSignOutButton/>

                <AuthenticatedTemplate>
                    <WelcomeName/>
                    <Profile/>

                    <Editor/>
                </AuthenticatedTemplate>

                <UnauthenticatedTemplate>
                    <div>Please sign-in to see your profile information.</div>
                </UnauthenticatedTemplate>
            </>
        )
    }
}

export default App
