import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import Icon from "@mui/material/Icon";
import Leave from "layouts/leave";
import ProfileInfo from "layouts/profileInfo";

const routes = [
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
    name: "Profile",
    key: "profileInfo",
    icon: <Icon fontSize="small">account_circle</Icon>,
    route: "/profileInfo",
    component: <ProfileInfo />,
  },
  {
    type: "collapse",
    name: "Leave Request",
    key: "Leave",
    icon: <Icon fontSize="small">edit_note</Icon>,
    route: "/leave",
    component: <Leave />,
  },
  {
    type: "collapse",
    name: "Document Request",
    key: "rtl",
    icon: <Icon fontSize="small">description</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Payslip",
    key: "notifications",
    icon: <Icon fontSize="small">payments</Icon>,
    route: "/notifications",
    component: <Notifications />,
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

export default routes;
