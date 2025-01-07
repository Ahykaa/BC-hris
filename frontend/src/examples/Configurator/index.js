// @mui material components
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import axiosInstance from "services/axiosInstance";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// BCHRIS React context
import { useMaterialUIController, setOpenConfigurator } from "context";

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator, darkMode } = controller;

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      current_password: formData.get("current_password"),
      new_password: formData.get("new_password"),
      new_password_confirmation: formData.get("new_password_confirmation"),
    };

    try {
      const response = await axiosInstance.post("/change-password", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Password updated:", response.data.message);
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to update password");
    }
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Settings</MDTypography>
        </MDBox>

        {/* Close button (X) */}
        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox mt={3} lineHeight={1}>
        <MDTypography variant="h6">Change Credentials</MDTypography>
        <MDTypography variant="button" color="text">
          Update your username and password.
        </MDTypography>
        <MDBox
          component="form"
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handlePasswordChange} // Use updated handler
        >
          <TextField label="Username" name="username" variant="outlined" fullWidth required />
          <TextField
            label="Current Password"
            name="current_password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="New Password"
            name="new_password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Confirm Password"
            name="new_password_confirmation"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          <MDButton color="dark" variant="gradient" type="submit" fullWidth>
            Save Changes
          </MDButton>
        </MDBox>
      </MDBox>

      <Divider />
    </ConfiguratorRoot>
  );
}

export default Configurator;
