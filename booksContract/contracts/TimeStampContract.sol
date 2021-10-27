// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "hardhat/console.sol";

contract TimeStampContract is ERC20  {
    
    uint256 private _cap;
    uint duration = 5 minutes;
    uint release;
    
    constructor(uint cap_) public ERC20("Token", "tk") {
        release = block.timestamp + duration;
        _cap = cap_;
        _mint(msg.sender, cap_);
    }
    
    function transfer( address receipt, uint amount ) public virtual override returns(bool success){
        require(block.timestamp >= release, "please wait");
        _transfer(msg.sender, receipt, amount);
        return success;
    }
    
    function _mint(address account, uint256 amount) internal virtual override {
        require(ERC20.totalSupply() + amount <= _cap, "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }
}