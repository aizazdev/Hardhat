const {expect, use} = require('chai');
const {ethers} = require('ethers');
const {deployContract, MockProvider, solidity} = require('ethereum-waffle');
require("@nomiclabs/hardhat-waffle");
const NFTApp = require('../build/NFTApp.json');
const should = require('chai').should() //actually call the function
var utils = require('ethers').utils;

use(solidity);

describe('NFTApp', () => {
  let contract, nft;
  
  beforeEach(async()=> {
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner("0x71bE63f3384f5fb98995898A86B02Fb2426c5788");
    contract = new ethers.Contract(contractAddress, NFTApp.abi, provider);
    nft = contract.connect(signer);
  });                                 
// 0x976EA74026E726554dB657fA54763abd0C3a0aa9
// 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955
// 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f
// 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
// 0xBcd4042DE499D14e55001CcbB24a551F3b954096
// 0x71bE63f3384f5fb98995898A86B02Fb2426c5788
// 0xFABB0ac9d68B0B445fB7357272Ff202C5651694a
// 0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec
  
  it('Deploying Contract', async() => {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const URI = await contract._tokenURI();
    expect(name).to.equal("Token");
    expect(URI).to.equal("aizaz.com/");
  });
  
  // it("Mint Nft and create Nft", async()=> {
  //   const mint = await nft.mintNFT();
  //   const createNft = await nft.createNFT("500000000000000000", "1");
    
  // });

  // it("Buy NFT", async()=> {   
  //   const {_hex} = await nft.getItemPrice(1);
  //   let commission = 20 / 100 * _hex;
  //   let sellerPrice = _hex - commission;
  //   console.log(utils.formatEther(commission.toString()));
  //   console.log(utils.formatEther(sellerPrice.toString()));
  //   console.log("Big NUmber ", ethers.BigNumber.from(commission.toString()));
  //   const buyItem = await nft.buyNFT(1, ethers.BigNumber.from(commission.toString()), {value: _hex.toString()});
  //   console.log("buy Item", buyItem);
  // });

  it("owner of ", async()=> {
    const owner = await nft.ownerOf(1);
    expect(owner).to.equal("0x71bE63f3384f5fb98995898A86B02Fb2426c5788");
  });
});
