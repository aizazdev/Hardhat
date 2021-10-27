pragma solidity ^0.8.0;

contract Token {
    string name = "MyToken";
    string symbol = "MT";

    uint totalSupply = 1000;
    address owner;
    
    mapping(address => uint ) public balances;
    constructor()  {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) public {
        require(balances[owner] >= amount, "not enough tokens");
        balances[owner] -= amount;
        balances[to] += amount;
    } 

    function balance() public view returns(uint) {
        return balances[msg.sender];
    }
}