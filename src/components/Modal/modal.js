import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";

import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";
import MKButton from "utils/MKButton";

function DefaultModal({ show, toggleModal, content }) {
  return (
    <>
      <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
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
            <MKBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
              <MKTypography variant="h5">{content.title} </MKTypography>
              <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox p={2}>
              <MKTypography variant="body2" color="secondary" fontWeight="regular">
                {content.body}
              </MKTypography>
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox display="flex" justifyContent="space-between" p={1.5}>
              <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                close
              </MKButton>
              {/* <MKButton variant="gradient" color="info">
                save changes
              </MKButton> */}
            </MKBox>
          </MKBox>
        </Slide>
      </Modal>
    </>
  );
}

DefaultModal.propTypes = {
  show: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.string]).isRequired,
};

export default DefaultModal;
