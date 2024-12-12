import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Edit icon for actions

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// BCHRIS React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Axios instance for API requests
import axiosInstance from "services/axiosInstance";

import PropTypes from "prop-types";

function AdminCompeEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false); // Modal visibility
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Store selected employee data
  const [leaveCredits, setLeaveCredits] = useState(""); // Store leave credits for the selected employee
  const [leaveType, setLeaveType] = useState(""); // Store selected leave type

  // Fetch employee list on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/employees");
        const employeeData = response.data.map((employee) => ({
          employeeID: employee.employee_id,
          lastName: employee.lastName,
          firstName: employee.firstName,
          position: employee.position || "-",
          department: employee.department?.name || "-",
          leaveCredits: employee.leaveCredits || 0, // Assuming leave credits are part of the employee data
          fullDetails: employee, // Store full employee details for editing
        }));

        // Sort employees by last name in ascending order
        employeeData.sort((a, b) => a.lastName.localeCompare(b.lastName));

        setEmployees(employeeData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle editing employee leave credits
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setLeaveCredits(employee.leaveCredits || 0); // Set leave credits for the selected employee
    setLeaveType(employee.leaveType || "Personal"); // Set the leave type for the selected employee
    setOpen(true); // Open the modal
  };

  // Handle leave credits change in modal
  const handleLeaveCreditsChange = (event) => {
    setLeaveCredits(event.target.value);
  };

  // Handle leave type change in modal
  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  // Handle form submission to update leave credits
  const handleSave = async () => {
    try {
      // Send the updated leave credits and leave type to the backend
      await axiosInstance.put(`/employees/${selectedEmployee.employeeID}`, {
        leaveCredits,
        leaveType,
      });

      // Update the employee data locally
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.employeeID === selectedEmployee.employeeID
            ? { ...employee, leaveCredits, leaveType }
            : employee
        )
      );

      // Close the modal after saving
      setOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Error updating leave credits:", error);
    }
  };

  // DataTable columns
  const columns = [
    { Header: "Employee ID", accessor: "employeeID", align: "left" },
    { Header: "Last Name", accessor: "lastName", align: "left" },
    { Header: "First Name", accessor: "firstName", align: "center" },
    { Header: "Position", accessor: "position", align: "center" },
    { Header: "Department", accessor: "department", align: "center" },
    { Header: "Leave Credits", accessor: "leaveCredits", align: "center" }, // Add column for leave credits
    { Header: "Leave Type", accessor: "leaveType", align: "center" }, // Add column for leave type
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <IconButton onClick={() => handleEditClick(row.original)}>
          <EditIcon /> {/* Edit icon */}
        </IconButton>
      ),
      align: "center",
    },
  ];

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
                  Employee List
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                {isLoading ? (
                  <MDTypography variant="subtitle1">Loading...</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: employees }}
                    showTotalEntries={false}
                    isSorted={true}
                    noEndBorder
                    entriesPerPage={false}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Modal for editing leave credits */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Leave Credits</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <>
              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                Employee ID: {selectedEmployee.employeeID}
              </MDTypography>
              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                Name: {selectedEmployee.firstName} {selectedEmployee.lastName}
              </MDTypography>

              {/* Leave Credits input field */}
              <TextField
                label="Leave Credits"
                value={leaveCredits}
                onChange={handleLeaveCreditsChange}
                fullWidth
                type="number"
                variant="outlined"
                style={{ marginBottom: "20px" }}
              />

              {/* Leave Type radio buttons */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Nature of Leave</FormLabel>
                <RadioGroup name="leaveType" value={leaveType} onChange={handleLeaveTypeChange} row>
                  <FormControlLabel
                    value="Personal"
                    control={<Radio />}
                    label="Personal/Emergency Leave (5 days)"
                  />
                  <FormControlLabel
                    value="Vacation"
                    control={<Radio />}
                    label="Vacation (For Summer) (30 days)"
                  />
                  <FormControlLabel value="Sick" control={<Radio />} label="Sick Leave (15 days)" />
                  <FormControlLabel
                    value="Bereavement"
                    control={<Radio />}
                    label="Bereavement Leave (7 days)"
                  />
                  <FormControlLabel
                    value="Birthday"
                    control={<Radio />}
                    label="Birthday Leave (1 day)"
                  />
                  <FormControlLabel
                    value="Maternity"
                    control={<Radio />}
                    label="Maternity Leave (105 days)"
                  />
                </RadioGroup>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

AdminCompeEmployeeList.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      fullDetails: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AdminCompeEmployeeList;
