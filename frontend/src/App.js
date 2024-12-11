import { useState, useEffect, useMemo, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// BCHRIS React components
import MDBox from "components/MDBox";

// BCHRIS React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// BCHRIS React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// BCHRIS React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// BCHRIS React routes
import axiosInstance from "services/axiosInstance"; // Ensure this is the correct import for axios
import employeeRoutes from "routes/employeeRoutes";
import adminRoutes from "routes/adminRoutes";

// BCHRIS React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { RoleContext } from "context/RoleContext";
import { CircularProgress } from "@mui/material";
import adminCompeRoutes from "routes/adminCompeRoutes";
import superAdminRoutes from "routes/superAdminRoutes";

// Dummy authentication state (replace with your actual auth logic)
const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null; // Replace with your authentication logic
};

// Fetch user role
const fetchUserRole = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data.role; // Assuming the API response contains the user's role
  } catch (error) {
    console.error("Failed to fetch user role:", error);
    return "employee"; // Default role in case of error
  }
};

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [routes, setRoutes] = useState([]); // State for dynamically loaded routes
  const { role } = useContext(RoleContext);

  useEffect(() => {
    if (role === "admin") {
      setRoutes(adminRoutes); // Set admin routes when role is 'admin'
    } else if (role === "employee") {
      setRoutes(employeeRoutes); // Set employee routes when role is 'employee'
    } else if (role === "adminCompre") {
      setRoutes(adminCompeRoutes);
    } else if (role === "superAdmin") {
      setRoutes(superAdminRoutes);
    }
  }, [role]);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Fetch the correct routes based on the role
  useEffect(() => {
    const getRoutesForRole = async () => {
      const role = await fetchUserRole();
      if (role === "admin") {
        setRoutes(adminRoutes); // Set admin routes
      } else if (role === "employee") {
        setRoutes(employeeRoutes); // Set employee routes
      } else if (role === "adminCompre") {
        setRoutes(adminCompeRoutes);
      } else if (role === "superAdmin") {
        setRoutes(superAdminRoutes);
      }
    };
    getRoutesForRole();
  }, []);

  // Dynamically generate routes
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse); // Handle nested routes
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  if (routes.length === 0) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <CircularProgress color="success" /> {/* Show CircularProgress */}
      </div>
    );
  }

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  // If routes are not yet fetched, show a loading screen or empty routes
  if (routes.length === 0) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader
  }

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="BCHRIS"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route
            path="*"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/authentication/sign-in" />
              )
            }
          />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="BCHRIS"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route
          path="*"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/authentication/sign-in" />
            )
          }
        />
      </Routes>
    </ThemeProvider>
  );
}
