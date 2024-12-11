import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import Icon from "@mui/material/Icon";
import Registration from "layouts/registration";
import Request from "layouts/document/request";
// import { LeakRemove } from "@mui/icons-material";
import Leave from "layouts/leave/request";

const adminRoutes = [
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
    name: "Registration",
    key: "registration",
    icon: <Icon fontSize="small">payments</Icon>,
    route: "/registration",
    component: <Registration />,
  },
  {
    name: "Leave Request",
    key: "documentRequest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/leave",
    component: <Leave />,
  },
  {
    type: "collapse",
    name: "Document Request",
    key: "documentRequest",
    icon: <Icon fontSize="small">article</Icon>,
    route: "/document/request",
    component: <Request />,
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

export default adminRoutes;
