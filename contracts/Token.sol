pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./ICOToken.sol";

contract Token {
    using SafeERC20 for IERC20;
    IERC20 public token;
    mapping(address => uint256) public deposits;
    uint256 public softCap;
    uint256 public hardCap;
    uint256 public minPurchase;
    uint256 public maxPurchase;
    uint256 public startTime;
    uint256 public endTime;
    uint256 public totallySell=0;
    bool public closed;
    address public owner;
    event Deposit(address indexed account, uint256 amount);
    event Withdrawal(address indexed account, uint256 amount);
    event Claim(address indexed account, uint256 amount);

    constructor(
        address _token,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _minPurchase,
        uint256 _maxPurchase,
        uint256 _startTime,
        uint256 _endTime
    ) {
        require(_startTime >= block.timestamp, "ICO already started");
        require(_endTime > _startTime, "End time must be after start time");
        require(
            _softCap > 0 && _hardCap > 0 && _hardCap >= _softCap,
            "Invalid soft/hard cap"
        );
        require(_minPurchase > 0, "Invalid min purchase");
        require(_maxPurchase >= _minPurchase, "Invalid max purchase");
        token = IERC20(_token);
        softCap = _softCap;
        hardCap = _hardCap;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
        startTime = _startTime;
        endTime = _endTime;
        owner = msg.sender;
    }

    function deposit(uint256 amount) public {
        require(
            block.timestamp >= startTime && block.timestamp <= endTime,
            "ICO is closed"
        );
        require(
            amount >= minPurchase && amount <= maxPurchase,
            "Invalid deposit amount"
        );
        deposits[msg.sender] += amount;
        totallySell+=amount;
        emit Deposit(msg.sender, amount);
    }

    function withdraw() public {
        require(block.timestamp > endTime, "ICO is not closed yet");
        require(!closed, "ICO is already closed");
        closed = true;
        uint256 balance = token.balanceOf(address(this));
        if (balance < softCap) {
            uint256 decreassed=deposits[msg.sender];
            totallySell-=decreassed;
            deposits[msg.sender] = 0;
            emit Withdrawal(msg.sender, deposits[msg.sender]);
        } else {
            uint256 totalDeposits = deposits[msg.sender];
            uint256 totalSupply = token.totalSupply();
            uint256 userTokens = (totalDeposits * totalSupply) / hardCap;
            token.safeTransfer(msg.sender, userTokens);
            emit Claim(msg.sender, userTokens);
        }
    }

    function balanceOf() external view returns (uint256) {
        return deposits[msg.sender];
    }

    function totalbalanceOf() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
