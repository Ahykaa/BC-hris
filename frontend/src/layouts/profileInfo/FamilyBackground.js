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
            value={data.father_name}
            onChange={(e) => onChange("father_name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Father's Occupation"
            fullWidth
            value={data.father_occupation}
            onChange={(e) => onChange("father_occupation", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MDInput
            label="Father's Contact Number"
            fullWidth
            value={data.father_contact_number}
            onChange={(e) => onChange("father_contact_number", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Father's Birthday"
            type="date" // Ensures it's a date picker
            InputLabelProps={{ shrink: true }} // Keeps the label in the correct position
            fullWidth
            value={data.father_date_of_birth || ""} // Ensure the value is a string
            onChange={(e) => onChange("father_date_of_birth", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MDInput
            label="Mother's Name"
            fullWidth
            value={data.mother_name}
            onChange={(e) => onChange("mother_name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Mother's Occupation"
            fullWidth
            value={data.mother_occupation}
            onChange={(e) => onChange("mother_occupation", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Mother's Contact Number"
            fullWidth
            value={data.mother_contact_number}
            onChange={(e) => onChange("mother_contact_number", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Mother's Birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={data.mother_date_of_birth}
            onChange={(e) => onChange("mother_date_of_birth", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MDInput
            label="Spouse's Name"
            fullWidth
            value={data.spouse_name}
            onChange={(e) => onChange("spouseName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Spouse's Occupation"
            fullWidth
            value={data.spouse_occupation}
            onChange={(e) => onChange("spouse_occupation", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Spouse's Contact Number"
            fullWidth
            value={data.spouse_contact_number}
            onChange={(e) => onChange("spouse_contact_number", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Spouse's Birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={data.spouse_date_of_birth}
            onChange={(e) => onChange("spouse_date_of_birth", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Emergency Contact Name"
            fullWidth
            value={data.emergency_contact_name}
            onChange={(e) => onChange("emergency_contact_name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Emergency Contact Address"
            fullWidth
            value={data.emergency_contact_address}
            onChange={(e) => onChange("emergency_contact_address", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Emergency Contact Number"
            fullWidth
            value={data.emergency_contact_number}
            onChange={(e) => onChange("emergency_contact_number", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MDInput
            label="Emergency Contact Relationship"
            fullWidth
            value={data.emergency_contact_relationship}
            onChange={(e) => onChange("emergency_contact_relationship", e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
}

// Add prop-types for validation
FamilyBackground.propTypes = {
  data: PropTypes.shape({
    personal_info_id: null,
    father_name: PropTypes.string,
    father_occupation: PropTypes.string, // Added missing prop
    father_contact_number: PropTypes.string, // Added missing prop
    father_date_of_birth: PropTypes.string, // Added missing prop

    mother_name: PropTypes.string,
    mother_occupation: PropTypes.string, // Added missing prop
    mother_contact_number: PropTypes.string, // Added missing prop
    mother_date_of_birth: PropTypes.string, // Added missing prop

    spouse_name: PropTypes.string,
    spouse_occupation: PropTypes.string, // Added missing prop
    spouse_contact_number: PropTypes.string, // Added missing prop
    spouse_date_of_birth: PropTypes.string, // Added missing prop

    emergency_contact_name: PropTypes.string,
    emergency_contact_address: PropTypes.string,
    emergency_contact_number: PropTypes.string,
    emergency_contact_relationship: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FamilyBackground;
