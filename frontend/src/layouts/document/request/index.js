// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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
import React, { useState, useEffect } from "react";

function DocumentRequestList() {
  const [data, setData] = useState({
    columns: [
      { Header: "date request", accessor: "dateRequest", align: "center" },
      { Header: "last name", accessor: "lastName", align: "center" },
      { Header: "first name", accessor: "firstName", align: "center" },
      { Header: "request type", accessor: "requestType", align: "center" },
      { Header: "no. of copies", accessor: "copies", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
    ],
    rows: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentRequests = async () => {
      try {
        const response = await axiosInstance.get("/documents/all");
        const formattedRows = response.data.map((request) => ({
          dateRequest: (
            <MDTypography variant="caption" color="text">
              {new Date(request.dateOfRequest).toLocaleDateString()}
            </MDTypography>
          ),
          requestType: (
            <MDTypography variant="caption" color="text">
              {request.requestedDocuments}
            </MDTypography>
          ),
          firstName: (
            <MDTypography variant="caption" color="text">
              {request.user?.firstName || "N/A"}
            </MDTypography>
          ),
          lastName: (
            <MDTypography variant="caption" color="text">
              {request.user?.lastName || "N/A"}
            </MDTypography>
          ),
          copies: (
            <MDTypography variant="caption" color="text">
              {request.numCopies}
            </MDTypography>
          ),
          status: (
            <MDTypography variant="caption" color="text">
              {request.status || "Pending"}
            </MDTypography>
          ),
        }));

        setData((prevData) => ({ ...prevData, rows: formattedRows }));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching document requests:", error);
        setIsLoading(false);
      }
    };

    fetchDocumentRequests();
  }, []);

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
                  Document Request List
                </MDTypography>
              </MDBox>

              <MDBox p={3}>
                {isLoading ? (
                  <MDTypography variant="subtitle1" align="center" color="text">
                    Loading...
                  </MDTypography>
                ) : (
                  <DataTable
                    table={data}
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

export default DocumentRequestList;
