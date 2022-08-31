import React, { createContext, useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Web3 from "web3";
import { ERC725 } from "@erc725/erc725.js";
import erc725Schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import LSP7Artifact from "../utils/Fantasy.json";
import { IPFS_GATEWAY_BASE_URL, LSP7Address, RPC_URLS } from "../constants";
import {
  checkBrowserCompatibility,
  checkMinimalBalance,
  isEOA,
  isL16,
} from "../utils/connect-extension";
import getProfileUrl from "../utils/get-profile-url";

export const GlobalContext = createContext();

// const gun = Gun({
//   peers: ["https://localhost:4040/gun"],
// });

const currentState = {
  messages: [],
};

const reducer = (state, message) => {
  return {
    messages: [message, ...state.messages],
  };
};

const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();

  const [leagues, setLeagues] = useState([]);
  const [account, setAccount] = useState("");
  const [LSP7Contract, setLSP7Contract] = useState();
  const [tokenIdCounter, setTokenIdCounter] = useState();
  const [managerIdCounter, setManagerIdCounter] = useState();
  const [adminAddress, setAdminAddress] = useState();
  const [networkId, setNetworkId] = useState();
  const [fetchedPlayers, setFetchedPlayers] = useState();
  const [messageText, setMessageText] = useState("");
  const [state, dispatch] = useReducer(reducer, currentState);

  const [providerError, setProviderError] = useState(false);
  const [isEOAError, setIsEOAError] = useState(false);
  const [browserError, setBrowserError] = useState(false);
  const [chainError, setChainError] = useState(false);
  const [lowBalanceError, setLowBalanceError] = useState(false);
  const [profileName, setProfileName] = useState();

  async function cidFetcher(cid) {
    try {
      const res = await fetch(`${IPFS_GATEWAY_BASE_URL}/${cid}`);
      const cidObj = await res.json();
      return cidObj;
    } catch (er) {
      console.log(er);
    }
    return null;
  }

  const fetchLSP3Data = async (address) => {
    const provider = new Web3.providers.HttpProvider(RPC_URLS.L16);
    try {
      const config = { ipfsGateway: IPFS_GATEWAY_BASE_URL };
      const profile = new ERC725(erc725Schema, address, provider, config);
      const LSP3Profile = await profile.fetchData("LSP3Profile");
      return LSP3Profile;
    } catch (er) {
      // console.log(er)
      return false;
    }
  };

  const fetchProfileName = async (address) => {
    const provider = new Web3.providers.HttpProvider(RPC_URLS.L16);
    try {
      const config = { ipfsGateway: IPFS_GATEWAY_BASE_URL };
      const profile = new ERC725(erc725Schema, address, provider, config);
      const LSP3Profile = await profile.fetchData("LSP3Profile");
      setProfileName(LSP3Profile.value.LSP3Profile.name);
      return LSP3Profile;
    } catch (er) {
      // console.log(er)
      return false;
    }
  };

  const fetchLeagues = async () => {
    try {
      const {
        0: leaguesList,
        1: tokenCounter,
        2: managerCounter,
        3: admin,
      } = await LSP7Contract.methods.fetchLeagues().call();

      const formattedLeaguesList = [];
      await Promise.all(
        await leaguesList.map(async (league) => {
          const { title, description, date } = await cidFetcher(league.cid);
          const managers = [];
          if (league.managers) {
            await Promise.all(
              league.managers.map(async (manager) => {
                if (title) {
                  const managerObj = { ...manager, title };
                  managers.push(managerObj);
                }
              })
            );
          }

          // fetch creator of League
          const creatorData = await fetchLSP3Data(league.creator);
          const creatorAttrs = { name: "", profilePicture: "" };
          if (creatorData) {
            creatorAttrs.profilePicture = getProfileUrl(creatorData.value.LSP3Profile.profileImage);
            creatorAttrs.name = creatorData.value.LSP3Profile.name;
          }

          const leagueObj = { title, description, ...leagues, managers, creatorAttrs, date };
          if (title) {
            formattedLeaguesList.push(leagueObj);
          }
        })
      );
      setLeagues(formattedLeaguesList);
      setTokenIdCounter(parseInt(tokenCounter, 10));
      setManagerIdCounter(parseInt(managerCounter, 10));
      setAdminAddress(admin);
    } catch (er) {
      console.log(er);
    }
  };

  const getAccount = async (web3) => {
    await web3.eth.getAccounts().then((accounts) => {
      if (!accounts.length) {
        navigate("/");
      }
      setAccount(accounts[0]);
      return accounts[0];
    });
  };

  ///Getting list of players from official FPL endpoints
  async function fetchPlayers() {
    try {
      const request = await fetch("https://enigmatic-chamber-06773.herokuapp.com/users/players");

      const data = await request.json();

      if (data) {
        setFetchedPlayers(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function listenForAccountChanges() {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        setAccount("");
        navigate("/");
      }
    });

    window.ethereum.on("chainChanged", (netwrkId) => {
      if (netwrkId !== 2828) {
        setChainError(true);
      } else {
        setChainError(false);
      }
    });
  }

  function sendMessage(address) {
    // a reference to a current room
    const messagesRef = gun.get("General");
    const messageObj = {
      sender: address,
      content: "Hi Welcome football fans",
      timestamp: Date().substring(16, 21),
    };
    messagesRef.set(messageObj);
    setMessageText("");
  }

  const newMessagesArray = () => {
    const filteredMessages = state.messages.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        state.messages.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });
    return filteredMessages;
  };

  async function ErrorsCheck() {
    if (checkBrowserCompatibility) {
      setBrowserError(false);
    } else {
      setBrowserError(true);
    }

    if (isL16) {
      setChainError(false);
    } else {
      setChainError(true);
    }

    if (account) {
      if (isEOA) {
        setIsEOAError(true);
      } else {
        setIsEOAError(false);
      }
      if (await checkMinimalBalance()) {
        setLowBalanceError(false);
      } else {
        setLowBalanceError(true);
      }
    }
  }

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum) {
      setProviderError(false);
      listenForAccountChanges();
      const web3 = new Web3(ethereum);
      setLSP7Contract(new web3.eth.Contract(LSP7Artifact.abi, LSP7Address));
      if (!account) {
        getAccount(web3);
        localStorage.setItem("connected_address", account);
      }
    } else {
      setProviderError(true);
    }
  }, []);

  useEffect(() => {
    ErrorsCheck();
  }, [account]);

  useEffect(() => {
    ErrorsCheck();
  }, [networkId]);

  useEffect(() => {
    fetchPlayers();
    fetchProfileName(account);
  }, [account]);

  useEffect(() => {
    if (LSP7Contract) {
      try {
        fetchLeagues();
      } catch (error) {
        console.log("could not fetch available leagues");
      }
    }
  }, [LSP7Contract]);

  // useEffect(() => {
  //   // const messagesRef = gun.get("General");
  //   messagesRef.map().on((m) => {
  //     dispatch({ name: m.name, content: m.content, timestamp: m.timestamp });
  //   });
  // }, [messageText]);

  return (
    <GlobalContext.Provider
      value={{
        leagues,
        setLeagues,
        account,
        LSP7Contract,
        setTokenIdCounter,
        tokenIdCounter,
        fetchLeagues,
        managerIdCounter,
        fetchedPlayers,
        setManagerIdCounter,
        adminAddress,
        profileName,
        setAccount,
        setNetworkId,
        newMessagesArray,
        sendMessage,
        providerError,
        isEOAError,
        browserError,
        chainError,
        lowBalanceError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
