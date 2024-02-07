"use client";

import React, { useState } from "react";
import DocumentUpload from "./DocumentUpload";
import Chat from "./Chat";
import NavMenu from "./NavMenu";

// Define the App component
const App = () => {
  // Define the state for the active component
  const [active, setActive] = useState<"upload" | "chat">("upload");

  // Define the state for the collection name
  const [collection, setCollection] = useState<string>("");

  // Define the helper function to handle the switching
  const handleSwitch = (component: "upload" | "chat") => {
    // Set the active state to the component name
    setActive(component);
  };

  return (
    <>
      <NavMenu active={active} onSwitch={handleSwitch} />
      {active === "upload" && (
        <DocumentUpload onSetCollection={setCollection}/>
      )}
      {active === "chat" && <Chat collection={collection} />}
    </>
  );
};

export default App;