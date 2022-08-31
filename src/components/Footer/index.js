import React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

function DefaultFooter({ content }) {
  const { copyright } = content;

  return (
    <Box component="footer">
      <Container>
        <Grid item xs={12} sx={{ textAlign: "center", my: 3 }}>
          {copyright}
        </Grid>
      </Container>
    </Box>
  );
}

// Typechecking props for the DefaultFooter
DefaultFooter.propTypes = {
  content: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])).isRequired,
};

export default DefaultFooter;
