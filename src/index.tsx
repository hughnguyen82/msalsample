import "./index.css"

import React from "react";
import ReactDOM from "react-dom/client";


import { MsalProvider } from "@azure/msal-react";
import App from "./App";

// MSAL imports
import {EventType, type EventMessage, type AccountInfo} from "@azure/msal-browser";


import {msalInstance} from "./utils/msalConfig.ts";

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

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    );
});