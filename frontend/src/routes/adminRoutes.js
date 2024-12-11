import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import Icon from "@mui/material/Icon";
import RegistrationList from "layouts/registration";
import Registration from "layouts/registration/create"; // Ensure the create route exists

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
    name: "Registration", // Only the RegistrationList will be shown in the sidebar
    key: "registration",
    icon: <Icon fontSize="small">payments</Icon>,
    route: "/registration", // Shows the list of registrations
    component: <RegistrationList />,
  },
  {
    type: "collapse-hide",
    name: "Create Registration", // Hidden from sidebar, will still work when accessed directly
    key: "create-registration",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/registration/create", // This route should still work
    component: <Registration />, // Registration component will be loaded here
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
