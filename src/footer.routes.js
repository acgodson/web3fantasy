import React from "react";
import MKTypography from "utils/MKTypography";

const date = new Date().getFullYear();

export default {
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      Copyright &copy; {date}
      <MKTypography
        component="a"
        href="https://github.com/acgodson/web3fantasy"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Web3 Fantasy
      </MKTypography>
      , for Lukso 2022 Hackathon
    </MKTypography>
  ),
};
