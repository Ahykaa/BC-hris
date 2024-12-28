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
import Visibility from "@mui/icons-material/Visibility";

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

const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toISOString().split("T")[0];
};

const formatLeaveNature = (nature) => {
  return nature.replace(/([a-z])([A-Z])/g, "$1 $2");
};

function RequestList() {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get("/superAdmin/requests");
        const { leaves, documents } = response.data;

        // Combine and format data
        const combinedData = [
          ...leaves.map((leave) => ({
            created_at: leave.created_at,
            dateRequest: formatDate(leave.created_at),
            requestType: "Leave",
            details: formatLeaveNature(leave.natureOfLeave),
            reason: leave.reason,
            status: leave.status,
            comments: leave.others || "-",
            fullDetails: leave,
          })),
          ...documents.map((doc) => ({
            created_at: doc.created_at,
            dateRequest: formatDate(doc.dateOfRequest),
            requestType: "Document",
            details: doc.requestedDocuments,
            reason: doc.purpose,
            status: doc.status || "Pending",
            comments: "-",
            fullDetails: doc,
          })),
        ];

        combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setTransactionData(combinedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  const columns = [
    { Header: "Date Request", accessor: "dateRequest", align: "center" },
    { Header: "Request Type", accessor: "requestType", align: "center" },
    { Header: "Details", accessor: "details", align: "center" },
    { Header: "Reason/Purpose", accessor: "reason", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Comments", accessor: "comments", align: "center" },
    {
      Header: "Actions",
      accessor: "view",
      // eslint-disable-next-line react/prop-types
      Cell: ({ row }) => (
        <IconButton onClick={() => handleRowClick(row.original)}>
          <Visibility />
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
                  All Employee Requests
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

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <>
              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                Date of Application: {selectedRequest.dateRequest}
              </MDTypography>

              <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                Status: {selectedRequest.status}
              </MDTypography>

              {selectedRequest.requestType === "Leave" && (
                <>
                  <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                    Nature of Leave: {formatLeaveNature(selectedRequest.fullDetails.natureOfLeave)}
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

              {selectedRequest.requestType === "Document" && (
                <>
                  <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                    Requested Document: {selectedRequest.fullDetails.requestedDocuments}
                  </MDTypography>
                  <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                    Number of Copies: {selectedRequest.fullDetails.numberOfCopies}
                  </MDTypography>
                  <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                    Purpose: {selectedRequest.fullDetails.purpose}
                  </MDTypography>
                  <MDTypography variant="body1" style={{ marginBottom: "10px" }}>
                    Status: {selectedRequest.status}
                  </MDTypography>
                </>
              )}
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

import PropTypes from "prop-types";

// Define PropTypes for the row object
RequestList.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      dateRequest: PropTypes.string.isRequired,
      requestType: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      reason: PropTypes.string,
      status: PropTypes.string.isRequired,
      comments: PropTypes.string,
      fullDetails: PropTypes.object.isRequired,
    }).isRequired,
  }),
};

export default RequestList;
