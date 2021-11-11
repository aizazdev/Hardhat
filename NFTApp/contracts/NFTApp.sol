// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTApp is IERC721, ERC721 {
    
    string public _tokenURI;
    uint256 public _tokenId;
    bool public isSaleStart;
    address owner;
    
    mapping( uint => uint ) public _price;
    mapping( uint => address ) public tokenOwner;
    
    constructor( string memory name_, string memory symbol_, string memory URI_) ERC721(name_, symbol_) {
        require(bytes(name_).length != 0 || bytes(symbol_).length != 0 || bytes(URI_).length != 0, "name, symbol, uri must be added");
        isSaleStart = true;
        _tokenURI = URI_;
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "you are not an owner");
        _;
    }
    
    modifier ownerCanNotBuy(uint id_) {
        require(msg.sender != tokenOwner[id_], "Owner can not buy his own item");
        _;
    }
    
    modifier checkSale(bool sale_) {
        require(sale_ ==  true, "sale closed at a time");
        _;
    }
    
    function closeSale() public onlyOwner() {
        isSaleStart = false;
    }
    
    function startSale() public onlyOwner() {
        isSaleStart = true;
    }
    
    function mintNFT() public returns(bool) {
        uint id = _tokenId++;
        _mint( msg.sender, id );
        setApprovalForAll(address(this), true);
        addMetaData(id);
        return true;
    }
    
    function createNFT( uint price_, uint id_ ) public {
        require(price_ > 0, "Price must be at least 1 wei");
        _price[id_] = price_;
        tokenOwner[id_] = msg.sender;
        IERC721(address(this)).transferFrom(msg.sender, address(this), id_);
    }
    
    function buyNFT(uint id_, uint comission_) public payable ownerCanNotBuy(id_) checkSale(isSaleStart) returns(bool) {
        require( msg.value >= _price[id_], "Price must be equal to item price");
        IERC721(address(this)).transferFrom(address(this) , msg.sender, id_);
        payable(tokenOwner[id_]).transfer(msg.value - comission_);
        tokenOwner[id_] = msg.sender;
        return true;
    }
    
    function addMetaData(uint id_) private view returns(bool) {
        tokenURI(id_);   
        return true;
    }

    function getItemPrice(uint id_) public view returns(uint) {
        return _price[id_];
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _tokenURI;
    }
    
    function withdraw() public payable onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}