import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { ERC725 } from "@erc725/erc725.js";
import erc725Schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import { IPFS_GATEWAY_BASE_URL, LSP7Address, RPC_URLS } from "constants";
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
import { NamedChunksPlugin } from "webpack";
const mans = [];
function Leagues() {
  const navigate = useNavigate();
  const { account, leagues, setLeagues, LSP7Contract, tokenIdCounter, setTokenIdCounter } =
    useContext(GlobalContext);
  const [fantasyLeague, setFantasyLeagueValues] = useState({
    title: "",
    description: "",
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [onIpfs, setOnIpfs] = useState(false);
  const [leagueOnSC, setLeagueOnSC] = useState(false);
  const [manNames, setManNames] = useState([]);
  const [creatorAttrs, setCreatorAttrs] = useState({ name: "", profilePicture: "" });
  const toggleModal = () => setShowCreateModal(!showCreateModal);
  const toggleProfileModal = () => setShowProfileModal(!showProfileModal);
  const test = () => alert("Already Connected");
  const add = "add";
  const isBrowserEnabled = () => window !== "undefined" && window.ethereum;
  function changeHandler(e) {
    setError("");
    setFantasyLeagueValues({ ...fantasyLeague, [e.target.name]: e.target.value });
  }

  const fetchLSP3Data = async (address) => {
    const provider = new Web3.providers.HttpProvider(RPC_URLS.L16);
    try {
      const config = { ipfsGateway: IPFS_GATEWAY_BASE_URL };
      const profile = new ERC725(erc725Schema, address, provider, config);
      const LSP3Profile = await profile.fetchData("LSP3Profile");
      if (mans) {
        mans.push(LSP3Profile.value.LSP3Profile.name);
        console.log(mans);
        setManNames(mans);
      }

      return LSP3Profile;
    } catch (er) {
      // console.log(er)
      return false;
    }
  };

  async function createLeague(e) {
    if (!isBrowserEnabled()) {
      alert("Browser not enabled. Please connect to a UP Extension");
      return;
    }

    let ipfsResult;
    setLoading(false);

    const ipfs = ipfsNode();
    let cid;
    try {
      console.log("Uploading to ipfs");
      const postJson = JSON.stringify({
        title: fantasyLeague.title,
        description: "Welcome to the Official General League of web3 fanatasy",
        date: new Date().toISOString(),
      });
      ipfsResult = await ipfs.add({ content: postJson, pin: true });

      console.log(ipfsResult);
      cid = ipfsResult.cid.toString();
      console.log(cid);
    } catch (er) {
      console.log(er.message, "er");
      setError("Can't connecr with ipfs. Please try again later.");
    }

    setOnIpfs(true);
    try {
      if (ipfsResult) {
        const tx = await LSP7Contract.methods.createLeague(cid).send({ from: account });

        if (tx.status) {
          console.log(creatorAttrs, "creatorAttrs");
          setLeagues([
            ...leagues,
            {
              title: fantasyLeague.title,
              description: fantasyLeague.title,
              date: new Date().toISOString(),
              creator: account,
              creatorAttrs,
              id: tokenIdCounter + 1,
              managers: [],
            },
          ]);
          setTokenIdCounter((s) => s + 1);
        }
        setShowCreateModal(false);
      }
    } catch (err) {
      if (err.code === 4001) {
        console.log("User rejected transaction");
        setLoading(false);
        return;
      }
      console.log(err, "err");
      setError("Error with transaction");
    }
    setLoading(false);
    setOnIpfs(false);
    setLeagueOnSC(false);
  }

  async function fetchManagers() {
    leagues.map((value) => {
      for (var key in value.managers) {
        var obj = value.managers[key];
        fetchLSP3Data(obj.sender);
      }
    });
  }

  useEffect(() => {
    if (leagues) {
      fetchManagers();
    }
  }, [leagues]);

  // useEffect(() => {
  //   setManNames(mans);
  //   console.log(manNames);
  // });

  // useEffect(() => {
  //   if (!account) {
  //     navigate("/");
  //   }
  // }, [account]);

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
          name="league"
          setLoading={setLoading}
          loading={false}
          error={error}
          onIpfs={onIpfs}
          postOnSC={leagueOnSC}
        />
      )}

      <DefaultNavbar
        brand="Leagues"
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

      {/* This is where you find all the managers under a leagues */}
      <Card
        sx={{
          mx: { xs: 0, lg: 17 },
          pt: { xs: 9, lg: 13 },
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          height: "100%",
          borderRadius: "0",
          overflowY: "hidden",
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
              px={3}
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
              <MKBox
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <MKTypography variant="h5">Managers</MKTypography>
                <MKTypography>Score</MKTypography>
              </MKBox>

              {manNames.length > 0 &&
                manNames.map((item) => (
                  <MKBox sx={{
                    display:"flex",
                    alignItmes: "center",
                    justifyContent: "space-between",

                  }}>
                    <MKTypography variant="h3">{item}</MKTypography>
                    <MKTypography variant="h6">0</MKTypography>
                  </MKBox>
                ))}
            </MKBox>
          </Grid>
        </Grid>
      </Card>

      {/* This shows all the available leagues and members */}
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
            py={1}
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
              justifyContent: "Center",
            }}
          >
            Fantasy Leagues{" "}
            <MKButton
              mr={2}
              onClick={() => {
                setShowCreateModal(true);
              }}
            >
              <Icon>{add} </Icon>
            </MKButton>
          </MKBox>

          {leagues.length > 0 &&
            leagues.map((items) => (
              <MKButton
                key={items.id}
                mt={1}
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
            <>
              <Input
                required
                placeholder="Name of league?"
                type="text"
                value={fantasyLeague.title}
                name="title"
                onChange={changeHandler}
              />
              <br /> <br />
              <MKButton
                onClick={() => {
                  if (fantasyLeague) {
                    createLeague();
                  }
                }}
                mt={3}
                type="submit"
                color="info"
              >
                Create League
              </MKButton>
            </>
          }
          show={showCreateModal}
          toggleModal={toggleModal}
          title="Create League"
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

export default Leagues;
