import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Importing MDButton for Submit and Cancel

// Material UI components for Snackbar
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// BCHRIS React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState, useEffect } from "react";
import axiosInstance from "services/axiosInstance";
import { useNavigate } from "react-router-dom"; // Changed to useNavigate

function Leave() {
  const [reason, setReason] = useState("");
  const [reasonForLeave, setReasonForLeave] = useState("");
  const [specificReason, setSpecificReason] = useState(""); // State for specific reason when 'Others' is selected
  const [dateOfApplication, setDateOfApplication] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for managing the Snackbar visibility

  const navigate = useNavigate(); // Updated to useNavigate

  // Automatically set today's date for "Date of Application"
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setDateOfApplication(formattedDate);
  }, []);

  const handleReasonChange = (event) => {
    setReason(event.target.value);
    // Reset the specific reason if nature of leave is changed to something other than 'Others'
    if (event.target.value !== "Others") {
      setSpecificReason("");
    }
  };

  const handleSpecificReasonChange = (event) => {
    setSpecificReason(event.target.value);
  };

  const handleReasonForLeaveChange = (event) => {
    setReasonForLeave(event.target.value);
  };

  // Function to calculate the number of weekdays (excluding weekends) between two dates
  const calculateNumberOfDays = (from, to) => {
    const startDate = new Date(from);
    const endDate = new Date(to);

    // Make sure the startDate is earlier than the endDate
    if (startDate > endDate) {
      // Swap the dates if in the wrong order
      const temp = startDate;
      startDate = endDate;
      endDate = temp;
    }

    let count = 0;
    let currentDate = new Date(startDate);

    // Loop through all the dates from start to end
    while (currentDate <= endDate) {
      // If the current day is not Saturday (6) or Sunday (0), count it
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        count++;
      }
      // Increment the current date by 1 day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setNumberOfDays(count); // Set the final count of weekdays
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
    if (toDate) {
      calculateNumberOfDays(event.target.value, toDate);
    }
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
    if (fromDate) {
      calculateNumberOfDays(fromDate, event.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare data to send to the backend
      const leaveData = {
        leavetype: reason,
        reasonforleave: reasonForLeave, // Store the specific reason provided by the user
        numberofdays: numberOfDays,
        dateofleavefrom: fromDate,
        dateofleaveto: toDate,
        others: reason === "Others" ? specificReason : "", // Save specific reason only if 'Others' is selected
      };

      // Send data using axios to the backend
      const response = await axiosInstance.post("/leave", leaveData);

      // Handle successful submission
      setOpenSnackbar(true); // Show the Snackbar alert
      console.log(response.data); // Log response for debugging

      // Optionally, clear the form fields after submission
      setReason("");
      setReasonForLeave("");
      setSpecificReason(""); // Clear specific reason field
      setFromDate("");
      setToDate("");
      setNumberOfDays(0);

      // Set a delay of 3 seconds before redirecting
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard after delay
      }, 2000);
    } catch (error) {
      // Handle errors (e.g., network issues, validation errors)
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request.");
    }
  };

  const handleCancel = () => {
    // Redirect to the dashboard when cancel is clicked
    navigate("/dashboard");
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
                  Leave Request
                </MDTypography>
              </MDBox>

              <MDBox p={3}>
                <Grid container spacing={1}>
                  {/* Date of Application and Nature of Leave Fields */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <MDTypography variant="caption" fontWeight="medium" color="text">
                          Date of Application
                        </MDTypography>
                        <MDInput
                          type="date"
                          fullWidth
                          value={dateOfApplication}
                          readOnly // Prevent manual editing
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <MDTypography variant="caption" fontWeight="medium" color="text">
                          Nature of Leave
                        </MDTypography>
                        <Select
                          value={reason}
                          onChange={handleReasonChange}
                          displayEmpty
                          fullWidth
                          sx={{ height: "40px" }}
                        >
                          <MenuItem value="" disabled>
                            Select a Nature
                          </MenuItem>
                          <MenuItem value="PersonalLeavew/Pay">Personal Leave w/ Pay</MenuItem>
                          <MenuItem value="PersonalLeavew/oPay">Personal Leave w/o Pay</MenuItem>
                          <MenuItem value="SickLeavew/Pay">Sick Leave w/ Pay</MenuItem>
                          <MenuItem value="SickLeavew/oPay">Sick Leave w/o Pay</MenuItem>
                          <MenuItem value="VacationLeavew/Pay">Vacation Leave w/ Pay</MenuItem>
                          <MenuItem value="VacationLeavew/oPay">Vacation Leave w/o Pay</MenuItem>
                          <MenuItem value="ServiceLeave/OfficialBusiness">
                            Service Leave/Official Business
                          </MenuItem>
                          <MenuItem value="StudyLeave">Study Leave</MenuItem>
                          <MenuItem value="MaternityLeave">Maternity Leave</MenuItem>
                          <MenuItem value="PaternityLeave">Paternity Leave</MenuItem>
                          <MenuItem value="Training">Training</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                      </MDBox>
                    </Grid>
                  </Grid>

                  {/* Reason for Leave and Specific Reason for Others */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <MDTypography variant="caption" fontWeight="medium" color="text">
                          Reason for Leave
                        </MDTypography>
                        <MDInput
                          value={reasonForLeave}
                          onChange={handleReasonForLeaveChange}
                          placeholder="Enter the reason for your leave"
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    {reason === "Others" && (
                      <Grid item xs={12} md={6}>
                        <MDBox mb={3}>
                          <MDTypography variant="caption" fontWeight="medium" color="text">
                            Specific Reason for Leave
                          </MDTypography>
                          <MDInput
                            value={specificReason}
                            onChange={handleSpecificReasonChange}
                            placeholder="Specify your reason"
                            fullWidth
                          />
                        </MDBox>
                      </Grid>
                    )}
                  </Grid>

                  {/* Date of Leave (From and To) */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <MDTypography variant="caption" fontWeight="medium" color="text">
                          Date of Leave (From)
                        </MDTypography>
                        <MDInput
                          type="date"
                          value={fromDate}
                          onChange={handleFromDateChange}
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <MDTypography variant="caption" fontWeight="medium" color="text">
                          Date of Leave (To)
                        </MDTypography>
                        <MDInput
                          type="date"
                          value={toDate}
                          onChange={handleToDateChange}
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                  </Grid>

                  {/* Number of Days */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <MDBox mb={3}>
                        <MDTypography variant="caption" fontWeight="medium" color="text">
                          Number of Days
                        </MDTypography>
                        <MDInput value={numberOfDays} fullWidth readOnly />
                      </MDBox>
                    </Grid>
                  </Grid>

                  {/* Submit and Cancel Buttons */}
                  <Grid item xs={12} md={12}>
                    <MDBox display="flex" justifyContent="flex-end" gap={2}>
                      <MDButton
                        variant="outlined"
                        color="error"
                        onClick={handleCancel}
                        size="small"
                      >
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
                </Grid>
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
          Leave request submitted successfully!
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Leave;
