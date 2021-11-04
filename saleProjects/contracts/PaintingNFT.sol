// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaintingNFT is ERC721URIStorage, Ownable {
    /*
    1. Create NFT
    2. View NFTs
    3. Transfer ownership of NFT to buyer 
    */
    string public _tokenURI;
    string public extension = ".json";
    uint32 public totalSupply = 500;
    uint public maxSupply = 15;
    uint32 public _tokenId;
    mapping(uint256 => string) private _tokenURIs;

    error MaximumSupply(string);
    error SupplyReached(string);
    
    constructor(string memory name, string memory symbol, string memory URI) public ERC721( name, symbol ) {
        _tokenURI = URI;
    }
    
    function mintNFT() external returns( bool ) {
        uint32 tokenId = _tokenId++;
        if(tokenId > totalSupply) {
            revert MaximumSupply("maximum supply reached at a time");
        }
        
        if(balanceOf(msg.sender) > 15 ) {
            revert SupplyReached("YoU have reached your maximum supply");
        }
        
        _mint(msg.sender, tokenId);
        addPaintingMetadata(tokenId);
        return true;
    }
    
    function addPaintingMetadata(uint256 tokenId) public returns(bool){
        tokenURI(tokenId);
        return true;
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return _tokenURI;
    }
}