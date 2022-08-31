import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";

import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";

function NodeModal({ show, toggleModal, title, body, footer }) {
  return (
    <>
      <Modal open={show} sx={{ display: "grid", placeItems: "center" }}>
        <Slide direction="down" in={show} timeout={500}>
          <MKBox
            position="relative"
            width="500px"
            display="flex"
            flexDirection="column"
            borderRadius="xl"
            bgColor="white"
            textAlign="center"
            shadow="xl"
            overflowY="auto"
          >
            <MKBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
              <MKTypography variant="h5" textAlign="center">
                {title}{" "}
              </MKTypography>
              <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox p={2}>{body}</MKBox>
            <Divider sx={{ my: 0 }} />

            {footer}
          </MKBox>
        </Slide>
      </Modal>
    </>
  );
}

NodeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
};

export default NodeModal;
