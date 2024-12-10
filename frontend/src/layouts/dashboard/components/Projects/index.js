// @mui material components
import Card from "@mui/material/Card";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Axios instance for API requests
import axiosInstance from "services/axiosInstance";
import React, { useState, useEffect } from "react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/employees");
        setEmployees(
          response.data.map((employee) => ({
            "employee id": employee.employee_id,
            "last name": employee.lastName,
            "first name": employee.firstName,
            position: employee.position || "-",
            department: employee.department?.name || "-",
            "date started": new Date(employee.date_started).toLocaleDateString(),
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

  const columns = [
    { Header: "employee id", accessor: "employee id", align: "left" },
    { Header: "last name", accessor: "last name", align: "left" },
    { Header: "first name", accessor: "first name", align: "center" },
    { Header: "position", accessor: "position", align: "center" },
    { Header: "department", accessor: "department", align: "center" },
    { Header: "date started", accessor: "date started", align: "right" },
  ];

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
        {isLoading ? (
          <MDTypography variant="subtitle1" align="center" color="text">
            Loading...
          </MDTypography>
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
  );
}

export default EmployeeList;
