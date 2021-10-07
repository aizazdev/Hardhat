const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OrderBooks", function () {
  it("Deployed Contract", async function () {
    const OrderBooks = await ethers.getContractFactory("OrderBooks");
    const books = await OrderBooks.deploy();
    await books.deployed();

    const setGreetingTx = await books.sellBook("Harry Porter 2", 10000000000);
    // wait until the transaction is mined
    await setGreetingTx.wait();

  });
});
