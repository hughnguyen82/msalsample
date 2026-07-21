import { loginRequest, graphConfig, msalInstance } from "./msalConfig.ts";
import {Client} from "@microsoft/microsoft-graph-client";

export async function callMsGraph() {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account
    });

    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}


async function getAuthenticatedClient() {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account
    });

    return Client.init({
        authProvider: (done) => {
            done(null, response.accessToken);
        },
    });
}

export async function saveFile(fileId: string, content: string) {
    const client = await getAuthenticatedClient();
    await client.api(`/me/drive/items/${fileId}/content`).put(content);
}

export async function loadFile(fileId: string) {
    const client = await getAuthenticatedClient();
    return await client.api(`/me/drive/items/${fileId}/content`).get();
}

export async function listDriveItems() {
    const client = await getAuthenticatedClient();
    const response = await client.api('/me/drive/root/children').get();
    return response.value;
}