import { useState, useEffect, useRef } from "react";
import './App.css'

// MSAL imports
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";

import SignInSignOutButton from "./ui-components/SignInSignOutButton.tsx";
import WelcomeName from "./ui-components/WelcomeName.tsx";
import Profile from "./ui-components/Profile.tsx";
import { listDriveItems, loadFile, saveFile } from "./utils/MsGraphApiCall.ts";


type DriveItem = {
    id: string;
    name: string;
};

function App() {
    const isAuthenticated = useIsAuthenticated();
    const [files, setFiles] = useState<DriveItem[]>([]);
    const [selectedFileId, setSelectedFileId] = useState<string>("");
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAuthenticated) {
            listDriveItems().then(items => setFiles(items)).catch(console.error);
        }
    }, [isAuthenticated]);

    const handleLoad = async () => {
        if (!selectedFileId) return;
        try {
            const content = await loadFile(selectedFileId);
            if (editorRef.current) {
                editorRef.current.innerText = content;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSave = async () => {
        if (!selectedFileId || !editorRef.current) return;
        try {
            await saveFile(selectedFileId, editorRef.current.innerText);
            alert("File saved!");
        } catch (e) {
            console.error(e);
        }
    };

    return (
      <>
          <SignInSignOutButton />

          <AuthenticatedTemplate>
              <WelcomeName />
              <Profile/>

              <div>
                  <div id="controls">
                      <label htmlFor="file-selector">File</label>
                      <select id="file-selector" onChange={(e) => setSelectedFileId(e.target.value)}>
                        <option value="">Select a file</option>
                        {files.map(file => (
                            <option key={file.id} value={file.id}>{file.name}</option>
                        ))}
                      </select>
                      <button id="load" onClick={handleLoad}>Load from OneDrive</button>
                      <button id="save" onClick={handleSave}>Save to OneDrive</button>
                  </div>
                  <div id="test-editor" contentEditable="true" ref={editorRef}></div>
              </div>


          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
              <div>Please sign-in to see your profile information.</div>
          </UnauthenticatedTemplate>

      </>
    )
}

export default App
