import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Import Add icon for the button
import Visibility from "@mui/icons-material/Visibility"; // Import the visibility icon

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
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Registration from "./create"; // Import Registration component

const capitalizeFirstLetter = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

function RegistrationList() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/employees");
        setEmployees(
          response.data.map((employee) => ({
            "employee id": employee.employee_id,
            "last name": capitalizeFirstLetter(employee.lastName),
            "first name": capitalizeFirstLetter(employee.firstName),
            position: capitalizeFirstLetter(employee.position || "-"),
            department: capitalizeFirstLetter(employee.department?.name || "-"),
            role: capitalizeFirstLetter(employee.role),
          }))
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedRequest(null); // Clear selected request
  };

  const handleCreateRegistration = () => {
    navigate("/registration/create");
  };

  const columns = [
    { Header: "employee id", accessor: "employee id", align: "left" },
    { Header: "last name", accessor: "last name", align: "left" },
    { Header: "first name", accessor: "first name", align: "left" },
    { Header: "position", accessor: "position", align: "left" },
    { Header: "department", accessor: "department", align: "left" },
    { Header: "role", accessor: "role", align: "left" },
    {
      Header: "Actions",
      accessor: "view", // New column for the action button
      Cell: ({ row }) => (
        <IconButton onClick={() => handleRowClick(row.original)}>
          <Visibility /> {/* Use the Visibility icon */}
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
                bgColor="success" // Change to "success" for green gradient
                borderRadius="lg"
                coloredShadow="success" // Change to "success" for green shadow
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Registration List
                </MDTypography>
                <Button
                  variant="contained"
                  style={{ color: "white", backgroundColor: "#4caf50" }} // Set font color to white and green background
                  startIcon={<AddIcon />}
                  onClick={handleCreateRegistration}
                >
                  Create Registration
                </Button>
              </MDBox>

              <MDBox p={3}>
                {isLoading ? (
                  <MDTypography variant="subtitle1">Loading...</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: employees }}
                    showTotalEntries={false}
                    isSorted={false}
                    noEndBorder
                    entriesPerPage={false}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

// PropTypes validation for the row prop
RegistrationList.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.object.isRequired,
  }),
};

export default RegistrationList;
