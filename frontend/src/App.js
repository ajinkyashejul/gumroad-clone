import React from "react";
import "./design.css";
import "./index.css";
import Header from "./Header";
import Main from "./Main";
import { FlashMessageProvider } from "./FlashMessageProvider";

function App() {
  return (
    <div>
      <FlashMessageProvider>
        <div className="profile">
          <Header />
          <Main />
        </div>
      </FlashMessageProvider>
    </div>
  );
}
export default App;
