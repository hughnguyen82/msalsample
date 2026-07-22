import React from "react";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import {EventType, type EventMessage, type AccountInfo} from "@azure/msal-browser";


import {msalInstance} from "../utils/msalConfig.ts";
import MsalContent from "./MsalContent.tsx";


const MsalContainer = () => {
    // use React useState and useEffect to manage the initialization state and ensure MsalProvider is only rendered
    // after msalInstance.initialize() has successfully completed.
    const [initialized, setInitialized] = React.useState(false);

    React.useEffect(() => {
        msalInstance.initialize().then(() => {
            // Account selection logic is app dependent. Adjust as needed for different use cases.
            const accounts = msalInstance.getAllAccounts();
            if (accounts.length > 0) {
                msalInstance.setActiveAccount(accounts[0]);
            }

            msalInstance.addEventCallback((event: EventMessage) => {
                if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                    const account : AccountInfo =  event.payload as AccountInfo;
                    msalInstance.setActiveAccount(account);
                }
            });

            setInitialized(true);
        }).catch(error => console.error(error));
    }, []);

    if (!initialized) {
        return <div>Initializing...</div>;
    }

    return (
        <MsalProvider instance={msalInstance}>
            <MsalContent autoSignIn={false} />
        </MsalProvider>
    );
}

export default MsalContainer;

