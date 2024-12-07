import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/HRISBG.png";
import axiosInstance from "services/axiosInstance";
import { RoleContext } from "context/RoleContext";

function Basic() {
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Navigation hook
  const { setRole } = useContext(RoleContext);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Handle form submission
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/login", { username, password }); // Changed email to username
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        // Fetch the role after login and update global state
        const userResponse = await axiosInstance.get("/user");
        setRole(userResponse.data.role); // Set the role in context

        navigate("/dashboard");
      } else if (response.data.message) {
        alert(response.data.message);
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSignIn}>
            <MDBox mb={2}>
              <MDInput
                id="username" // Changed from email to username
                type="text" // Username should typically be a text input
                label="Username" // Changed the label from Email to Username
                name="username" // Changed from email to username
                fullWidth
                value={username} // Changed to use username state
                onChange={(e) => setUsername(e.target.value)} // Set username state
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                id="password"
                type="password"
                label="Password"
                name="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
