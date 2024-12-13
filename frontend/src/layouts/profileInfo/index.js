import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axiosInstance from "services/axiosInstance";
import { useNavigate } from "react-router-dom";

function ProfileInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prefix: "",
    employee_id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    nickName: "",
    gender: "",
    religion: "",
    civilStatus: "",
    citizenship: "",
    birthday: "",
    email: "",
    dept_id: "",
    position: "",
    houseNumber: "",
    barangay: "",
    city: "",
    province: "",
    zip: "",
    placeOfBirth: "",
    philHealth_no: "",
    pagibig_no: "",
    tin: "",
    sss_no: "",
    prc_id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        const userData = response.data.data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          ...userData,
          prefix: userData.prefix || prevFormData.prefix,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true); // Disable the button

    try {
      const response = await axiosInstance.post("/profile", formData);
      if (response.status === 200 || response.status === 201) {
        alert("Profile saved successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving profile:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "An error occurred. Please try again."}`);
    } finally {
      setIsSubmitting(false); // Re-enable the button if submission fails
    }
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
                bgColor="success" // Change to "success" for green gradient
                borderRadius="lg"
                coloredShadow="success" // Change to "success" for green shadow
              >
                <MDTypography variant="h6" color="white">
                  User Profile
                </MDTypography>
              </MDBox>

              <MDBox p={3}>
                {/* Personal Info Section */}
                <MDTypography variant="h6" fontWeight="medium">
                  PERSONAL INFORMATION
                </MDTypography>
                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} md={4}>
                    <MDInput label="Employee ID" fullWidth value={formData.employee_id} disabled />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput label="Department" fullWidth value={formData.dept_id} disabled />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput label="Position" fullWidth value={formData.position} disabled />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput label="First Name" fullWidth value={formData.firstName} disabled />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput label="Middle Name" fullWidth value={formData.middleName} disabled />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput label="Last Name" fullWidth value={formData.lastName} disabled />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDBox mb={3}>
                      <Select
                        value={formData.prefix}
                        onChange={(e) => handleInputChange("prefix", e.target.value)}
                        displayEmpty
                        fullWidth
                        sx={{ height: "40px" }}
                      >
                        <MenuItem value="" disabled>
                          Prefix
                        </MenuItem>
                        <MenuItem value="Mr.">Mr.</MenuItem>
                        <MenuItem value="Mrs.">Mrs.</MenuItem>
                        <MenuItem value="Ms.">Ms.</MenuItem>
                        <MenuItem value="Dr.">Dr.</MenuItem>
                        <MenuItem value="Rev.">Rev.</MenuItem>
                      </Select>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Nick Name"
                      fullWidth
                      value={formData.nickName}
                      onChange={(e) => handleInputChange("nickName", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDBox mb={3}>
                      <Select
                        value={formData.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        displayEmpty
                        fullWidth
                        sx={{ height: "40px" }}
                      >
                        <MenuItem value="" disabled>
                          Gender
                        </MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                      </Select>
                    </MDBox>
                  </Grid>
                </Grid>

                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Religion"
                      fullWidth
                      value={formData.religion}
                      onChange={(e) => handleInputChange("religion", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDBox mb={3}>
                      <Select
                        value={formData.civilStatus}
                        onChange={(e) => handleInputChange("civilStatus", e.target.value)}
                        displayEmpty
                        fullWidth
                        sx={{ height: "40px" }}
                      >
                        <MenuItem value="" disabled>
                          Civil Status
                        </MenuItem>
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                        <MenuItem value="Widowed">Widowed</MenuItem>
                        <MenuItem value="Separated">Separated</MenuItem>
                        <MenuItem value="Divorced">Divorced</MenuItem>
                      </Select>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Citizenship"
                      fullWidth
                      value={formData.citizenship}
                      onChange={(e) => handleInputChange("citizenship", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Birthday"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={formData.birthday}
                      onChange={(e) => handleInputChange("birthday", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Place of Birth"
                      fullWidth
                      value={formData.placeOfBirth}
                      onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Email"
                      type="email"
                      fullWidth
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* Address Section */}
                <MDTypography variant="h6" fontWeight="medium" mt={4}>
                  ADDRESS
                </MDTypography>

                <MDTypography variant="h6" fontWeight=" " mt={4}>
                  Present Address
                </MDTypography>

                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="House Number"
                      fullWidth
                      value={formData.houseNumber}
                      onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="Barangay"
                      fullWidth
                      value={formData.barangay}
                      onChange={(e) => handleInputChange("barangay", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="City"
                      fullWidth
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Province"
                      fullWidth
                      value={formData.province}
                      onChange={(e) => handleInputChange("province", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Zip Code"
                      fullWidth
                      value={formData.zip}
                      onChange={(e) => handleInputChange("zip", e.target.value)}
                    />
                  </Grid>
                </Grid>

                <MDTypography variant="h6" fontWeight=" " mt={4}>
                  Permanent Address
                </MDTypography>

                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="House Number"
                      fullWidth
                      value={formData.houseNumber}
                      onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="Barangay"
                      fullWidth
                      value={formData.barangay}
                      onChange={(e) => handleInputChange("barangay", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="City"
                      fullWidth
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Province"
                      fullWidth
                      value={formData.province}
                      onChange={(e) => handleInputChange("province", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Zip Code"
                      fullWidth
                      value={formData.zip}
                      onChange={(e) => handleInputChange("zip", e.target.value)}
                    />
                  </Grid>
                </Grid>

                <MDTypography variant="h6" fontWeight=" " mt={4}>
                  Provincial Address
                </MDTypography>

                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="House Number"
                      fullWidth
                      value={formData.houseNumber}
                      onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="Barangay"
                      fullWidth
                      value={formData.barangay}
                      onChange={(e) => handleInputChange("barangay", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="City"
                      fullWidth
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Province"
                      fullWidth
                      value={formData.province}
                      onChange={(e) => handleInputChange("province", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Zip Code"
                      fullWidth
                      value={formData.zip}
                      onChange={(e) => handleInputChange("zip", e.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* Documents Section */}
                <MDTypography variant="h6" fontWeight="medium" mt={4}>
                  GOVERNMENT IDENTIFICATION NUMBER
                </MDTypography>
                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="PhilHealth No."
                      fullWidth
                      value={formData.philHealth_no}
                      onChange={(e) => handleInputChange("philHealth_no", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Pag-ibig No."
                      fullWidth
                      value={formData.pagibig_no}
                      onChange={(e) => handleInputChange("pagibig_no", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="TIN No."
                      fullWidth
                      value={formData.tin}
                      onChange={(e) => handleInputChange("tin", e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="SSS No."
                      fullWidth
                      value={formData.sss_no}
                      onChange={(e) => handleInputChange("sss_no", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="PRC ID"
                      fullWidth
                      value={formData.prc_id}
                      onChange={(e) => handleInputChange("prc_id", e.target.value)}
                    />
                  </Grid>
                </Grid>

                <MDBox mt={3}>
                  <MDButton variant="gradient" color="success" onClick={handleSubmit}>
                    Save
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

export default ProfileInfo;
