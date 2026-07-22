// MSAL imports
import {AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";

import SignInSignOutButton from "../ui-components/SignInSignOutButton.tsx";
import WelcomeName from "../ui-components/WelcomeName.tsx";
import Profile from "../ui-components/Profile.tsx";

import FileControls from "./FileControls.tsx";
import ProfileAutoSignIn from "../ui-components/ProfileAutoSignIn.tsx";

interface AppProps {
    autoSignIn: boolean
}

const MsalContent = ({autoSignIn}: AppProps)=> {
    if (autoSignIn) {
        return (
            <>
                <ProfileAutoSignIn />
                <FileControls/>
            </>
        )
    } else {
        return (
            <>
                <SignInSignOutButton/>

                <AuthenticatedTemplate>
                    <WelcomeName/>
                    <Profile/>

                    <FileControls/>
                </AuthenticatedTemplate>

                <UnauthenticatedTemplate>
                    <div>Please sign-in to see your profile information.</div>
                </UnauthenticatedTemplate>
            </>
        )
    }
}

export default MsalContent
