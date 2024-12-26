import { useState, useEffect } from "react";
import axiosInstance from "services/axiosInstance";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// BCHRIS React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
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
    position_id: "", // Updated to use position_id
    username: "",
    password: "",
  });

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get("/departments");
        if (response.status === 200) {
          setDepartments(response.data); // Store departments in state
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch positions whenever dept_id changes
  useEffect(() => {
    if (formData.dept_id) {
      const fetchPositions = async () => {
        try {
          const response = await axiosInstance.get(
            `/positionsbyDepartment?department_id=${formData.dept_id}`
          );
          if (response.status === 200) {
            setPositions(response.data); // Store positions in state
          } else {
            setPositions([]); // Reset positions if no data
          }
        } catch (error) {
          console.error("Error fetching positions:", error);
          setPositions([]); // Reset positions on error
        }
      };

      fetchPositions();
    } else {
      setPositions([]); // Reset positions if no department selected
    }
  }, [formData.dept_id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/register", formData);
      if (response.status === 200 || response.status === 201) {
        setOpenSnackbar(true);

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

  const handleCancel = () => {
    navigate("/dashboard"); // Redirect to dashboard on cancel
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
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  Registration
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
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
                    <Select
                      label="Department"
                      fullWidth
                      value={formData.dept_id}
                      onChange={(e) => handleInputChange("dept_id", e.target.value)}
                      displayEmpty
                      sx={{
                        padding: "10px",
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Department
                      </MenuItem>
                      {departments.length > 0 ? (
                        departments.map((dept) => (
                          <MenuItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">Loading...</MenuItem>
                      )}
                    </Select>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Select
                      label="Position"
                      fullWidth
                      value={formData.position_id}
                      onChange={(e) => handleInputChange("position_id", e.target.value)}
                      displayEmpty
                      sx={{
                        padding: "10px",
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Position
                      </MenuItem>
                      {positions.length > 0 ? (
                        positions.map((pos) => (
                          <MenuItem key={pos.id} value={pos.id}>
                            {pos.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">Select Position</MenuItem>
                      )}
                    </Select>
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

                <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                  <MDButton color="success" onClick={handleSubmit}>
                    Register
                  </MDButton>
                  <MDButton color="error" onClick={handleCancel}>
                    Cancel
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Snackbar for success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top", // Position it at the top
          horizontal: "center", // Position it at the center horizontally
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Employee is successfully registered!
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Registration;
