// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title RecoverVault
 * @dev Holds insurance funds and releases them when a BITE-verified trigger occurs.
 */
contract RecoverVault {
    address public owner;
    address public agent;
    
    struct Policy {
        address user;
        uint256 payoutAmount;
        bool active;
        string encryptedTrigger; // The BITE encrypted condition (e.g. "WIND>100")
    }

    mapping(uint256 => Policy) public policies;
    uint256 public policyCount;

    event PolicyCreated(uint256 indexed policyId, address indexed user, uint256 amount);
    event ClaimPaid(uint256 indexed policyId, address indexed user, uint256 amount);

    modifier onlyAgent() {
        require(msg.sender == agent, "Only Agent can trigger payout");
        _;
    }

    constructor(address _agent) {
        owner = msg.sender;
        agent = _agent; // The Python Agent's Wallet Address
    }

    // 1. User buys a policy (Simulated: User sends funds here)
    // In a real scenario, the premium would be separate from the payout pool, 
    // but for this hackathon demo, we just pool funds.
    function createPolicy(address _user, string memory _encryptedTrigger) external payable {
        require(msg.value > 0, "Must fund the policy");
        policyCount++;
        policies[policyCount] = Policy(_user, msg.value, true, _encryptedTrigger);
        emit PolicyCreated(policyCount, _user, msg.value);
    }

    // 2. Agent executes payout ONLY if it has the decrypted key (Simulated proof)
    // The "proof" here is implicit: The Agent logic (off-chain) only calls this 
    // after BITE decryption. Ideally, we would pass the decrypted key here.
    function executePayout(uint256 _policyId) external onlyAgent {
        Policy storage p = policies[_policyId];
        require(p.active, "Policy inactive or already paid");

        p.active = false;
        
        // Transfer the payout amount to the user
        (bool sent, ) = payable(p.user).call{value: p.payoutAmount}("");
        require(sent, "Failed to send Ether");
        
        emit ClaimPaid(_policyId, p.user, p.payoutAmount);
    }

    // Allow contract to receive funds
    receive() external payable {}
}
