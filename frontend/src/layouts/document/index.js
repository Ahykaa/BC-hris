import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import axiosInstance from "services/axiosInstance"; // Import the axios instance

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// BCHRIS React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Material-UI Snackbar and Alert
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Document() {
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [orNumber, setOrNumber] = useState("");
  const [status, setStatus] = useState("");
  const [numCopies, setNumCopies] = useState(1); // State for number of copies
  const [otherDocument, setOtherDocument] = useState(""); // State for custom document if "Others" is selected
  const [dateOfRequest, setDateOfRequest] = useState(""); // State for date of request

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();
  const documentOptions = [
    "Service Record",
    "Employment Contract",
    "Letter of Recommendation",
    "Clearance Certificate",
    "Others", // Option for custom document
  ];

  // Set the current date as default for the "Date of Request"
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    setDateOfRequest(currentDate);
  }, []);

  const handleCancel = () => {
    // Reset all states to their initial values
    setEmployeeId("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setRequestedDocuments([]);
    setPurpose("");
    setOrNumber("");
    setNumCopies(1);
    setOtherDocument("");
    const currentDate = new Date().toISOString().split("T")[0];
    setDateOfRequest(currentDate);
  };

  const handleSubmit = async () => {
    const requestData = {
      employee_id: employeeId,
      firstName,
      middleName,
      lastName,
      requestedDocuments: requestedDocuments.join(","), // Join the array into a comma-separated string
      purpose,
      orNumber,
      numCopies,
      otherDocument,
      dateOfRequest, // Send the date of request
    };

    try {
      // Make the POST request to the backend
      const response = await axiosInstance.post("/documents", requestData);

      // Handle successful document submission
      console.log("Document request submitted:", response.data);
      setSnackbarMessage("Document request submitted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Optionally, clear form fields if needed
      setEmployeeId("");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setRequestedDocuments([]);
      setPurpose("");
      setOrNumber("");
      setNumCopies(0);
      setOtherDocument("");
      setDateOfRequest("");

      // Set a delay of 2 seconds before redirecting to the dashboard
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard after delay
      }, 2000);
    } catch (error) {
      // Handle error during submission
      console.error("Error submitting document request:", error.response || error);
      setSnackbarMessage("Error submitting document request");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const inputStyle = {
    height: "40px", // Ensures consistent height
  };

  const handleDocumentChange = (e) => {
    const value = e.target.value;
    setRequestedDocuments(value);

    // If "Others" is selected, enable the custom input box
    if (value.includes("Others")) {
      setOtherDocument(""); // Clear "Others" input when selected
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={4}>
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
                  Document Request
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={2}>
                  {/* First Name */}
                  <Grid item xs={12} md={6}>
                    <MDBox mb={1}>
                      <MDTypography variant="caption" fontWeight="medium" color="text">
                        First Name
                      </MDTypography>
                      <MDInput
                        fullWidth
                        sx={inputStyle}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </MDBox>
                  </Grid>

                  {/* Last Name */}
                  <Grid item xs={12} md={6}>
                    <MDBox mb={1}>
                      <MDTypography variant="caption" fontWeight="medium" color="text">
                        Last Name
                      </MDTypography>
                      <MDInput
                        fullWidth
                        sx={inputStyle}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </MDBox>
                  </Grid>

                  {/* Date of Request */}
                  <Grid item xs={12} md={6}>
                    <MDBox mb={1}>
                      <MDTypography variant="caption" fontWeight="medium" color="text">
                        Date of Request
                      </MDTypography>
                      <MDInput fullWidth sx={inputStyle} value={dateOfRequest} disabled />
                    </MDBox>
                  </Grid>

                  {/* Requested Documents */}
                  <Grid item xs={12} md={6}>
                    <MDBox mb={1}>
                      <MDTypography variant="caption" fontWeight="medium" color="text">
                        Requested Documents
                      </MDTypography>
                      <Select
                        fullWidth
                        multiple
                        value={requestedDocuments}
                        onChange={handleDocumentChange}
                        renderValue={(selected) => selected.join(", ")}
                        sx={{
                          ...inputStyle,
                          fontSize: "14px", // Adjust the font size here
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Documents
                        </MenuItem>
                        {documentOptions.map((option) => (
                          <MenuItem key={option} value={option} sx={{ fontSize: "14px" }}>
                            <Checkbox checked={requestedDocuments.includes(option)} />
                            <ListItemText primary={option} />
                          </MenuItem>
                        ))}
                      </Select>
                    </MDBox>

                    {/* Custom Document Input if "Others" is selected */}
                    {requestedDocuments.includes("Others") && (
                      <MDBox mb={1}>
                        <MDTypography variant="caption" fontWeight="medium" color="text">
                          For Other Document, Please Specify
                        </MDTypography>
                        <MDInput
                          fullWidth
                          sx={inputStyle}
                          value={otherDocument}
                          onChange={(e) => setOtherDocument(e.target.value)}
                          placeholder="Specify other document name"
                        />
                      </MDBox>
                    )}
                  </Grid>

                  {/* Number of Copies */}
                  <Grid item xs={12} md={6}>
                    <MDBox mb={1}>
                      <MDTypography variant="caption" fontWeight="medium" color="text">
                        Number of Copies
                      </MDTypography>
                      <MDInput
                        type="number"
                        fullWidth
                        sx={inputStyle}
                        value={numCopies}
                        onChange={(e) => setNumCopies(e.target.value)}
                        inputProps={{ min: 1 }}
                      />
                    </MDBox>
                  </Grid>

                  {/* Purpose */}
                  <Grid item xs={12} md={6}>
                    <MDBox mb={3}>
                      <MDTypography variant="caption" fontWeight="medium" color="text">
                        Purpose
                      </MDTypography>
                      <MDInput
                        fullWidth
                        sx={inputStyle}
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                      />
                    </MDBox>
                  </Grid>
                </Grid>

                {/* Submit and Cancel Buttons */}
                <Grid container spacing={3} justifyContent="flex-end">
                  <Grid item>
                    <MDButton color="success" onClick={handleSubmit}>
                      Submit
                    </MDButton>
                  </Grid>
                  <Grid item>
                    <MDButton color="error" onClick={handleCancel}>
                      Cancel
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Snackbar for success and error messages at the top */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at the top
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </DashboardLayout>
  );
}

export default Document;
