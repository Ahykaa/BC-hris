// @mui material components
import Card from "@mui/material/Card";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

function LeavesRequested() {
  const data = {
    columns: [
      { Header: "Date Request", accessor: "date request", align: "left" },
      { Header: "Request Type", accessor: "request type", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Comments", accessor: "comments", align: "center" },
    ],
    rows: [
      {
        "date request": (
          <MDTypography variant="button" fontWeight="medium">
            2024-12-01
          </MDTypography>
        ),
        "request type": (
          <MDTypography variant="caption" color="text">
            Sick Leave
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Approved
          </MDTypography>
        ),
        comments: (
          <MDTypography variant="caption" color="text">
            Doctor's appointment
          </MDTypography>
        ),
      },
      {
        "date request": (
          <MDTypography variant="button" fontWeight="medium">
            2024-12-05
          </MDTypography>
        ),
        "request type": (
          <MDTypography variant="caption" color="text">
            Vacation Leave
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Pending
          </MDTypography>
        ),
        comments: (
          <MDTypography variant="caption" color="text">
            Family vacation
          </MDTypography>
        ),
      },
      // Additional rows can be added here...
    ],
  };

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Leaves Requested
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns: data.columns, rows: data.rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default LeavesRequested;
