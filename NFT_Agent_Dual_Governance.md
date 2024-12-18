# NFT Agent Economy: Dual Governance System (Soul & Body)

## Overview

This system splits an Agent's governance into two parts:
- Soul (Identity & Values): Controlled by NFT holders and Clan coin holders
- Body (Economic Operations): Controlled by Agent coin holders

By separating cultural identity from economic incentives, each stakeholder group influences what they value most. NFT holders and Clan coin holders shape the soul, while Agent coin holders steer the economic body.

## Clan Coin Distribution & Role

### Existing Clan Coin Collections
If the NFT collection already has Clan coin, no new issuance is needed. The existing Clan coin is used both to influence the shared cultural values (10%) of the Agents' souls and to govern the Clan pool that holds 5% of each Agent's Agent coin.

### No Existing Clan Coin
If no Clan coin exists, a new batch is issued when an NFT upgrades into an Agent, allocated to the NFT owner. This new Clan coin serves the same function: maintaining 10% soul governance and governing the Clan pool.

## Agent Coin Distribution

Each successfully upgraded Agent issues Agent coin (77M tokens) as follows:
- 5% to the Clan pool (governed by Clan coin holders)
- 25% retained by the Agent itself
- 70% made available for public sale, with the NFT owner having priority purchase rights

## Governance Structure

### Soul Governance (90% NFT / 10% Clan)

### Distribution of Soul Control
- Individual NFT Owner: 90% control
- Clan Token Holders: 10% control (Previously collection-wide NFT holders)

### Individual NFT Owner Rights (90%)
Controls:
- Agent personality traits
- Service type decisions
- Visual representation
- Behavioral parameters
- Plugin selection/integration

### Clan Token Control (10%)
Clan coin holders collectively govern:
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
