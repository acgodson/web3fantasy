import React, { useContext } from "react";
import { GlobalContext } from "Contexts/contexts";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import { Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";
import RotatingCard from "components/Cards/RotatingCard";
import RotatingCardFront from "components/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "components/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "components/Cards/InfoCards/DefaultInfoCard";
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";
import logo from "assets/images/logo.png";

function Dashboard({ connected }) {
  const { profileName } = useContext(GlobalContext);
  const navigate = useNavigate();

  function NavigateTo(path) {
    navigate(path);
  }

  return (
    <MKBox component="section" py={0} my={0}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="flex-start" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                color="success"
                icon="user"
                title={
                  <MKBox
                    display="flex"
                    color="white"
                    h="100%"
                    sx={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    Gameweek 5
                    <Avatar
                      mt={4}
                      mb={1}
                      sx={{
                        height: "80px",
                      }}
                      src={logo}
                      alt="players"
                    />
                    <MKBox
                      color="white"
                      px={3}
                      sx={{
                        textAlign: "center",
                        fontSize: "18px",
                        background: "gray",
                        borderRadius: "12px",
                      }}
                    >
                      {profileName}
                    </MKBox>
                    <Grid mt={4} container item>
                      <MKTypography
                        variant="h6"
                        color="white"
                        mr={1}
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        0
                        <br />
                        <Box
                          component="span"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          Average Points
                        </Box>
                      </MKTypography>
                      <MKTypography
                        variant="h6"
                        color="white"
                        mr={1}
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        0
                        <br />
                        Score
                      </MKTypography>
                      <MKTypography
                        variant="h6"
                        color="white"
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        0
                        <br />
                        <Box
                          component="span"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          Highest Points
                        </Box>
                      </MKTypography>
                    </Grid>
                  </MKBox>
                }
                description="Finished"
              />
              <RotatingCardBack
                image={bgBack}
                title="Top the Scoreboard"
                color="success"
                description=""
                action={{
                  type: "internal",
                  route: "/squad",
                  label: "LETS PLAY",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  connected={connected}
                  button="SQUAD"
                  action={() => NavigateTo("squad")}
                  icon="people"
                  title="Pick a Squad"
                  description="Select a Squad of only 11 premier league players
                  to represent your profile each gameweek event"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  connected={connected}
                  action={() => NavigateTo("leagues")}
                  button="LEAGUE"
                  icon="login"
                  title="Join Leagues"
                  description="Play, or even stake tokens against Family and Friends, Colleagues, or Web3 fantasy community"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  connected={connected}
                  button="Forum"
                  action={() => NavigateTo("fanzone")}
                  icon="chat"
                  title="Community Chats"
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

Dashboard.defaultProps = {
  connected: false,
};

Dashboard.propTypes = {
  connected: PropTypes.bool,
};

export default Dashboard;
