import React from "react";

// Define the NavMenu component props
type NavMenuProps = {
  // The active component name
  active: "upload" | "chat";
  // The callback function to handle the switching
  onSwitch: (component: "upload" | "chat") => void;
};

// Define the NavMenu component
const NavMenu = ({ active, onSwitch }: NavMenuProps) => {
  // Define the helper function to handle the click event
  const handleClick = (component: "upload" | "chat") => {
    // Invoke the callback function with the component name
    onSwitch(component);
  };

  return (
    <nav className="p-4 shadow-lg bg-blue-900 mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">DocChat</h1>
        <div className="flex mr-auto ml-12">
          <a
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              active === "upload" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleClick("upload")}
          >
            Upload
          </a>
          <a
            className={`px-4 py-2 rounded-lg ml-4 cursor-pointer ${
              active === "chat" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleClick("chat")}
          >
            Chat
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;