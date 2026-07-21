import { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError, type AccountInfo } from "@azure/msal-browser";
import { loginRequest } from "../utils/msalConfig.ts";

// Sample app imports
import { callMsGraph } from "../utils/MsGraphApiCall.ts";

import type {MsalAuthenticationResult} from "@azure/msal-react";

type GraphData = {
    displayName: string,
    jobTitle: string,
    mail: string,
    businessPhones: string[],
    officeLocation: string
};

const ProfileData: React.FC<{graphData: GraphData}> = ({graphData}) => {
    return (
        <div>
            <div>name={graphData.displayName}</div>
            <div>jobTitle={graphData.jobTitle}</div>
            <div>mail={graphData.mail}</div>
            <div>phone={graphData.businessPhones[0]}</div>
            <div>location={graphData.officeLocation}</div>
        </div>
    );
};

const ProfileContent = () => {
    const { instance, inProgress } = useMsal();
    const [graphData, setGraphData] = useState<null|GraphData>(null);

    useEffect(() => {
        if (!graphData && inProgress === InteractionStatus.None) {
            callMsGraph().then(response => setGraphData(response)).catch((e) => {
                if (e instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect({
                        ...loginRequest,
                        account: instance.getActiveAccount() as AccountInfo
                    });
                }
            });
        }
    }, [inProgress, graphData, instance]);
  
    return (
        <div>
            { graphData ? <ProfileData graphData={graphData} /> : null }
        </div>
    );
};

const ErrorComponent: React.FC<MsalAuthenticationResult> = ({error}) => {
    return <div>An Error Occurred: {error ? error.errorCode : "unknown error"}</div>;
}

const Loading = () => {
    return <div>Authentication in progress...</div>
}

const Profile = () => {
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
            <ProfileContent />
        </MsalAuthenticationTemplate>
      )
}

export default Profile;