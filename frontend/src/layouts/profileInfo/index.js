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
import FamilyBackground from "./FamilyBackground";
import { Button } from "@mui/material";

function ProfileInfo() {
  const navigate = useNavigate(); // Initialize navigate
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    employee_id: "",
    prefix: "",
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
    type: "",
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

  const [familyBackground, setFamilyBackground] = useState({
    fatherName: "",
    father_occupation: "",
    father_contact_number: "",
    father_date_of_birth: "",

    motherName: "",
    mother_occupation: "",
    mother_contact_number: "",
    mother_date_of_birth: "",

    spouseName: "",
    spouse_occupation: "",
    spouse_contact_number: "",
    spouse_date_of_birth: "",

    emergency_contact_name: "",
    emergency_contact_address: "",
    emergency_contact_number: "",
    emergency_contact_relationship: "",
  });

  // Handle input changes for both pages
  const handleInputChange = (field, value, isFamilyBackground = false) => {
    if (isFamilyBackground) {
      setFamilyBackground((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isProfileInfoComplete = () => {
    const requiredFields = ["employee_id", "firstName", "lastName", "gender", "email"];
    return requiredFields.every((field) => formData[field].trim() !== "");
  };

  // Handle navigation
  const handleNext = () => {
    if (currentPage === 1 && !isProfileInfoComplete()) {
      alert("Please complete all required fields before proceeding.");
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleSubmit = async () => {
    try {
      // Submit profile data
      const profileResponse = await axiosInstance.post("/profile", formData);
      if (profileResponse.status === 200 || profileResponse.status === 201) {
        alert("Profile saved successfully!");
        console.log("Profile Response:", profileResponse.data);
      } else {
        alert("Failed to save profile. Please try again.");
        return; // Stop execution if profile submission fails
      }

      // Submit family background data
      const familyBackgroundResponse = await axiosInstance.post(
        "/familyBackgrounds",
        familyBackground
      );
      if (familyBackgroundResponse.status === 200 || familyBackgroundResponse.status === 201) {
        alert("Family background saved successfully!");
        console.log("Family Background Response:", familyBackgroundResponse.data);
      } else {
        alert("Failed to save family background. Please try again.");
        return; // Stop execution if family background submission fails
      }

      // Redirect after a short delay if both submissions are successful
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Delay of 2 seconds before redirect
    } catch (error) {
      console.error("Error saving data:", error);

      // Show detailed error if available
      if (error.response && error.response.data) {
        console.error("Server Response:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred. Please try again.");
      }
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
                  {currentPage === 1 ? "User Profile" : "Family Background"}
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                {currentPage === 1 ? (
                  <>
                    {/* Personal Info Section */}
                    <MDTypography variant="h6" fontWeight="medium">
                      PERSONAL INFORMATION
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
                          label="First Name"
                          fullWidth
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
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
                          label="Middle Name"
                          fullWidth
                          value={formData.middleName}
                          onChange={(e) => handleInputChange("middleName", e.target.value)}
                        />
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

                    <Grid container spacing={3} mt={2}>
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
                      DOCUMENTS
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
                  </>
                ) : (
                  <FamilyBackground
                    data={familyBackground}
                    onChange={(field, value) => handleInputChange(field, value, true)}
                  />
                )}
                <MDBox mt={3} display="flex" justifyContent="space-between">
                  {currentPage > 1 && (
                    <MDButton color="success" onClick={handlePrevious}>
                      Previous
                    </MDButton>
                  )}
                  {currentPage < 2 ? (
                    <MDButton color="success" onClick={handleNext}>
                      Next
                    </MDButton>
                  ) : (
                    <MDButton color="success" onClick={handleSubmit}>
                      Submit
                    </MDButton>
                  )}
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
