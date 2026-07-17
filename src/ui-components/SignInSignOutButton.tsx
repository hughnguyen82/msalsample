import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { InteractionStatus } from "@azure/msal-browser";
import {loginRequest} from "../authConfig.tsx";
import React from "react";

const SignInSignOutButton = () => {
    const { inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

    if (isAuthenticated) {
        return (
            <div>
                <button onClick={() => instance.logoutPopup({mainWindowRedirectUri: "/"})}>
                    Logout Popup
                </button>

                <button onClick={() => instance.logoutRedirect()}>
                    Logout Redirect
                </button>
            </div>
        )
    } else if (inProgress !== InteractionStatus.Startup && inProgress !== InteractionStatus.HandleRedirect) {
        // inProgress check prevents sign-in button from being displayed briefly after returning from a redirect sign-in. Processing the server response takes a render cycle or two
        return (
            <div>
                <button onClick={instance.loginPopup.bind(instance, loginRequest)}>
                    Login Popup
                </button>

                <button onClick={instance.loginRedirect.bind(instance, loginRequest)}>
                    Login Redirect
                </button>
            </div>
        )
    } else {
        return null;
    }
}

export default SignInSignOutButton;