import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import axiosInstance from "services/axiosInstance";
import React, { useState, useEffect } from "react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch positions
    const fetchPositions = async () => {
      try {
        const response = await axiosInstance.get("/positions");
        console.log("Positions fetched:", response.data);
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    // Function to fetch employees
    const fetchEmployees = async (positionsData) => {
      try {
        const response = await axiosInstance.get("/employees");
        const sortedEmployees = response.data.sort((a, b) => a.lastName.localeCompare(b.lastName));

        setEmployees(
          sortedEmployees.map((employee) => ({
            "employee id": employee.employee_id,
            "last name": employee.lastName,
            "first name": employee.firstName,
            position: getPositionTitle(employee.position_id, positionsData), // Pass positions data here
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
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    // Fetch both positions and employees sequentially
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchPositions(); // Fetch positions
        const positionsData = await axiosInstance.get("/positions"); // Ensure positions data is up-to-date
        await fetchEmployees(positionsData.data); // Pass the positions data to employees fetch
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get position title
  const getPositionTitle = (positionId, positionsData) => {
    const position = positionsData.find((pos) => String(pos.id) === String(positionId));
    return position ? position.name : "n/a";
  };

  const handleView = (id) => {
    console.log(`View employee with ID: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit employee with ID: ${id}`);
  };

  const columns = [
    { Header: "employee id", accessor: "employee id", align: "center" },
    { Header: "last name", accessor: "last name", align: "center" },
    { Header: "first name", accessor: "first name", align: "center" },
    { Header: "department", accessor: "department", align: "center" },
    { Header: "position", accessor: "position", align: "center" },
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
