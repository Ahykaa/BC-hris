import React, { useState, useEffect } from "react";
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

// Disable PropTypes ESLint rule for this file
/* eslint react/prop-types: 0 */

// Helper function to format the date to 'YYYY-MM-DD'
const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toISOString().split("T")[0]; // Returns only the date part
};

// Helper function to add spaces to nature of leave
const formatLeaveNature = (nature) => {
  return nature.replace(/([a-z])([A-Z])/g, "$1 $2"); // Adds space before uppercase letters
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function AdminLeaveRequests() {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false); // Modal visibility
  const [selectedRequest, setSelectedRequest] = useState(null); // Store selected request data

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get("/admin/requests"); // Fetch all requests for admin
        const leaveRequests = response.data;

        // Process the leave data as needed
        const leaveData = leaveRequests.map((leave) => ({
          created_at: leave.created_at,
          dateRequest: formatDate(leave.created_at),
          natureOfLeave: formatLeaveNature(leave.natureOfLeave),
          reason: capitalizeFirstLetter(leave.reason),
          status: leave.status,
          comments: capitalizeFirstLetter(leave.others || "-"),
          fullDetails: leave,
        }));

        leaveData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setTransactionData(leaveData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedRequest(null); // Clear selected request
  };

  const columns = [
    { Header: "Date Request", accessor: "dateRequest", align: "left" },
    { Header: "Nature of Leave", accessor: "natureOfLeave", align: "left" },
    { Header: "Reason/Purpose", accessor: "reason", align: "center" },
    { Header: "Comments", accessor: "comments", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Leave Requests
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                {isLoading ? (
                  <MDTypography variant="subtitle1">Loading...</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: transactionData }}
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

      {/* Modal for viewing the details */}
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <>
              {/* Common details */}
              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                Date of Application: {selectedRequest.dateRequest}
              </MDTypography>

              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                Status: {selectedRequest.status}
              </MDTypography>

              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                Nature of Leave: {selectedRequest.fullDetails.natureOfLeave}
              </MDTypography>
              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                Reason: {selectedRequest.reason}
              </MDTypography>
              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                Comments: {selectedRequest.comments}
              </MDTypography>
              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                From Date: {selectedRequest.fullDetails.fromDate}
              </MDTypography>
              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                To Date: {selectedRequest.fullDetails.toDate}
              </MDTypography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

export default AdminLeaveRequests;
