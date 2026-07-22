// react imports
import { useState, useEffect, } from "react";

// MSAL imports
import { useIsAuthenticated } from "@azure/msal-react";

// project imports
import { listDriveItems, loadFile, saveFile } from "../utils/MsGraphApiCall.ts";

// end of imports
//////////////////////////////////////////////////////////////////////////////////////////

type DriveItem = {
    id: string;
    name: string;
};

const FileControls = ()=> {
    const isAuthenticated = useIsAuthenticated();
    const [files, setFiles] = useState<DriveItem[]>([]);
    const [selectedFileId, setSelectedFileId] = useState<string>("");

    useEffect(() => {
        if (isAuthenticated) {
            listDriveItems().then(items => setFiles(items)).catch(console.error);
        }
    }, [isAuthenticated]);

    const handleLoad = async () => {
        if (!selectedFileId) return;
        try {
            const content = await loadFile(selectedFileId);
            const editor = document.getElementById('text-editor');
            if (editor) {
                editor.innerText = content;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSave = async () => {
        const editor = document.getElementById('text-editor');
        const content = editor ? editor.innerText : "";

        if (!selectedFileId) return;
        try {
            await saveFile(selectedFileId, content);
            alert("File saved!");
        } catch (e) {
            console.error(e);
        }
    };

    return (
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
          </div>
    )
}

export default FileControls
