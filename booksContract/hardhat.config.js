require("@nomiclabs/hardhat-waffle");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const dotenv = require('dotenv');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
   networks: {
        hardhat: {
          chainId: 1337
        },
        // matic: {
        //   url: "https://rpc-mumbai.maticvigil.com",
        //   accounts: ["private_key"]
        // }
      },
    solidity: "0.8.4",
};

// require("@nomiclabs/hardhat-ethers");

// module.exports = {
//   defaultNetwork: "matic",
//   networks: {
//     hardhat: {
//     },
//     matic: {
//       url: "https://rpc-mumbai.maticvigil.com",
//       accounts: ["private_key"]
//     }
//   },
//   solidity: {
//     version: "0.8.0",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts"
//   },
//   mocha: {
//     timeout: 20000
//   }
// }