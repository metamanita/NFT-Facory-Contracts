//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract NFTCollection is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    // The max number of NFTs in the collection
    uint public MAX_SUPPLY; // = 10;
    // The mint price for the collection
    uint public PRICE; // = 0.00001 ether;
    // The max number of mints per wallet
    uint public MAX_PER_MINT; // = 5;

    string public baseTokenURI;
    string private _contractURI;

    constructor(
        string memory baseURI,
        string memory name,
        string memory symbol,
        string memory __contractURI,
        uint max_supply,
        uint price,
        uint max_per_mint
    ) ERC721(name, symbol) {
        setBaseURI(baseURI);
        setContractURI(__contractURI);
        MAX_SUPPLY = max_supply;
        PRICE = price;
        MAX_PER_MINT = max_per_mint;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function setContractURI(string memory contractURI_) public onlyOwner {
        _contractURI = contractURI_;
        
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function mintNFTs(uint _count) public payable {
        uint totalMinted = _tokenIds.current();

        require(
            totalMinted.add(_count) <= MAX_SUPPLY,
            "This collection is sold out!"
        );
        require(
            _count > 0 && _count <= MAX_PER_MINT,
            "You have received the maximum amount of NFTs allowed."
        );
        require(
            msg.value >= PRICE.mul(_count),
            "Not enough ether to purchase NFTs."
        );

        for (uint i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }

    function _mintSingleNFT() private {
        uint newTokenID = _tokenIds.current();
        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }

    // Returns the ids of the NFTs owned by the wallet address
    function tokensOfOwner(address _owner)
        external
        view
        returns (uint[] memory)
    {
        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    // Withdraw the ether in the contract
    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

    // Reserve NFTs only for owner to mint for free
    function reserveNFTs(uint _count) public onlyOwner {
        uint totalMinted = _tokenIds.current();

        require(
            totalMinted.add(_count) < MAX_SUPPLY,
            "Not enough NFTs left to reserve"
        );

        for (uint i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }
}
