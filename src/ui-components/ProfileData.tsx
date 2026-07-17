export type GraphData = {
    displayName: string,
    jobTitle: string,
    mail: string,
    businessPhones: string[],
    officeLocation: string
};

export const ProfileData: React.FC<{graphData: GraphData}> = ({graphData}) => {
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
