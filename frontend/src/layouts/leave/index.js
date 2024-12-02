import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Importing MDButton for Submit and Cancel

// BCHRIS React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState, useEffect } from "react";

function Leave() {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [dateOfApplication, setDateOfApplication] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);

  // Automatically set today's date for "Date of Application"
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setDateOfApplication(formattedDate);
  }, []);

  const handleReasonChange = (event) => {
    setReason(event.target.value);
    if (event.target.value !== "Others") {
      setOtherReason(""); // Reset other reason when a predefined option is selected
    }
  };

  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value);
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

  const handleSubmit = () => {
    // Logic for form submission (e.g., API call)
    alert("Leave request submitted!");
  };

  const handleCancel = () => {
    // Logic for canceling the form (e.g., clearing the form)
    alert("Leave request canceled!");
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
                  Leave Requests
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3}>
                  {/* Column 1 */}
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
                    {/* 'From' and 'To' Fields Side by Side */}
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <MDBox mb={3}>
                          <MDTypography variant="caption" fontWeight="medium" color="text">
                            From
                          </MDTypography>
                          <MDInput
                            type="date"
                            fullWidth
                            value={fromDate}
                            onChange={handleFromDateChange}
                          />
                        </MDBox>
                      </Grid>
                      <Grid item xs={6}>
                        <MDBox mb={3}>
                          <MDTypography variant="caption" fontWeight="medium" color="text">
                            To
                          </MDTypography>
                          <MDInput
                            type="date"
                            fullWidth
                            value={toDate}
                            onChange={handleToDateChange}
                          />
                        </MDBox>
                      </Grid>
                    </Grid>
                    {/* Number of Days Box */}
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <MDBox mb={3}>
                          <MDTypography variant="caption" fontWeight="medium" color="text">
                            Number of Days
                          </MDTypography>
                          <MDInput
                            type="number"
                            fullWidth
                            value={numberOfDays}
                            readOnly // Prevent manual editing
                          />
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Column 2 */}
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
                    <MDBox mb={3}>
                      <MDTypography variant="caption" fontWeight="medium" color="text">
                        Reason for Leave
                      </MDTypography>
                      <MDInput placeholder="Enter the reason for your leave" fullWidth />
                    </MDBox>
                    {reason === "Others" && (
                      <MDBox mb={3}>
                        <MDTypography variant="caption" fontWeight="medium" color="text">
                          For Other Reasons, Please Specify
                        </MDTypography>
                        <MDInput
                          value={otherReason}
                          onChange={handleOtherReasonChange}
                          placeholder="Specify your reason"
                          fullWidth
                        />
                      </MDBox>
                    )}
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
      <Footer />
    </DashboardLayout>
  );
}

export default Leave;
