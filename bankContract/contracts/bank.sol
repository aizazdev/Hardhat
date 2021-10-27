// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Bank {
    /*
    1 - the owner can start the bank with initial deposit in ether(min 50)
    2 - only the owner can close the back upon closing the balance should return to the owner
    3 - anyone can open an account in the bank for account opening they need to deposit ether with address
    4 - bank will maintain balances of accounts
    5 - anyone can deposti in the bank 
    6 - only valid account holders can withdraw 
    7 - first 5 accounts will get a bonus of 1 ether in bonus
    8 - accounts holder can inquiry balance
    */
    mapping( address => uint ) public _balances;
    mapping (address => bool ) public _accountExist;
    address payable _owner;
    
    uint count;
    
    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }
    
    modifier notOwner() {
        require(msg.sender != _owner);
        _;
    }
    
    modifier accountExist(address addr) {
        require(_accountExist[addr] == true, "account does't exist");
        _;
    }

    constructor() payable {
        _owner = payable(msg.sender);
        require(msg.value >= 50 ether);
        _balances[_owner] = msg.value;
        _accountExist[_owner] = true;
        count = 0;
    } 
    
    function closeBank() public onlyOwner {
        _owner.transfer(address(this).balance);
        selfdestruct(_owner);
    }
    
    function openAccount() public payable notOwner {
        require(msg.value > 0, "must add ethers");
        require(_accountExist[msg.sender] == true, "account already opened");
        _balances[msg.sender] = msg.value;
        _accountExist[msg.sender] = true;
        if(count < 5) {
            _balances[msg.sender] += 1 ether;
            count++;
        }
    } 
    
    function deposit() public payable accountExist(msg.sender) {
        require( msg.value > 0, "must enter ethers" );
        _balances[msg.sender] += msg.value;
    }
    
    function accountBalance() public view accountExist(msg.sender) returns(uint) {
        return _balances[msg.sender];
    }
    
    function withDraw() public payable accountExist(msg.sender) {
        require(_balances[msg.sender] > msg.value, "you account have balance");
        payable(msg.sender).transfer(msg.value);
    }
}