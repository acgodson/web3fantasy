import React, { useEffect, useState } from "react";
import identicon from "ethereum-blockies-base64";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Web3 from "web3";
import ERC725js from "@erc725/erc725.js";
import LSP3UniversalProfileMetaDataSchema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";
import MKButton from "utils/MKButton";
import getProfileImage from "utils/get-profile-url";

function ProfileModal({ setCreatorAttrs, toggleModal, show }) {
  const [profileInfo, setProfileInfo] = useState({
    address: "",
    name: "",
    picURL: "",
    identiconURL: "",
    isEOA: false,
  });

  function handleProfileInfo(name, value) {
    setProfileInfo({ ...profileInfo, [name]: value });
  }

  async function loadProfileInformation() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    handleProfileInfo("address", account);
    const identiconPicture = identicon(account);
    handleProfileInfo("identiconURL", identiconPicture);
    const profile = new ERC725js(
      LSP3UniversalProfileMetaDataSchema,
      account,
      web3.currentProvider,
      {
        ipfsGateway: "https://ipfs.io/ipfs",
      }
    );

    let metaData;
    try {
      metaData = await profile.fetchData("LSP3Profile");
    } catch (error) {
      handleProfileInfo("isEOA", true);
      return;
    }
    const { name } = metaData.value.LSP3Profile;
    handleProfileInfo("name", metaData.value.LSP3Profile.name);

    const x = metaData.value;
    const img = x.LSP3Profile.profileImage;
    const profilePicture = getProfileImage(img);
    handleProfileInfo("picURL", profilePicture);
    setCreatorAttrs({ name, profilePicture });
  }

  useEffect(() => {
    loadProfileInformation();
  }, []);

  return (
    <Modal open={show} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={show} timeout={500}>
        <MKBox
          position="relative"
          width="500px"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          shadow="xl"
        >
          <MKBox
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            sx={{
              backgroundImage: `url('${profileInfo.identiconURL}')`,
              height: "120px",
            }}
          >
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox
              sx={{
                height: "100px",
                width: "100px",
                borderRadius: "100px",
                backgroundImage: `url(" + ${profileInfo.picURL} + ")`,
              }}
            />
            <MKTypography py={2} variant="h5">
              {profileInfo.name}{" "}
            </MKTypography>
            <MKTypography variant="p">{profileInfo.address} </MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="center" p={1.5}>
            <MKButton variant="gradient" color="dark" onClick={toggleModal}>
              close
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

ProfileModal.propTypes = {
  setCreatorAttrs: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired,
};

export default ProfileModal;
