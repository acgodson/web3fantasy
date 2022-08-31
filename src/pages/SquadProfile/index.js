import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GlobalContext } from "Contexts/contexts";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import DefaultModal from "components/Modal/modal";
import SquadBoard from "./dashboard";

function MySquad() {
  //   const navigate = useNavigate();
  //   const account = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  //   const [connected, setConnected] = useState(false);
  //   const [address, setAddress] = useState(null);
  const test = () => alert("Already Connected");
  //   const isBrowserEnabled = () => window !== "undefined" && window.ethereum;
  //   //   useEffect(() => {
  //     if (!isBrowserEnabled()) {
  //       setShow(true);
  //     } else {
  //       const acc = account;
  //       const last5 = acc.substr(-5);
  //       const first4 = acc.slice(0, 4);
  //       const addrs = `${first4}...${last5}`;
  //       setAddress(addrs);
  //       setConnected(true);
  //     }
  //   }, [account]);

  //   useEffect(() => {
  //     if (!account) {
  //       navigate("/");
  //     }
  //   }, [account]);

  return (
    <Box bgcolor="#050914" h="100vh" pb={5}>
      <DefaultNavbar
        brand="Squad Profile"
        connect={test}
        action={{
          type: "external",
          route: "https://web3fpl.web.app",
          label: "Back to Home",
          color: "info",
        }}
        sticky
      />

      <Card
        sx={{
          mx: { xs: 0, lg: 17 },
          pt: { xs: 12, lg: 12 },
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <SquadBoard />
      </Card>

      {show && (
        <DefaultModal
          content={{
            title: "Welcome Godson",
            body: "Now it's time to start Selecting Players that would represent your squad",
          }}
          show={show}
          toggleModal={toggleModal}
        />
      )}
    </Box>
  );
}

export default MySquad;
