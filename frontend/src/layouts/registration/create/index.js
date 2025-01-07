import { useState, useEffect } from "react";
import axiosInstance from "services/axiosInstance";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
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
    position_id: "",
    username: "",
    password: "",
    role: "Employee", // Default role
  });

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility

  const roles = ["employee", "admin", "adminCompre", "superAdmin"];

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get("/departments");
        if (response.status === 200) {
          setDepartments(response.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch positions when dept_id changes
  useEffect(() => {
    if (formData.dept_id) {
      const fetchPositions = async () => {
        try {
          const response = await axiosInstance.get(
            `/positionsbyDepartment?department_id=${formData.dept_id}`
          );
          if (response.status === 200) {
            setPositions(response.data);
          } else {
            setPositions([]);
          }
        } catch (error) {
          console.error("Error fetching positions:", error);
          setPositions([]);
        }
      };

      fetchPositions();
    } else {
      setPositions([]);
    }
  }, [formData.dept_id]);

  // Auto-generate username and password
  useEffect(() => {
    if (formData.firstName && formData.lastName) {
      const username = `${formData.firstName[0].toLowerCase()}.${formData.lastName.toLowerCase()}`;
      setFormData((prev) => ({
        ...prev,
        username,
        password: username, // Set initial password as the username
      }));
    }
  }, [formData.firstName, formData.lastName]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/register", {
        ...formData,
        forcePasswordChange: true, // Enforce password change
      });
      if (response.status === 200 || response.status === 201) {
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        alert("Failed to register employee. Please try again.");
      }
    } catch (error) {
      console.error("Error registering employee:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate("/dashboard");
  };

  const formatRole = (role) => {
    return role
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
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
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="department-label">Department</InputLabel>
                      <Select
                        labelId="department-label"
                        id="department-select"
                        value={formData.dept_id}
                        onChange={(e) => handleInputChange("dept_id", e.target.value)}
                        label="Department"
                        fullWidth
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
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="position-label">Position</InputLabel>
                      <Select
                        labelId="position-label"
                        id="position-select"
                        value={formData.position_id}
                        onChange={(e) => handleInputChange("position_id", e.target.value)}
                        label="Position"
                        fullWidth
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
                          <MenuItem value="">Loading...</MenuItem>
                        )}
                      </Select>
                    </FormControl>
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
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role-label"
                        id="role-select"
                        value={formData.role}
                        label="Role"
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        fullWidth
                        sx={{
                          padding: "10px",
                          fontSize: "1rem",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                          },
                        }}
                      >
                        {roles.map((role) => (
                          <MenuItem key={role} value={role}>
                            {formatRole(role)} {/* Use the formatRole function here */}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <MDInput label="Username" fullWidth value={formData.username} disabled />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput label="Password" fullWidth value={formData.password} disabled />
                  </Grid>
                </Grid>

                {/* Submit and Cancel Buttons */}
                <Grid item xs={12} md={12}>
                  <MDBox display="flex" justifyContent="flex-end" gap={2}>
                    <MDButton variant="outlined" color="error" onClick={handleCancel} size="small">
                      Cancel
                    </MDButton>

                    <MDButton
                      variant="gradient"
                      color="success"
                      onClick={handleSubmit}
                      size="small"
                    >
                      Submit
                    </MDButton>
                  </MDBox>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Employee is successfully registered!
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Registration;
