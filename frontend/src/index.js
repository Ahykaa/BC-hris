import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// BCHRIS React Context Providers
import { MaterialUIControllerProvider } from "context";
import { RoleProvider } from "context/RoleContext";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <RoleProvider>
        {" "}
        {/* Wrap the App component with RoleProvider */}
        <App />
      </RoleProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
