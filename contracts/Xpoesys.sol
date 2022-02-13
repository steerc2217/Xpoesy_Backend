// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

import './ERC721.sol';

contract Xpoesys is ERC721 {
    
    struct Xpoesy {
        uint256 tokenId;
        string tokenName;
        string tokenURI;
        address payable mintedBy;
        address payable currentOwner;
        //address payable previousOwner;
        uint256 price;
        uint256 numberOfTransfers;
        bool forsale;
    }

    string public collectionName;
    string public collectionNameSymbol;
    uint256 public xpCounter;

    

    mapping(uint256 => Xpoesy) public allXpoesy;
    mapping(string => bool) public tokenNameExists;
    mapping(string => bool) public tokenURIExists;

    constructor() ERC721("Xpoesy", "XP"){
        collectionName = name();
        collectionNameSymbol = symbol();
    }

    function mintXpoesy(string memory _name, string memory _tokenURI, uint256 _price) external {
        require(msg.sender != address(0));
        xpCounter ++;
        require(!_exists(xpCounter));
        require(!tokenURIExists[_tokenURI]);
        require(!tokenNameExists[_name]);
        _mint(msg.sender, xpCounter);
        _setTokenURI(xpCounter, _tokenURI);
        tokenNameExists[_name] = true;
        tokenURIExists[_tokenURI] = true;
        Xpoesy memory newXpoesy = Xpoesy(
            xpCounter,
            _name,
            _tokenURI,
            msg.sender,
            msg.sender,
            _price,
            0,
            true
        );
        allXpoesy[xpCounter] = newXpoesy;
    }

    function getTokenOwner(uint256 _tokenId) public view returns(address){
        address _tokenOwner = ownerOf(_tokenId);
        return _tokenOwner;
    }

    function getTokenMetaData(uint _tokenId) public view returns(string memory){
        string memory tokenMetaData = tokenURI(_tokenId);
        return tokenMetaData;
    }

    function getNumberOfTokenMinted() public view returns(uint256){
        uint256 totalNumberOfTokenMinted = totalSupply();
        return totalNumberOfTokenMinted;
    }

    function getTokenExists(uint256 _tokenId) public view returns(bool){
        bool tokenExists = _exists(_tokenId);
        return tokenExists;
    }

    function buyToken(uint _tokenId) public payable{
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner != address(0));
        require(tokenOwner != msg.sender);
        Xpoesy memory xpoesy = allXpoesy[_tokenId];
        require(msg.value >= xpoesy.price);
        require(xpoesy.forsale);
        _transfer(tokenOwner, msg.sender, _tokenId);
        address payable sendTo = xpoesy.currentOwner;
        sendTo.transfer(msg.value);
        xpoesy.currentOwner = msg.sender;
        xpoesy.numberOfTransfers += 1;
        allXpoesy[_tokenId] = xpoesy;
    }

    function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(msg.sender == tokenOwner);
        Xpoesy memory xpoesy = allXpoesy[_tokenId];
        xpoesy.price = _newPrice;
        allXpoesy[_tokenId] = xpoesy;
    }
    function toggleForSale(uint256 _tokenId) public {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(msg.sender == tokenOwner);
        Xpoesy memory xpoesy = allXpoesy[_tokenId];
        if(xpoesy.forsale){
            xpoesy.forsale = false;
        }else{
            xpoesy.forsale = true;
        }
        allXpoesy[_tokenId] = xpoesy;
    }
}