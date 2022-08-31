/* eslint-disable no-console */
import { create as ipfsClient } from "ipfs-http-client";

function ipfsNode() {
  return ipfsClient("https://api.2eff.lukso.dev");
}

export default ipfsNode;
