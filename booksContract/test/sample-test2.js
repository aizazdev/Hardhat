const {expect, use} = require('chai');
const {ethers} = require('ethers');
const {deployContract, MockProvider, solidity} = require('ethereum-waffle');
const TimeStampContract = require('../build/TimeStampContract.json');

use(solidity);

describe('TimeStampContract', () => {
  let timeStamp;
  beforeEach(async()=> {
 
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signer = provider.getSigner();
  
    const Contract = await hre.ethers.getContractFactory("TimeStampContract");
    timeStamp = await Contract.connect(signer).deploy(1000);
    await timeStamp.deployed;

  });

  it('Deploying Contract', async() => {
    const name = await timeStamp.name();
    expect(name).to.equal("Token");
    const symbol = await timeStamp.symbol();
    expect(symbol).to.equal("tk");
  });

  it("Capped Tokens", async() => {
    const capToken = await timeStamp.duration();
    console.log("capped token", capToken);
  });
});
