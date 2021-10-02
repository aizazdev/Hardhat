const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OrderBook", function () {
  it("Should return new name and price on sellBook function", async function () {
    const Book = await ethers.getContractFactory("OrderBook");
    const book = await Book.deploy();
    await book.deployed();

    const sellBookFunction = await book.sellBook("Harry Porter", 200);

    expect(await book.booksCount()).to.equal(1);
  });
});
