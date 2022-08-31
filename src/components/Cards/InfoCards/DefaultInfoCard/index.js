import React from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";
import MKButton from "utils/MKButton";

function DefaultInfoCard({
  action,
  color,
  icon,
  title,
  description,
  direction,
  small,
  edit,
  connected,
  button,
}) {
  const touch = "touch_app";

  return (
    <MKBox
      onClick={action}
      shadow="lg"
      sx={{
        borderRadius: "12px",
        cursor: "pointer",
      }}
      bgColor={connected ? "white" : "transparent"}
      lineHeight={1}
      p={direction === "center" ? 2 : 0}
      textAlign={direction}
    >
      {typeof icon === "string" ? (
        <MKTypography
          display="block"
          variant={direction === "center" ? "h2" : "h3"}
          color={color}
          ml={2}
          textGradient
        >
          {" "}
          <Icon>{icon}</Icon>{" "}
        </MKTypography>
      ) : (
        icon
      )}
      <MKTypography
        display="block"
        variant="5"
        fontWeight="bold"
        ml={2}
        mt={direction === "center" ? 1 : 2}
        mb={1.5}
      >
        {title}
      </MKTypography>
      <MKTypography
        display="block"
        variant={small ? "button" : "body2"}
        color="text"
        pb={2}
        sx={{
          fontSize: connected ? "12px" : "15px",
        }}
        pr={direction === "left" ? 6 : 2}
        pl={direction === "right" ? 6 : 2}
      >
        {description}
      </MKTypography>

      {edit === "none" ? (
        <MKButton
          sx={{
            position: "relative",
            float: "right",
            marginTop: "-20px",
          }}
          component="button"
          color="info"
          size="small"
        >
          <Icon
            sx={{
              fontSize: "30px",
            }}
          >
            {touch}
          </Icon>
          {` ${button}`}
        </MKButton>
      ) : (
        <></>
      )}
    </MKBox>
  );
}

// Setting default props for the DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: "info",
  direction: "left",
  small: false,
  edit: "none",
  action: null,
  connected: false,
  button: "",
};

// Typechecking props for the DefaultInfoCard
DefaultInfoCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  action: PropTypes.func,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["left", "right", "center"]),
  small: PropTypes.bool,
  connected: PropTypes.bool,
  edit: PropTypes.string,
  button: PropTypes.string,
};

export default DefaultInfoCard;
