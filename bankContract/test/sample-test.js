const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank", function () {
  it("should deposit 50 ethers", async function () {
    const Bank = await hre.ethers.getContractFactory();
    const bank = await Bank.deploy();
  
    await bank.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
