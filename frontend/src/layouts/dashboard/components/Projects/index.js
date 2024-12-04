// @mui material components
import Card from "@mui/material/Card";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

function EmployeeList() {
  const data = {
    columns: [
      { Header: "employee id", accessor: "employee id", align: "left" },
      { Header: "last name", accessor: "last", align: "left" },
      { Header: "first name", accessor: "first name", align: "center" },
      { Header: "position", accessor: "position", align: "center" },
      { Header: "department", accessor: "department", align: "center" },
      { Header: "date started", accessor: "date started", align: "right" },
      { Header: "action", accessor: "action", align: "right" },
    ],
    rows: [
      {
        companies: (
          <MDTypography variant="button" fontWeight="medium">
            Material UI XD Version
          </MDTypography>
        ),
        members: (
          <MDTypography variant="caption" color="text">
            Ryan Tompson, Romina Hadid, Alexander Smith, Jessica Doe
          </MDTypography>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
      },
      {
        companies: (
          <MDTypography variant="button" fontWeight="medium">
            Add Progress Track
          </MDTypography>
        ),
        members: (
          <MDTypography variant="caption" color="text">
            Romina Hadid, Jessica Doe
          </MDTypography>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $3,000
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
            List of Employees
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

export default EmployeeList;
