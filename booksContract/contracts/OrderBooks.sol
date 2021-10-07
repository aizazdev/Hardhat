// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;
import "hardhat/console.sol";

contract OrderBook {
    struct Book {
        string name;
        address author;
        uint price;
    }
    
    Book[] public books;
    uint id;
    
    mapping( address => uint ) public booksByAuthor;
    mapping( uint => Book[] ) public bookById;
    
    function sellBook(string memory _name, uint _price) public payable {
        Book memory b = Book( _name, msg.sender, _price);
        books.push(b);
        booksByAuthor[msg.sender]++;
    }
    
    function buyBook( uint _id ) public payable {
        console.log("address of book author is %s and Buyer is %s", books[_id].author, msg.sender);
        require( msg.value == books[_id].price, "price must be equal to book price");
        require( msg.sender != books[_id].author && msg.sender != address(0),"seller can't buy his own book");
        
        payable(books[_id].author).transfer(msg.value);
        
        booksByAuthor[books[_id].author]--;
        books[_id].author = msg.sender;
        booksByAuthor[msg.sender]++;
    }
    
}