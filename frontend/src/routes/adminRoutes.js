import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import Icon from "@mui/material/Icon";
import Registration from "layouts/registration";

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
    type: "collapse",
    name: "Log Out",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default adminRoutes;
