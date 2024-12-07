import React, { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("employee"); // Default role

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};

// PropTypes validation
RoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
