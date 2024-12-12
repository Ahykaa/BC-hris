import Dashboard from "layouts/adminCompe";
import SignIn from "layouts/authentication/sign-in";
import EmployeeList from "layouts/adminCompe/adminCompeEmployeeList"; // Import the new Employee List component
import Icon from "@mui/material/Icon";

const adminCompeRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Employee List", // New button for Employee List
    key: "employee-list",
    icon: <Icon fontSize="small">people</Icon>, // Icon representing a list of people
    route: "/employee-list",
    component: <EmployeeList />, // Component to render for Employee List
  },
  {
    type: "collapse",
    name: "Log Out",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default adminCompeRoutes;
