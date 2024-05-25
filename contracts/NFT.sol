//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ShardZNFT is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _tokenCIDs;

    constructor() ERC721("ShardZNFT", "SHARDZ") {}

    function createNFT(address recipient, string memory cid)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _tokenCIDs[newItemId] = cid;

        return newItemId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "NFT: URI query for nonexistent token"
        );

        string memory base = baseTokenURI();
        string memory tokenCID = _tokenCIDs[tokenId];

        return string(abi.encodePacked(base, tokenCID));
    }

    function baseTokenURI() internal pure virtual returns (string memory) {
        return "https://gateway.lighthouse.storage/ipfs/";
    }

    function getTokenCID(uint256 tokenId) public view returns (string memory) {
        require(
            _exists(tokenId),
            "NFT: URI query for nonexistent token"
        );

        return _tokenCIDs[tokenId];
        
    }
}
