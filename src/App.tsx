import React from "react";
import { UserDataPage } from "./pages/UserDataPage";
import { UserDataProvider } from "./pages/UserDataPage/helpers/UserDataProvider";

function App() {
  return (
    <div className="App">
      <UserDataProvider>
        <UserDataPage />
      </UserDataProvider>
    </div>
  );
}

export default App;
