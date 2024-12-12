// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// BCHRIS React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// BCHRIS React base styles
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <MDBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <MDTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </MDTypography>
        </Link>
      </MDBox>
    ));

  return (
    <MDBox
      width="100%"
      position="fixed"
      bottom={0}
      left={0}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
      bgcolor="background.default"
    >
      {/* Year section */}
      <MDBox display="flex" alignItems="center" color="text" fontSize={size.sm} ml="20%">
        &copy; {new Date().getFullYear()} - 4th Year
      </MDBox>

      {/* Brokenshire College section */}
      <MDBox display="flex" alignItems="center" color="text" fontSize={size.sm} mr="5%">
        {name}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "#", name: "Brokenshire College, INC" },
  links: [{ href: "#", name: "Brokenshire College, INC" }],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
