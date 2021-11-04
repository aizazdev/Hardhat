require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
   networks: {
        localhost: {
          url: "http://127.0.0.1:8545"
        },
        hardhat: {
          chainId: 1337,
        },
        ropsten: {
          chainId: 3,
          url: "https://ropsten.infura.io/v3/Your_Api",
          accounts: ["Private Key"]
         }
      },
    solidity: "0.8.4",
};
