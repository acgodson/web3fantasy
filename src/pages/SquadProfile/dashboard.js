import { useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";

import { GlobalContext } from "Contexts/contexts";
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import NodeModal from "components/Modal/nodeModal";
import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";
import ipfsNode from "utils/ipfs-node";
import MKButton from "utils/MKButton";
import SquadAvatar from "./squad";

function SquadBoard() {
  const {
    fetchedPlayers,
    account,
    setManagerIdCounter,
    LSP7Contract,
    managerIdCounter,
    tokenIdCounter,
    setTokenIdCounter,
  } = useContext(GlobalContext);
  const player = ["G1", "D1", "D2", "D3", "D4", "M1", "M2", "M3", "M4", "M5", "F1"];
  const [showSearchModal, setshowSearchModal] = useState(false);
  const [currentPosition, setcCurrentPosition] = useState("M1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [onIpfs, setOnIpfs] = useState(false);
  // const [budget, setBudget] = useState(100);
  const titlePosition = (() => {
    if (currentPosition.slice(0, 1) === "M") return "Midfielder";
    if (currentPosition.slice(0, 1) === "D") return "Defender";
    if (currentPosition.slice(0, 1) === "G") return "GoalKeeper";
    return "Forward";
  })();
  const [selectPlayers, setSelectPlayers] = useState();
  const [allowEditing, setAllowEditing] = useState(true);

  // const [showViewModal, setshowViewModal] = useState(second)
  const toggleSearchModal = () => setshowSearchModal(!showSearchModal);
  const [mySquad, setMySquad] = useState({
    G1: "",
    D1: "",
    D2: "",
    D3: "",
    D4: "",
    M1: "",
    M2: "",
    M3: "",
    M4: "",
    M5: "",
    F1: "",
  });

  function fetchPlayers() {
    const position = (() => {
      if (currentPosition.slice(0, 1) === "M") return 3;
      if (currentPosition.slice(0, 1) === "D") return 2;
      if (currentPosition.slice(0, 1) === "G") return 1;
      return 4;
    })();
    const players = fetchedPlayers.Players.filter((value, index) => value.element_type == position);
    setSelectPlayers(players);
  }

  useEffect(() => {
    if (currentPosition !== null) {
      fetchPlayers();
    }
  }, [currentPosition]);

  const submitTeam = async () => {
    const leagueId = 4;
    if (account) {
      let cid;
      try {
        const ipfs = ipfsNode();
        const postJson = JSON.stringify(mySquad);
        const ipfsResult = await ipfs.add({ content: postJson, pin: true });
        cid = ipfsResult.cid.toString();
        console.log(cid);
        setOnIpfs(true);
      } catch (error) {
        console.log(error);
        setError("We are having trouble with ipfs. Please try again later.");
      }

      try {
        if (cid) {
          const tx = await LSP7Contract.methods.joinLeague(leagueId, cid).send({ from: account });

          if (tx.status) {
            alert("Squad registered successfully");
            setManagerIdCounter(managerIdCounter + 1);
          }
        }
      } catch (err) {
        console.log(err);
        setError("Error with transaction");
        setLoading(false);
      }
    }
    setLoading(false);
    setOnIpfs(false);
  };

  return (
    <MKBox component="section" py={0} my={0}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="flex-start" sx={{ mx: "auto" }}>
          <Grid item mx={0} xs={12} lg={4} sx={{ mx: "auto" }}>
            {/* Squad Pitch OverView */}
            <MKBox
              display="flex"
              bgColor="success"
              mx={0}
              sx={{
                flexDirection: "column",
                width: "100%",
              }}
              alignItems="center"
            >
              <SquadAvatar
                code={player[0]}
                points={0}
                title={mySquad.G1}
                action={() => {
                  setshowSearchModal(true);
                  setcCurrentPosition(player[0]);
                }}
              />

              <Grid
                container
                item
                alignItems="center"
                justifyContent="center"
                sx={{
                  mx: "auto",
                }}
              >
                <SquadAvatar
                  code={player[1]}
                  points={0}
                  title={mySquad.D1}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[1]);
                  }}
                />
                <SquadAvatar
                  code={player[2]}
                  points={0}
                  title={mySquad.D2}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[2]);
                  }}
                />
                <SquadAvatar
                  code={player[3]}
                  points={0}
                  title={mySquad.D3}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[3]);
                  }}
                />
                <SquadAvatar
                  code={player[4]}
                  points={0}
                  title={mySquad.D4}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[4]);
                  }}
                />
              </Grid>
              <Grid
                container
                item
                alignItems="center"
                justifyContent="center"
                sx={{
                  mx: "auto",
                }}
              >
                <SquadAvatar
                  code={player[5]}
                  points={0}
                  title={mySquad.M1}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[5]);
                  }}
                />
                <SquadAvatar
                  code={player[6]}
                  points={0}
                  title={mySquad.M2}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[6]);
                  }}
                />
                <SquadAvatar
                  code={player[7]}
                  points={0}
                  title={mySquad.M3}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[7]);
                  }}
                />
                <SquadAvatar
                  code={player[8]}
                  points={0}
                  title={mySquad.M4}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[8]);
                  }}
                />
                <SquadAvatar
                  code={player[9]}
                  points={0}
                  title={mySquad.M5}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[9]);
                  }}
                />
              </Grid>
              <Grid
                container
                item
                alignItems="center"
                justifyContent="center"
                sx={{
                  mx: "auto",
                }}
              >
                <SquadAvatar
                  code={player[10]}
                  points={0}
                  title={mySquad.F1}
                  action={() => {
                    setshowSearchModal(true);
                    setcCurrentPosition(player[10]);
                  }}
                />
              </Grid>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            {/* <MKBox>
              <MKTypography
                component="h3"
                sx={{
                  fontWeight: "bold",
                }}
              >
                &#128;100M
              </MKTypography>
            </MKBox> */}
            <MKBox>
              <br />
              Next GameWeek Event
              <MKTypography
                component="h3"
                sx={{
                  fontWeight: "bold",
                }}
              >
                5
              </MKTypography>
            </MKBox>
            <MKButton color="success" onClick={() => submitTeam()}>
              Deploy Team
            </MKButton>
            <MKButton color="info" disabled={allowEditing}>
              Delete Team
            </MKButton>
          </Grid>
        </Grid>
      </Container>
      {showSearchModal && (
        <NodeModal
          title={`Replace ${titlePosition}`}
          body={
            <MKBox
              sx={{
                backgroundColor: "whiteSmoke",
              }}
            >
              {selectPlayers.map((player) => (
                <MKBox
                  my={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <MKTypography>{`${player.first_name}  ${player.second_name}`}</MKTypography>
                  {/* <MKTypography>{player.team}</MKTypography> */}
                  <MKButton
                    color="info"
                    onClick={() => {
                      setMySquad({ ...mySquad, [currentPosition]: player.web_name });
                      setshowSearchModal(false);
                    }}
                  >
                    Select
                  </MKButton>
                </MKBox>
              ))}
            </MKBox>
          }
          show={showSearchModal}
          toggleModal={toggleSearchModal}
          footer={
            <MKTypography
              component="p"
              sx={{
                fontSize: "12px",
              }}
            >
              Fetched from Official FPL API
            </MKTypography>
          }
        />
      )}
    </MKBox>
  );
}

// Dashboard.defaultProps = {
// };

// Dashboard.propTypes = {
// };

export default SquadBoard;
