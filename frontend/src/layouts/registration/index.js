import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// BCHRIS React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState } from "react";
import axiosInstance from "services/axiosInstance";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    employee_id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    date_started: "",
    dept_id: "",
    position: "",
    username: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/register", formData); // Updated API endpoint to /api/register
      if (response.status === 200 || response.status === 201) {
        alert("Employee is successfully registered!");
        console.log("Response:", response.data);

        // Redirect after a short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); // Delay of 2 seconds before redirect
      } else {
        alert("Failed to register employee. Please try again.");
      }
    } catch (error) {
      console.error("Error registering employee:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const [reason, setReason] = useState("");

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Registration
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                {/* Personal Info Section */}
                <MDTypography variant="h6" fontWeight="medium">
                  EMPLOYEE REGISTRATION
                </MDTypography>
                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Employee ID"
                      fullWidth
                      value={formData.employee_id}
                      onChange={(e) => handleInputChange("employee_id", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Last Name"
                      fullWidth
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="First Name"
                      fullWidth
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Middle Name"
                      fullWidth
                      value={formData.middleName}
                      onChange={(e) => handleInputChange("middleName", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Department"
                      fullWidth
                      value={formData.dept_id}
                      onChange={(e) => handleInputChange("dept_id", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Position"
                      fullWidth
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Date Started"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={formData.date_started}
                      onChange={(e) => handleInputChange("date_started", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Username"
                      fullWidth
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Password"
                      fullWidth
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                    />
                  </Grid>
                </Grid>

                <MDBox mt={3}>
                  <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                    Register
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Registration;
