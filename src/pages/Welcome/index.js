import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "Contexts/contexts";
import footerRoutes from "footer.routes";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import bgImage from "assets/images/bg-presentation.jpg";
import playerImage from "assets/images/players.png";
import { Box } from "@mui/material";
import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import DefaultFooter from "components/Footer";
import DefaultModal from "components/Modal/modal";
import Information from "./Information";
import Download from "./Download";
import Dashboard from "./dashboard";

function Welcome() {
  const { setAccount, account } = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const test = () => alert("Already Connected");
  const isBrowserEnabled = () => window !== "undefined" && window.ethereum;
  useEffect(() => {
    if (!isBrowserEnabled()) {
      setShow(true);
    } else {
      if (account) {
        const acc = account;
        const last5 = acc.substr(-5);
        const first4 = acc.slice(0, 4);
        const addrs = `${first4}...${last5}`;
        setAddress(addrs);
        setConnected(true);
      }
    }
  }, [account]);

  async function loginExtension() {
    if (!window.ethereum) {
      alert("Please connect to Universal Profile Extension");
      return;
    }

    try {
      // request access to the extension
      await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          // check if any number of accounts was returned
          // IF go to the dashboard
          if (accounts.length) {
            setAccount(accounts[0]);
          } else {
            console.log("User denied access");
          }
        });
    } catch (error) {
      if (error.message === "User denied access") {
        console.log("User denied access");
      } else {
        console.log(error);
      }
    }
  }

  return (
    <Box bgcolor="#050914">
      <DefaultNavbar
        brand={connected ? address : "Web3 Fantasy"}
        connect={connected ? test : loginExtension}
        action={{
          type: "external",
          route: "https://web3fl.web.app",
          label: connected ? "LOG OUT" : "CONNECT",
          color: connected ? "warning" : "info",
        }}
        sticky
      />

      <MKBox
        minHeight={connected ? "25vh" : "55vh"}
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        {!connected && (
          <Container>
            <Grid
              container
              item
              xs={12}
              lg={7}
              justifyContent={["center ", "left"]}
              mx="auto"
              alignItems={["left ", "left"]}
            >
              <MKTypography
                variant="h1"
                color="white"
                mt={-8}
                mb={1}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["5xl"],
                  },
                })}
              >
                Web3 Fantasy{" "}
              </MKTypography>

              {/* <MKTypography
              variant="h3"
              color="white"
              sx={{
                textAlign: "left",
              }}
            >
            
            </MKTypography> */}

              <Box
                mt={[0, -6]}
                component="img"
                sx={{
                  height: "300px",
                  width: "auto",
                  position: "absolute",
                  right: 0,
                }}
                src={playerImage}
                alt="players"
              />
            </Grid>
          </Container>
        )}
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {!connected && <Download />}
        {!connected && <Information />}
        {connected && <Dashboard connected={connected} />}
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
      {show && (
        <DefaultModal
          content={{
            title: "Copyright Notice",
            body: "All Data for players are obtained freely from the Official Premier League Fantasy API. We do not own or reserve any right for players and player-information gotten from the Fantasy API",
          }}
          show={show}
          toggleModal={toggleModal}
        />
      )}
    </Box>
  );
}

export default Welcome;
