import { useMsal } from "@azure/msal-react";

export const SignOutButton = () => {
    const { instance } = useMsal();

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
};