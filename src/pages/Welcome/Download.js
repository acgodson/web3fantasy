import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";

// Images
import bgImage from "assets/images/shapes/waves-white.svg";

function Download() {
  return (
    <MKBox component="section" py={{ xs: 0, sm: 0 }}>
      <MKBox
        variant="gradient"
        position="relative"
        borderRadius="xl"
        sx={{
          background: "linear-gradient(to bottom right, red , yellow)",
          overflow: "hidden",
        }}
      >
        <MKBox
          component="img"
          src={bgImage}
          alt="pattern-lines"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          zIndex={1}
          opacity={0.2}
        />
        <Container
          sx={{
            position: "relative",
            zIndex: 2,
            py: 6,
          }}
        >
          <Grid container item xs={12} justifyContent="center" mx="auto" textAlign="center">
            <MKTypography variant="h3" color="white">
              Enjoy Fantasy Premier League on the Web3
            </MKTypography>
            <MKTypography variant="body2" color="white" mb={6} mt={1}>
              With Over 9 million players, FPL is the biggest Fantasy Football Game in the World .
              Now you can Join Friends to Play, and Discuss Web3 Fantasy by creating a
              manager&apos;s profile (On Lukso&apos;s Universal Profile )
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default Download;
