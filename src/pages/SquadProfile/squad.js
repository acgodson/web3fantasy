import React from "react";
import PropTypes from "prop-types";
import MKBox from "utils/MKBox";
import MKButton from "utils/MKButton";
import noImage from "assets/images/empty_avatar.png";
import playerImage from "assets/images/player_avatar.png";
import MKTypography from "utils/MKTypography";
import { fontWeight } from "@mui/system";

function SquadAvatar({ title, code, points, action }) {
  return (
    <MKBox>
      <MKButton color="success" mx={0}>
        <MKBox
          onClick={action}
          mx={0}
          shadow="lg"
          sx={{
            height: "45px",
            width: "40px",
            fontSize: "xl",
            fontWeight: "bold",
            backgroundImage: title.length > 2 ? `url(${playerImage})` : `url(${noImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {code}
          <br />
        </MKBox>
      </MKButton>
      <MKTypography
        component="p"
        textAlign="center"
        sx={{
          fontSize: "12px",
          color: "white",
          fontWeight: "bold"
        }}
      >
        {title}
        <br /> {title.length > 2 ? points : " "}
      </MKTypography>
    </MKBox>
  );
}

SquadAvatar.defaultProps = {
  title: "",
  action: null,
  points: 0,
};

SquadAvatar.propTypes = {
  title: PropTypes.string,
  points: PropTypes.number,
  code: PropTypes.string.isRequired,
  action: PropTypes.func,
};

export default SquadAvatar;
