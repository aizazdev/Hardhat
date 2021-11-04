const {expect, use} = require('chai');
const {ethers} = require('ethers');
const {deployContract, MockProvider, solidity} = require('ethereum-waffle');
require("@nomiclabs/hardhat-waffle");
const PaintingsNFT = require('../build/PaintingNFT.json');
const should = require('chai').should() //actually call the function


use(solidity);

describe('PaintingsNFT', () => {
  let contract, paintings;
  
  beforeEach(async()=> {
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner("0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65");
    contract = new ethers.Contract(contractAddress, PaintingsNFT.abi, provider);
    paintings = contract.connect(signer);
  });

  it('Deploying Contract', async() => {
    const name = await contract.name();    
    const symbol = await contract.symbol();
    const uri = await contract._tokenURI();
    expect(name).to.equal("Token");
    expect(symbol).to.equal("TK");
    expect(uri).to.equal("aizaz.com/");
  });

  // it("Mint NFT", async()=> {
  //   const mint = await paintings.mintNFT();
  //   console.log("Mint NFT =>", mint);
  // });

  // it("Onwer of Token 0", async()=> {
  //     const owner = await paintings.ownerOf(0);
  //     expect(owner).to.equal("0x71bE63f3384f5fb98995898A86B02Fb2426c5788");
  //     //const owner2 = await paintings.ownerOf(1);
  //     //expect(owner2).to.equal("0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f");
  // });

  it("Owner of token 0", async()=> {
    const tokenOwner = await paintings.ownerOf(0);
    expect(tokenOwner).to.equal("0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc");
  });

  // it("Transfer token e to address", async()=> {
  //   const transferToken = await paintings.transferFrom("0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65","0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", 0);
  //   console.log("tokentransfer", transferToken);
  // });

  it("Tokens Length", async()=> {
      const totalNumberOfTokens = await paintings._tokenId();
      console.log("Tokens id ", totalNumberOfTokens);
  });
});
