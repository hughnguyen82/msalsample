import { useEffect, useState } from "react";

import { getUserProfile } from "../utils/MsGraphApiCall.ts";

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

export const Profile = () => {
    const [graphData, setGraphData] = useState<null|GraphData>(null);

    useEffect(() => {
        getUserProfile().then(data => setGraphData(data)).catch(console.error);
    }, []);

    return (
        <div>
            { graphData ? <ProfileData graphData={graphData} /> : null }
        </div>
    );
};

export default Profile;