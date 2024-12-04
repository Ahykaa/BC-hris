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

function Request() {
  const data = {
    columns: [
      { Header: "date request", accessor: "dateRequest", align: "left" },
      { Header: "request type", accessor: "requestType", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "comments", accessor: "comments", align: "center" },
    ],
    rows: [
      {
        dateRequest: (
          <MDTypography variant="caption" color="text">
            2024-12-01
          </MDTypography>
        ),
        requestType: (
          <MDTypography variant="caption" color="text">
            Leave Application
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text">
            Approved
          </MDTypography>
        ),
        comments: (
          <MDTypography variant="caption" color="text">
            Approved by Manager
          </MDTypography>
        ),
      },
      {
        dateRequest: (
          <MDTypography variant="caption" color="text">
            2024-12-02
          </MDTypography>
        ),
        requestType: (
          <MDTypography variant="caption" color="text">
            Overtime Request
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text">
            Pending
          </MDTypography>
        ),
        comments: (
          <MDTypography variant="caption" color="text">
            Awaiting HR approval
          </MDTypography>
        ),
      },
      {
        dateRequest: (
          <MDTypography variant="caption" color="text">
            2024-12-03
          </MDTypography>
        ),
        requestType: (
          <MDTypography variant="caption" color="text">
            Equipment Purchase
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text">
            Denied
          </MDTypography>
        ),
        comments: (
          <MDTypography variant="caption" color="text">
            Insufficient budget
          </MDTypography>
        ),
      },
      // Add additional rows as needed
    ],
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
                  Request List
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <DataTable
                  table={{ columns: data.columns, rows: data.rows }}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                  entriesPerPage={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Request;
