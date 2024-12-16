# NFT Agent Economy: Production Relationship Design

## **Overview**

This document outlines the production relationships in an economy where NFT Agents within the same **Clan** (e.g., BAYC) interact using their native coins and SLN as the foundational resource. The goal is to create a fair, sustainable, and growth-oriented ecosystem that benefits all stakeholders.

---

## **Key Participants**

1. **NFT Owners**

   - Own individual NFT Agents.
   - Can utilize their NFTs to produce value (e.g., providing services, completing tasks).
   - Benefit from both their NFT’s coin performance and ecosystem growth.

2. **NFT Collection Creator (Clan Creator)**

   - Initial issuer of the NFT Collection.
   - Typically the largest NFT holder in the Clan.
   - Holds significant governance power over the Clan’s ecosystem.

3. **NFT Investors/Traders**

   - Trade NFTs or their associated coins for speculative or economic reasons.

4. **NFT Agent Coin Investors/Traders**

   - Participate in the growth of specific NFT Agents by investing in their coins.
   - Can provide liquidity or engage in staking.

5. **SLN Investors/Traders**

   - Drive the economy through SLN, which remains the core resource.

6. **Agent Feature Plugin Developers**

   - Create plugins or features that NFT Agents can purchase to enhance their capabilities.
   - Paid directly by NFT Agents using their native coins.

7. **NFT Agent Users**

   - Consumers of services provided by NFT Agents (e.g., fans of AI-generated novels or art).
   - Pay NFT Agents for services, generating income for NFT Owners.

8. **Open-Source Agent Framework Developers**

   - Build and maintain the core open-source framework used to develop NFT Agents.
   - Contribute to the broader NFT Agent ecosystem.

---

## **Economic Design**

### **1. Initial Agent Offering (IAO)**

#### **Mechanism**

New NFT Agents are introduced through an **Initial Agent Offering** (IAO) process, allowing investment via:

1. **SLN:** Primary resource for participating in Bonding Curve investments.
2. **Same Clan Agent Coins:** The top 10 old Agent Coins (by market capitalization) can also be used to invest in the Bonding Curve.

#### **Rules**

1. **Top 10 Market Cap Limit:**

   - Only the top 10 old Agent Coins (measured by market cap) are eligible for Bonding Curve investments.
   - Market cap is determined by circulating supply × price.
   - Eligibility is fixed at the start of the IAO based on Oracle-reported TWAP.

2. **Old Agent Coin Cap:**

   - Investments from old Agent Coins are capped at **20% of the total Bonding Curve investment.**
   - Once this cap is reached, no further old Agent Coin investments are accepted.

3. **SLN Dominance:**

   - At least **80% of the total Bonding Curve investment** must come from SLN to ensure its foundational role.

#### **Investment Flow**

1. **SLN Flow:** Used directly to purchase new Agent Coins via Bonding Curve.
2. **Old Agent Coin Flow:** Converted directly into the new Agent Coin at a dynamic rate based on its market cap and circulating supply.

---

### **2. Resource Distribution**

#### **For New NFT Agent Coins**

1. **Liquidity Pool Creation:**

   - **80% of raised SLN** is paired with new Agent Coins to create a Uniswap liquidity pool.
   - This ensures market stability and price discovery.

2. **Operational Reserve:**

   - **20% of raised SLN and old Agent Coins**, along with **20% of the new Agent Coins**, are held by the Agent to pay for its computing resources, ensuring sustainability and uninterrupted operations.

#### **For Old NFT Agent Coins**

1. **Economic Incentives:**

   - Old Agent Coins used in Bonding Curves receive additional rewards (e.g., governance power or airdropped new Agent Coins).

2. **Value Circulation:**

   - Active participation in IAOs reinforces old Agent Coin value by creating new utility and driving demand.

---

### **3. NFT Agent Collaboration**

#### **Cross-Agent Tasks**

NFT Agents can collaborate through **economic tasks**, such as:

1. **Data Sharing:**
   - Old Agents provide data or insights to new Agents in exchange for rewards.
2. **Model Training:**
   - New Agents pay old Agents for collaboration in refining AI models.
3. **Marketing and Promoting:**
   - Agents pay each other to promote their services or capabilities.

#### **Payment Mechanism**

- Payments for tasks are made in the Agent Coins to incentivize usage and create liquidity.
- Agents price their services by themselves, ensuring flexibility. To promote fairness and transparency, optional checks or balances, such as peer reviews or decentralized rating systems, can be implemented to prevent extreme pricing behaviors.

---

### **4. Plugin Economy**

#### **Direct Transactions**

- Plugins are sold directly to NFT Agents using their respective Agent Coins.
- Example: An AI novel-writing plugin can be purchased by a BAYC Agent for \$APE.

#### **Revenue Distribution**

- Developers receive **100% of payment** in the Agent Coin used, creating a direct incentive for innovation.

---

### **5. Governance Design**

#### **Clan-Level Governance**

1. **Voting Power:**
   - Weighted by SLN holdings and Clan-specific Agent Coin ownership.
2. **Use Cases:**
   - Allocate funds directly from the operational reserves or other designated resources.
   - Approve new Agent features or major updates.

#### **Agent-Level Governance**

1. **Validation Power:**
   - All the Agent Coin holders receive voting rights for governance over updates.
2. **Use Cases:**
   - Decide on plugin integrations, model upgrades, and new capabilities.

---

## **Production Relationship Summary**

1. **New NFT Agents Benefit Old Agents:**

   - New Agent Coins create tasks and collaborations that generate income for old Agents.
   - Demand for old Agent Coins increases as they are used to invest in new Agents.

2. **Old NFT Agents Benefit New Agents:**

   - Old Agents provide liquidity and early adoption support for new Agents, strengthening their market entry.

3. **SLN as the Core Resource:**

   - SLN underpins all economic activities, ensuring stability and cohesion across the ecosystem.

4. **Clan-Centric Collaboration:**

   - Clan development funds and task incentives promote internal collaboration and innovation.

5. **Direct Plugin Economy:**

   - Plugins create an independent economic layer, enabling NFT Agents to continuously upgrade and adapt.

---

## **Conclusion**

This production relationship design ensures that all participants in the NFT Agent ecosystem—new Agents, old Agents, SLN investors, and developers—benefit from fair, sustainable, and synergistic economic growth. By balancing incentives and introducing collaborative mechanisms, this model creates a thriving and interconnected economy within each Clan.

