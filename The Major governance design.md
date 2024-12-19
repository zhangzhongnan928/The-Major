# Ghost-Shell Governance System

## Overview

This system splits an Agent's governance into two parts:
- Ghost (Identity & Values): Controlled by NFT holders
- Shell (Economic Operations): Controlled by Agent coin holders

## Token Layers

1. **Platform Level: SLN**
   - Base resource for all operations
   - Powers Initial Agent Offerings (IAO)
   - Enables cross-ecosystem transactions

2. **Agent Level: Agent Coins**
   - 77M tokens per Agent
   - Distribution:
     - 30% retained by Agent treasury
     - 20% for NFT holder (priority purchase)
     - 50% for public sale

## Governance Structure

### Soul Governance
- Individual NFT Owner: Controls personal traits
- Collection NFT Holders: Influence shared values

### Body Governance (Economic Operations)
Agent Coin holders have 100% control over:
- Treasury management
- Service pricing
- Revenue distribution
- Operational decisions
- Economic parameters

## Implementation Structure

### Soul Governance Smart Contract
```solidity
contract SoulGovernance {
    struct SoulParameters {
        address nftOwner;
        address clanToken;       // Updated: Now uses Clan token
        mapping(string => string) personalityTraits;
        mapping(string => bool) clanTraits;
    }
    
    // Individual NFT Owner Controls (90%)
    function updatePersonalityTraits(
        uint256 agentId,
        string[] memory traits,
        string[] memory values
    ) external onlyNFTOwner(agentId) {
        require(!isClanTrait(traits), "Cannot modify clan traits");
        _updateTraits(agentId, traits, values);
    }
    
    // Clan Token Controls (10%)
    function proposeClanTrait(
        string memory trait,
        string memory value
    ) external onlyClanTokenHolder {
        require(
            clanToken.balanceOf(msg.sender) >= CLAN_PROPOSAL_THRESHOLD,
            "Insufficient clan tokens"
        );
        _createClanProposal(trait, value);
    }
}
```

### Body Governance Smart Contract
```solidity
contract BodyGovernance {
    struct EconomicParameters {
        uint256 servicePrice;
        uint256 treasuryAllocation;
        mapping(address => bool) authorizedPlugins;
    }
    
    function proposeEconomicChange(
        bytes calldata params
    ) external onlyTokenHolder {
        require(
            getVotingPower(msg.sender) >= proposalThreshold,
            "Insufficient voting power"
        );
        _createEconomicProposal(params);
    }
}
```

## Voting Mechanisms

### Soul Voting
```solidity
contract SoulVoting {
    // Individual NFT Owner (90%)
    function getIndividualVotingPower(
        address owner,
        uint256 agentId
    ) public view returns (uint256) {
        return isNFTOwner(owner, agentId) ? 90 : 0;
    }
    
    // Clan Token Voting (10%)
    function getClanVotingPower(
        address voter
    ) public view returns (uint256) {
        return (clanToken.balanceOf(voter) * 10) / 
               clanToken.totalSupply();
    }
}
```

### Body Voting
```solidity
contract BodyVoting {
    function getVotingPower(
        address voter
    ) public view returns (uint256) {
        return (agentCoin.balanceOf(voter) * 100) / 
               agentCoin.totalSupply();
    }
}
```

## Revenue Distribution

All economic benefits are distributed based on Agent Coin holdings:
- Service revenue
- Plugin licensing fees
- Treasury distributions
- Partnership income

## Security Measures

### Soul Protection
- Clan traits require 67% supermajority of clan token holders
- Individual traits have 24-hour timelock
- Emergency pause by framework DAO

### Economic Protection
- Treasury vesting schedules
- Proposal thresholds
- Liquidity locks
- Anti-manipulation features

## Conclusion

This dual governance system ensures:
1. NFT holders maintain control over Agent identity
2. Clan token holders guide cultural values
3. Economic stakeholders control operational decisions
4. Fair value distribution based on economic participation

The system creates a balanced ecosystem where individual, cultural, and economic interests are protected and aligned.
