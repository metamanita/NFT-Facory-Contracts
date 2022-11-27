//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./NFTCollection.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTCollectionFactory {
    using Counters for Counters.Counter;
    Counters.Counter private _counter;

    address[] public contractsList;

    event CollectionCreated(address);

    constructor() {}

    function createInstance(
        string memory baseURI,
        string memory name,
        string memory symbol,
        string memory contractURI,
        uint256 max_supply,
        uint256 price,
        uint256 max_per_mint
    ) public virtual returns (address newNFTCollectionAddress) {
        NFTCollection newNFTCollection = new NFTCollection(
            baseURI,
            name,
            symbol,
            contractURI,
            max_supply,
            price,
            max_per_mint
        );
        newNFTCollection.transferOwnership(msg.sender);
        contractsList.push(address(newNFTCollection));
        _counter.increment();

        emit CollectionCreated(address(newNFTCollection));
        return address(newNFTCollection);
    }

    function deployedCounter() public view returns (uint256 __counter) {
        return _counter.current();
    }

    function deployedContracts() public view returns (address  [] memory) {
        return contractsList;
    }
}
