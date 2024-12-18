# NFT Agent Economy: Dual Governance System (Soul & Body)

## Overview

The Sentient Spectrum implements a unique dual governance system that separates the control of an Agent's soul (identity/personality) from its body (economic operations). This design ensures both cultural preservation and economic efficiency.

## Soul Governance (Identity & Personality)

### Distribution of Soul Control
- Individual NFT Owner: 90% control
- Collection-wide NFT Holders: 10% control

### Individual NFT Owner Rights (90%)
Controls:
- Agent personality traits
- Service type decisions
- Visual representation
- Behavioral parameters
- Plugin selection/integration

### Collection-Wide Control (10%)
All NFT holders from the same collection collectively govern:
- Core collection values
- Base personality traits
- Cultural standards
- Cross-Agent behavioral protocols

## Body Governance (Economic Operations)

### Token Holder Control
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
        uint256 nftId;
        mapping(string => string) personalityTraits;
        mapping(string => bool) collectionTraits;
    }
    
    // Individual NFT Owner Controls (90%)
    function updatePersonalityTraits(
        uint256 agentId,
        string[] memory traits,
        string[] memory values
    ) external onlyNFTOwner(agentId) {
        require(!isCollectionTrait(traits), "Cannot modify collection traits");
        _updateTraits(agentId, traits, values);
    }
    
    // Collection-Wide Controls (10%)
    function proposeCollectionTrait(
        string memory trait,
        string memory value
    ) external onlyCollectionNFTHolder {
        _createCollectionProposal(trait, value);
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
    
    // Collection-wide Voting (10%)
    function getCollectionVotingPower(
        address voter
    ) public view returns (uint256) {
        return (collectionNFT.balanceOf(voter) * 10) / 
               collectionNFT.totalSupply();
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
- Collection traits require 67% supermajority
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
2. Economic stakeholders control operational decisions
3. Collection values remain consistent
4. Fair value distribution based on economic participation

The system creates a balanced ecosystem where both cultural and economic interests are protected and aligned.
