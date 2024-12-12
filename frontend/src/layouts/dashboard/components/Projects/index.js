import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import axiosInstance from "services/axiosInstance";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null); // Track action-specific loading

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/employees");
        const sortedEmployees = response.data.sort((a, b) => a.lastName.localeCompare(b.lastName));

        setEmployees(
          sortedEmployees.map((employee) => ({
            "employee id": employee.employee_id,
            "last name": employee.lastName,
            "first name": employee.firstName,
            position: employee.position || "-",
            department: employee.department?.name || "-",
            "date started": new Date(employee.date_started).toLocaleDateString(),
            action: (
              <MDBox display="flex" gap={1} justifyContent="center">
                <MDButton
                  variant="text"
                  color="info"
                  onClick={() => handleView(employee.employee_id)}
                >
                  View
                </MDButton>
                <MDButton
                  variant="text"
                  color="warning"
                  onClick={() => handleEdit(employee.employee_id)}
                >
                  Edit
                </MDButton>
              </MDBox>
            ),
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

  const handleView = (id) => {
    console.log(`View employee with ID: ${id}`);
    setLoadingAction(id); // Set loading state for the action
    // Add navigation or modal logic here
    setTimeout(() => setLoadingAction(null), 1500); // Reset loading state (simulate async action)
  };

  const handleEdit = (id) => {
    console.log(`Edit employee with ID: ${id}`);
    setLoadingAction(id); // Set loading state for the action
    // Add navigation or modal logic here
    setTimeout(() => setLoadingAction(null), 1500); // Reset loading state (simulate async action)
  };

  const columns = [
    { Header: "employee id", accessor: "employee id", align: "center" },
    { Header: "last name", accessor: "last name", align: "center" },
    { Header: "first name", accessor: "first name", align: "center" },
    { Header: "position", accessor: "position", align: "center" },
    { Header: "department", accessor: "department", align: "center" },
    { Header: "date started", accessor: "date started", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            LIST OF EMPLOYEES
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
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
        )}
      </MDBox>
    </Card>
  );
}

export default EmployeeList;
