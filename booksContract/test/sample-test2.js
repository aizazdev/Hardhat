const {expect, use} = require('chai');
const {ethers} = require('ethers');
const {deployContract, MockProvider, solidity} = require('ethereum-waffle');
const TimeStampContract = require('../build/TimeStampContract.json');

use(solidity);

describe('TimeStampContract', () => {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
  const signer = provider.getSigner();
 //0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 
 it('Assigning intial cap token', async() => {
  const Contract = await hre.ethers.getContractFactory("TimeStampContract");
  const contract = await Contract.connect(signer).deploy(1000);
  await contract.deployed;
  });
});
