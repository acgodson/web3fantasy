import Web3 from "web3";
import { LSPFactory } from "@lukso/lsp-factory.js";

const web3 = new Web3();
const PRIVATE_KEY = "0xf30d86783c87cbec2e34373772ffff987dd0bc8c4b8b1bca23a8509c1e9351c3"; // your EOA private key (created in step 1)
const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);

// initialize the LSPFactory with the L16 chain RPC endpoint, chainId and your EOA's private key which will deploy the UP smart contracts
const lspFactory = new LSPFactory("https://rpc.l16.lukso.network", {
  deployKey: PRIVATE_KEY,
  chainId: 2828,
});

// Step 3.3 - Deploy our Universal Profile
async function createUniversalProfile() {
  const deployedContracts = await lspFactory.UniversalProfile.deploy({
    controllerAddresses: [myEOA.address], // our EOA that will be controlling the UP
    lsp3Profile: {
      name: "Godson Ani",
      description: "Web3 Fantasy Developer",
      tags: ["Public Profile"],
      links: [
        {
          title: "My Website",
          url: "https://my-website.com",
        },
      ],
    },
  });

  return deployedContracts;
}

createUniversalProfile().then((deployedContracts) => {
  console.log(deployedContracts);
});

// {
//   address: '0x192cbFb02898611e811E78d81bEd2B3258185FFD',
//   privateKey: '0xf30d86783c87cbec2e34373772ffff987dd0bc8c4b8b1bca23a8509c1e9351c3',
//   signTransaction: [Function: signTransaction],
//   sign: [Function: sign],
//   encrypt: [Function: encrypt]
// }

// First Contract deployed to lukso
//   deployerAddress:  0x192cbFb02898611e811E78d81bEd2B3258185FFD
// Contract deployed to: 0x46360dF637f16a789dBBb6FE3bBB0f7a357cc178

// Second Contract deployed to lukso
// deployerAddress:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3

// deployerAddress:  0x192cbFb02898611e811E78d81bEd2B3258185FFD
// Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
