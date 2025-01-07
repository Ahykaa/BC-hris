import React, { useState } from "react";

function Settings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    console.log("Saved settings:", { username, password });
    alert("Settings saved successfully!");
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    alert("Changes canceled!");
  };

  return (
    <div className="settings">
      <div className="form-group">
        <label htmlFor="username">Change Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Change Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button onClick={handleSave} className="save-button">
          Save
        </button>
        <button onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Settings;
