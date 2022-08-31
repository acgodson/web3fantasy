import React from "react";
import PropTypes from "prop-types";
import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";

function ChatBox({ author, date, name, message }) {
  const chatColor = (() => {
    if (author === "true") return "lightBlue";
    return "whitesmoke";
  })();

  return (
    <MKBox
      mx={1}
      my={2}
      px={2}
      py={1}
      sx={{
        backgroundColor: chatColor,
        borderRadius: "8px",
      }}
    >
      <MKBox py={0.5} display="flex" justifyContent="flex-start" alignItems="center">
        <MKBox
          sx={{
            backgroundColor: "red",
            borderRadius: "50%",
            height: "30px",
            width: "30px",
          }}
        />
        <MKTypography
          component="h3"
          ml="3px"
          sx={{
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          {name}
          <MKBox
            component="span"
            sx={{
              fontWeight: "normal",
            }}
          >
            {date}
          </MKBox>
        </MKTypography>
      </MKBox>

      <MKTypography
        component="p"
        sx={{
          fontSize: "14px",
        }}
      >
        {message}
      </MKTypography>
    </MKBox>
  );
}

ChatBox.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ChatBox;
