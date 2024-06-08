// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract Asset is ERC20, ERC20Burnable, Ownable {
    
    constructor(string memory name, string memory cid)
        ERC20(name, cid)
        Ownable(msg.sender)
    {}


    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transfer_to(address from, address to, uint256 amount) public onlyOwner returns (bool){
        return transferFrom(from, to, amount);
    }

    function getCid() public view returns (string memory) {
    return symbol(); // The ERC20 contract already has a 'symbol' function
}

}
