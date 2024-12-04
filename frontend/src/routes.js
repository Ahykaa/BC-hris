import employeeRoutes from "routes/employeeRoutes";
import adminRoutes from "routes/adminRoutes";
import axiosInstance from "services/axiosInstance";

// Default export with fallback to employeeRoutes
let cachedRoutes = employeeRoutes;

const fetchUserRole = async () => {
  try {
    const response = await axiosInstance.get("/user");
    const role = response.data.role;

    // Update cachedRoutes dynamically based on the role
    if (role === "admin") {
      cachedRoutes = adminRoutes;
    } else if (role === "employee") {
      cachedRoutes = employeeRoutes;
    }
  } catch (error) {
    console.error("Failed to fetch user role. Defaulting to employee routes:", error);
  }
};

fetchUserRole(); // Call it immediately to update cachedRoutes in the background

export default cachedRoutes;
