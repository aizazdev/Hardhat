const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
    let Token, token, owner, addr1, addr2;
    beforeEach(async()=> {
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();
        [owner, addr1, addr2 ] = ethers.getSigners();
    });

    describe('Deployement', () => {
        it('should be the tokens owner', async() => {
            expect(await token.owner).to.equal(owner.address);
        });
        it('assign all token to owner address', async()=> {
            const ownerBalance = await token.balance(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });
    describe('Transactions', ()=> {
        it('transferring tokens between accounts', async() => {
            await token.transfer(addr1.address, 20);
            const addrBalance = await token.balance(addr1.address);
            expect(addrBalance).to.equal(20);
        });
    })
  });