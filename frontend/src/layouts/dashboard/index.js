// @mui material components
import Grid from "@mui/material/Grid";

// BCHRIS React components
import MDBox from "components/MDBox";

// BCHRIS React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={2.8}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="leaderboard"
                title="Employees"
                count="231"
                percentage={{
                  label: "Total Employees of the Month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="people"
                title="Teaching Staff"
                count="92"
                percentage={{
                  color: "success",
                  label: "Total Teaching Staff of the Month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3.3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="group_off"
                title="Non-Teaching Staff"
                count="65"
                percentage={{
                  label: "Total Non-Teaching Staff of the Month",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
