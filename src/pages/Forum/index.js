import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { Box, Grid, Input, TextareaAutosize } from "@mui/material";
import Icon from "@mui/material/Icon";
import { GlobalContext } from "Contexts/contexts";
import ipfsNode from "utils/ipfs-node.js";
import MKBox from "utils/MKBox";
import MKButton from "utils/MKButton";
import MKTypography from "utils/MKTypography";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import NodeModal from "components/Modal/nodeModal";
import Loader from "components/Loader";
import ChatBox from "./chat";

function Forum() {
  const { account, leagues, setLeagues, LSP7Contract, tokenIdCounter, setTokenIdCounter } =
    useContext(GlobalContext);
  const messages = [];
  const navigate = useNavigate();
  const [fantasyRoom, setFantasyRoomValues] = useState({
    title: "",
    description: "",
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [onIpfs, setOnIpfs] = useState(false);
  const [creatorAttrs, setCreatorAttrs] = useState({ name: "", profilePicture: "" });
  const toggleModal = () => setShowCreateModal(!showCreateModal);
  const toggleProfileModal = () => setShowProfileModal(!showProfileModal);
  const test = () => alert("Already Connected");
  const touch = "send";
  const add = "add";
  const isBrowserEnabled = () => window !== "undefined" && window.ethereum;
  function changeHandler(e) {
    setError("");
    setFantasyRoomValues({ ...fantasyRoom, [e.target.name]: e.target.value });
  }

  async function createRoom(e) {
    e.preventDefault();
    if (!isBrowserEnabled()) {
      alert("Browser not enabled. Please connect to a UP Extension");
      return;
    }
    alert("coming soon");
  }

  useEffect(() => {
    if (!account) {
      navigate("/");
    }
  }, [account]);

  return (
    <Box
      bgcolor="#050914"
      pb={0}
      sx={{
        height: "100vh",
      }}
    >
      {loading && (
        <Loader
          name="room"
          setLoading={setLoading}
          loading={false}
          error={error}
          onIpfs={onIpfs}
          postOnSC={roomOnSC}
        />
      )}

      <DefaultNavbar
        brand="Forum"
        connect={test}
        action={{
          type: "external",
          route: "https://web3fl.web.app",
          label: "Back to Home",
          color: "info",
        }}
        sticky
      />
      {error ? <MKBox bgColor="warning">{error}</MKBox> : <MKBox />}

      {/* This  is a fixed bottom Nav to post new messages */}
      <MKBox
        pr={{ xs: 0, lg: 13 }}
        display="flex"
        justifyContent={{ xs: "center", md: "center", lg: "flex-end" }}
        sx={{
          alignSelf: "center",
          alignCenter: "center",
          width: "100%",
          backgroundColor: "transparent",
          position: "fixed",
          bottom: 0,
          zIndex: 22,
        }}
      >
        <TextareaAutosize
          aria-label="message"
          placeholder="Message"
          type="text"
          style={{
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            width: "100%",
            maxWidth: "600px",
            minHeight: "8vh",
            maxHeight: "13vh",
            marginBottom: "3.5vh",
            borderRadius: "12px",
            border: "none",
            textAlign: "left",
            paddingLeft: "15px",
            paddingRight: "100px",
            paddingTop: "16px",
            fontSize: "18px",
          }}
        />

        <MKButton
          color="success"
          sx={{
            height: "50px",
            width: "auto",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
            position: "relative",
            right: "80px",
            marginTop: "7px",
          }}
        >
          <Icon
            style={{
              fontSize: "30px",
              color: "white",
            }}
          >
            {touch}
          </Icon>
        </MKButton>
      </MKBox>

      {/* This is where you find all the messages under a room */}
      <Card
        sx={{
          mx: { xs: 0, lg: 17 },
          pt: { xs: 12, lg: 12 },
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          height: "100%",
          borderRadius: "0",
          overflowY: "auto",
          overFlowX: "hidden",
        }}
      >
        <Grid container direction="row" spacing={2}>
          <Grid
            item
            xs
            sx={{
              position: "relative",
              overFlowY: "hidden",
            }}
          >
            <MKBox
              height={200}
              sx={{
                backgroundColor: "red",
                position: "absolute",
              }}
            >
              1
            </MKBox>
          </Grid>

          <Grid item xs ml={-28}>
            <MKBox
              pb={1}
              pt={16}
              sx={{
                minHeight: "100vh",
                marginTop: "-20px",
                position: "relative",
                backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                  rgba(white.main, 0.5),
                boxShadow: ({ boxShadows: { xxl } }) => xxl,
                zIndex: 10,
              }}
            >
              {messages.map((items) => (
                <ChatBox
                  key={items.id}
                  author={items.id === 1 ? "true" : "false"}
                  date={items.date}
                  name={items.name}
                  message={items.message}
                />
              ))}
            </MKBox>
          </Grid>
        </Grid>
      </Card>

      {/* This shows all the available rooms and members */}
      <Grid
        container
        direction="row"
        sx={{
          position: "fixed",
          top: 0,
          mx: { xs: 0, lg: 17 },
          pt: { xs: 9, lg: 9 },
          overflowY: "hidden",
          width: "31.5%",
          backgroundColor: "green",
        }}
      >
        <Grid
          item
          xs
          sx={{
            position: "relative",
            overFlowY: "hidden",
            height: "100vh",
            alignItems: "end",

            top: 0,
          }}
        >
          <MKBox
            py={2}
            px={1.5}
            display="flex"
            sx={{
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
              fontSize: "16px",
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
              justifyContent: "space-between"
            }}

          >
            Fantasy League Fanzone Rooms{" "}
            <MKButton onClick={() => setShowCreateModal(true)}>
              <Icon>{add}</Icon>
            </MKButton>
          </MKBox>

          {leagues.map((items) => (
            <MKButton
              key={items.id}

              px={1}
              py={2}
              sx={{
                backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                  rgba(white.main, 0.6),
                backdropFilter: "saturate(200%) blur(30px)",
                boxShadow: ({ boxShadows: { xxl } }) => xxl,
                borderRadius: "8px",
                borderLeft: "2px solid grey",
                borderBottom: "2px solid grey",
                borderTop: "none",
                width: "100%",
              }}
            >
              <MKTypography
                color="white"
                sx={{
                  color: "white",
                  fontSize: { sm: "12px", lg: "18px" },
                }}
              >
                {items.title}
              </MKTypography>
            </MKButton>
          ))}
        </Grid>
      </Grid>

      {showCreateModal && (
        <NodeModal
          body={
            <form onSubmit={(e) => createRoom(e)}>
              <Input
                required
                placeholder="What do you want to call your room?"
                type="text"
                value={fantasyRoom.title}
                name="title"
                onChange={changeHandler}
              />
              <br /> <br />
              {/* <Input
                placeholder="Description"
                type="text"
                style={{
                  backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                    rgba(white.main, 0.8),
                  backdropFilter: "saturate(200%) blur(30px)",
                  width: "100%",
                  minHeight: "8vh",
                  border: "none",
                  textAlign: "left",
                  paddingLeft: "15px",
                  paddingTop: "12px",
                  fontSize: "14px",
                }}
                onChange={changeHandler}
                value={fantasyRoom.description}
              /> */}
              <MKButton mt={3} type="submit" color="info">
                Create Room
              </MKButton>
            </form>
          }
          show={showCreateModal}
          toggleModal={toggleModal}
          title="Create Room"
          footer={<MKBox />}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          show={showProfileModal}
          toggleModal={toggleProfileModal}
          setCreatorAttrs={setCreatorAttrs}
        />
      )}
    </Box>
  );
}

export default Forum;
