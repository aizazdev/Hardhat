// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract OrderBook {
    
    struct Book {
        string name;
        address author;
        uint price;
    }
    
    Book[] public books;
    mapping( address => uint ) public authorBooksCount;

    function sellBook( string memory _name, uint _price) public {
        console.log("selling a book with name '%s' and price '%s' ", _name, _price);
        Book memory b;
        b.name = _name;
        b.price = _price;
        b.author = msg.sender;
        books.push(b);
        authorBooksCount[msg.sender]++;
    }
    
    function buyBook(uint _key, uint _price) public returns(string memory, uint, address) {
        require(books[_key].price == _price, "price must be equal to book price");
        require(books[_key].author != msg.sender, "You are seller of this book sorry");
        authorBooksCount[books[_key].author]--;
        books[_key].author = msg.sender;
        authorBooksCount[msg.sender]++;
       
        return(books[_key].name, books[_key].price,books[_key].author);
    
    }
    
    function booksCount() public view returns(uint) {
        return books.length;
    }
    
}