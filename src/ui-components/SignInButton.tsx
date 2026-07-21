import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../utils/msalConfig.ts";
import React from "react";

export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <div>
            <button onClick={() => {instance.loginPopup(loginRequest)}}>
                Login Popup
            </button>

            <button onClick={() => {instance.loginRedirect(loginRequest)}}>
                Login Redirect
            </button>
        </div>
    )
};