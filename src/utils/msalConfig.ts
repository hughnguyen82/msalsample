import {LogLevel, BrowserUtils, PublicClientApplication} from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: "e577bf35-7234-4a7f-aaec-08f0d0d213c4",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "/msalsample/redirect.html",
        postLogoutRedirectUri: "/msalsample/redirect.html",
        onRedirectNavigate: () => !BrowserUtils.isInIframe()
    },
    cache: {
        cacheLocation: "localStorage",
    },
    system: {
        allowPlatformBroker: false, // Disables WAM Broker
        loggerOptions: {
            loggerCallback: (level: number, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: ["User.Read", "Files.ReadWrite"]
};

export const msalInstance = new PublicClientApplication(msalConfig);
