import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import MKButton from "utils/MKButton";
import MKBox from "utils/MKBox";
import MKTypography from "utils/MKTypography";
import NodeModal from "components/Modal/nodeModal";

function Loader({ name, loading, setLoading, onIpfs, postOnSC }) {
  const [error, setError] = useState("");

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (loading === "false") {
      setError("");
    }
  }, [loading]);

  return (
    <NodeModal
      show={loading.toString()}
      body={
        <>
          {error ? (
            <>
              <MKBox sx={{ color: "red" }}>{error}</MKBox>
              <MKButton onClick={setLoading}>Close</MKButton>
            </>
          ) : null}
          {onIpfs ? (
            <MKTypography>{capitalizeFirstLetter(name)} pushed to ipfs successfully</MKTypography>
          ) : (
            <MKTypography>Pushing {name} to IPFS...</MKTypography>
          )}
          {onIpfs && postOnSC ? (
            <MKTypography>{capitalizeFirstLetter(name)} published on smart contract</MKTypography>
          ) : (
            <MKTypography>publishing {name} to smart contract...</MKTypography>
          )}
        </>
      }
      title=""
      toggleModal={setLoading}
      footer={<MKBox />}
    />
  );
}

Loader.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  onIpfs: PropTypes.bool.isRequired,
  postOnSC: PropTypes.bool.isRequired,
};
export default Loader;
