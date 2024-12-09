import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Grid from "@mui/material/Grid";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

function FamilyBackground({ data, onChange }) {
  return (
    <>
      <MDTypography variant="h6" fontWeight="medium">
        FAMILY BACKGROUND
      </MDTypography>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Father's Name"
            fullWidth
            value={data.fatherName}
            onChange={(e) => onChange("fatherName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Mother's Name"
            fullWidth
            value={data.motherName}
            onChange={(e) => onChange("motherName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Spouse's Name"
            fullWidth
            value={data.spouseName}
            onChange={(e) => onChange("spouseName", e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
}

// Add prop-types for validation
FamilyBackground.propTypes = {
  data: PropTypes.shape({
    fatherName: PropTypes.string,
    motherName: PropTypes.string,
    spouseName: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FamilyBackground;
