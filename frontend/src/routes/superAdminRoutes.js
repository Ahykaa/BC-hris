import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import Icon from "@mui/material/Icon";
import Request from "layouts/superAdmin/RequestList";
import RequestList from "layouts/superAdmin/RequestList";

const superAdminRoutes = [
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
    name: "Request List",
    key: "request-list",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/request-list",
    component: <RequestList />,
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

export default superAdminRoutes;
