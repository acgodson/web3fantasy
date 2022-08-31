import React from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";

function RotatingCardFront({ color, image, icon, title, description, align }) {
  return (
    <MKBox
      display="flex"
      justifyContent="center"
      alignContent={align}
      borderRadius="lg"
      coloredShadow={color}
      width="100%"
      position="relative"
      zIndex={2}
      sx={{
        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
          `${linearGradient(
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.85),
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.85)
          )}, url(${image})`,
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
      }}
    >
      <MKBox pt={0} py={align === "start" ? 6 : 12} px={3} textAlign="center" lineHeight={1}>
        {icon && (
          <MKTypography variant="h2" color="white" my={2}>
            {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
          </MKTypography>
        )}
        <MKTypography variant="h3" color="white" gutterBottom>
          {title}
        </MKTypography>
        <MKTypography variant="body2" color="white" opacity={0.8}>
          {description}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the RotatingCardFront
RotatingCardFront.defaultProps = {
  color: "info",
  icon: "",
  align: "start",
};

// Typechecking props for the RotatingCardFront
RotatingCardFront.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  align: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};

export default RotatingCardFront;
