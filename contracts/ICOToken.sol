pragma solidity ^0.8.0;
 import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
 contract ICOToken is ERC20 {
    address public owner;
    constructor() ERC20("ICO", "ICO") {
    }
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
        owner = msg.sender;
    }
}