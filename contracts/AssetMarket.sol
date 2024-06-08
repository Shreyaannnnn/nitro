// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "./Asset.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Market {

    address[] private _assets;
    enum Listingstatus {
        Active,
        Sold,
        Cancelled
    }

    struct Listing {
        Listingstatus status;
        address seller;
        uint amount;
        uint price;
    }

    uint private _listingId = 0;
    mapping(address => Listing) private _listings;

    mapping(string => address) private _cidToAsset; // Change bytes32 to string

    function createcontent(string memory name, string memory cid) public returns (address) {
        // Check if an Asset contract already exists for the CID
        address existingAssetAddress = _cidToAsset[cid];

        if (existingAssetAddress != address(0)) {
            // An Asset contract already exists, return its address
            return existingAssetAddress;
        }
        
        Asset asset = new Asset(name, cid);
        _assets.push(address(asset));
        Listing memory listing = Listing(Listingstatus.Cancelled, msg.sender, 0, 0);
        _listings[address(asset)]=listing;
        asset.transferOwnership(msg.sender);

        // Store the association between CID and Asset address
        _cidToAsset[cid] = address(asset);

        return address(asset);
    }


    function getAssetAddress(string memory contentNFT) public view returns (address) { // Change bytes32 to string
        return _cidToAsset[contentNFT];
    }




function getAllCIDsAndAssets() public view returns (string[] memory, address[] memory) {
    string[] memory allCIDs = new string[](_listingId);
    address[] memory allAssets = new address[](_listingId);
    uint count = 0;

    for (uint i = 0; i < _listingId; i++) {
        string memory cid = string(abi.encodePacked(i)); // Generate potential CID from index
        address asset = _cidToAsset[cid];
        if (asset != address(0)) { // Check if the CID is associated with an asset
            allCIDs[count] = cid;
            allAssets[count] = asset;
            count++;
        }
    }
    
    // Resize arrays to actual count
    assembly {
        mstore(allCIDs, count)
        mstore(allAssets, count)
    }
    return (allCIDs, allAssets);
}


    function getListedAssets() public view returns (address[] memory) {
        address[] memory listedAssets = new address[](_listingId); 
        uint count = 0;
        for (uint i = 0; i < _assets.length; i++) {
            if (_listings[_assets[i]].status == Listingstatus.Active) {
                listedAssets[count] = _assets[i];
                count++;
            }
        }
        // Resize the array to the actual number of active listings
        assembly { mstore(listedAssets, count) }
        return listedAssets;
    }



    function addassettolist(address assetAddress, uint amount, uint price) public {
        Asset asset = Asset(assetAddress);
        require(asset.transferFrom(msg.sender,address(this), amount), "Listing Failed");
        Listing memory listing = _listings[assetAddress];
        listing.amount=amount;
        listing.price=price;
        listing.status=Listingstatus.Active;
        _listings[assetAddress] = listing;
        _listingId++;
    }

    function getListing(address assetAddress) public view returns (Listing memory) {
        return _listings[assetAddress];
    }

    function buyasset(address assetAddress, uint numcoins) external payable {
        Listing storage listing = _listings[assetAddress];
        require(listing.status == Listingstatus.Active, "Listing is not active");
        require(msg.sender != listing.seller, "Seller can't be the buyer");
        require(listing.amount >= numcoins, "Not enough tokens available");
        require(msg.value >= listing.price * numcoins, "Insufficient payment");

        Asset asset = Asset(assetAddress);
        asset.transfer(msg.sender, numcoins);
        payable(listing.seller).transfer(listing.price * numcoins);
        listing.amount -= numcoins;

        if (listing.amount == 0) {
            listing.status = Listingstatus.Sold;
        }
        _listings[assetAddress] = listing;
    }

    function cancel(address assetAddress) public {
        Listing storage listing = _listings[assetAddress];
        require(msg.sender == listing.seller, "Only seller can cancel listing");
        require(listing.status == Listingstatus.Active, "Listing is not active");
        listing.status = Listingstatus.Cancelled;
        Asset asset = Asset(assetAddress);
        asset.transfer(msg.sender, listing.amount);
    }

    function getTokenDetails(string memory contentNFT) public view returns (string memory name,  uint price, Listingstatus status) {
    address assetAddress = _cidToAsset[contentNFT];
    require(assetAddress != address(0), "Asset not found for this CID");
    
    Asset asset = Asset(assetAddress);
    name = asset.name();
    // description = asset.description();
    Listing memory listing = _listings[assetAddress];
    price = listing.price;
    status = listing.status;
}
}
