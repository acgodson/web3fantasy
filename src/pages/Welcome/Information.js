import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "utils/MKBox";
import RotatingCard from "components/Cards/RotatingCard";
import RotatingCardFront from "components/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "components/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "components/Cards/InfoCards/DefaultInfoCard";
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={3} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                color="success"
                icon="touch_app"
                title={
                  <>
                    Create a
                    <br />
                    Manager&apos;s Profile
                  </>
                }
                description="Play Web3 Fantasy by creating and managing a football squad for each gameweek on your Lukso Universal Profile"
              />
              <RotatingCardBack
                image={bgBack}
                title="Top the Scoreboard"
                color="success"
                description="Accumulate as much points as possible from performance of each player and see where your squad ranks against other managers"
                action={{
                  type: "internal",
                  route: "/sections/page-sections/page-headers",
                  label: "LETS PLAY",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="people"
                  title="Pick a Squad"
                  description="Select a Squad of only 11 premier league players
                  to represent your profile for each gameweek event"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="login"
                  title="Create or Join Leagues"
                  description="Play, or even stake tokens against Family and Friends, Colleagues, or Web3 fantasy community"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="chat"
                  title="Community Chat"
                  description="Chat, Share and Discuss your excitement about football with fellow players. (Powered by IPFS PubSub)"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
