import './App.css'

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import type {IPublicClientApplication} from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import SignInSignOutButton from "./ui-components/SignInSignOutButton.tsx";
import WelcomeName from "./ui-components/WelcomeName.tsx";
import Profile from "./ui-components/Profile.tsx";


type AppProps = {
  pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {
    return (
      <MsalProvider instance={pca}>

          <SignInSignOutButton />

          <AuthenticatedTemplate>
              <WelcomeName />

              <Profile/>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
              <div>Please sign-in to see your profile information.</div>
          </UnauthenticatedTemplate>

      </MsalProvider>
    )
}

export default App
