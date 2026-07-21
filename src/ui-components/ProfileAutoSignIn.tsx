// Msal imports
import { MsalAuthenticationTemplate, type MsalAuthenticationResult } from "@azure/msal-react";
import {InteractionType} from "@azure/msal-browser";

import { loginRequest } from "../utils/msalConfig.ts";
import Profile from "./Profile.tsx";

const ErrorComponent: React.FC<MsalAuthenticationResult> = ({error}) => {
    return <div>An Error Occurred: {error ? error.errorCode : "unknown error"}</div>;
}

const Loading = () => {
    return <div>Authentication in progress...</div>
}

const ProfileAutoSignIn = () => {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={authRequest} 
            errorComponent={ErrorComponent} 
            loadingComponent={Loading}
        >
            <Profile />
        </MsalAuthenticationTemplate>
      )
}

export default ProfileAutoSignIn;