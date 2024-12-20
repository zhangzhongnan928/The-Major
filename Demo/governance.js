// Wallet Connection
let walletConnected = false;
let userAddress = null;

// Connect wallet button
const connectWalletBtn = document.querySelector('.connect-wallet');
connectWalletBtn.addEventListener('click', connectWallet);

async function connectWallet() {
    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress = accounts[0];
        walletConnected = true;
        
        // Update UI
        connectWalletBtn.innerHTML = `
            <i class="fas fa-wallet"></i>
            ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}
        `;
        
        // Load governance data
        loadGovernanceData();
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

// Load governance data
async function loadGovernanceData() {
    if (!walletConnected) return;
    
    try {
        // Load voting power
        const votingPower = await getVotingPower(userAddress);
        updateVotingPower(votingPower);
        
        // Load proposals
        const proposals = await getProposals();
        updateProposals(proposals);
        
        // Load treasury
        const treasury = await getTreasury();
        updateTreasury(treasury);
    } catch (error) {
        console.error('Error loading governance data:', error);
    }
}

// Vote on proposal
async function vote(proposalId, support) {
    if (!walletConnected) {
        alert('Please connect your wallet to vote');
        return;
    }
    
    try {
        // Submit vote transaction
        await submitVote(proposalId, support);
        
        // Reload governance data
        loadGovernanceData();
    } catch (error) {
        console.error('Error voting:', error);
        alert('Error submitting vote. Please try again.');
    }
}

// Create proposal
async function createProposal() {
    if (!walletConnected) {
        alert('Please connect your wallet to create a proposal');
        return;
    }
    
    // Show proposal creation modal
    showProposalModal();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check if wallet is already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
        connectWallet();
    }
    
    // Add click handlers for vote buttons
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const proposalCard = e.target.closest('.proposal-card');
            const proposalId = proposalCard.dataset.proposalId;
            const support = e.target.classList.contains('for');
            vote(proposalId, support);
        });
    });
    
    // Create proposal button
    const createProposalBtn = document.querySelector('.create-proposal-btn');
    if (createProposalBtn) {
        createProposalBtn.addEventListener('click', createProposal);
    }
    
    // Edit settings buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const settingItem = e.target.closest('.setting-item');
            const settingName = settingItem.querySelector('h4').textContent;
            showSettingModal(settingName);
        });
    });
});

// Placeholder functions for blockchain interactions
async function getVotingPower(address) {
    return 50000;
}

async function getProposals() {
    return [
        {
            id: 1,
            title: 'Update Agent Trading Strategy',
            description: 'Implement a new trading strategy focusing on DeFi opportunities and yield farming.',
            status: 'active',
            votesFor: 65,
            votesAgainst: 35,
            timeLeft: '2 days'
        },
        {
            id: 2,
            title: 'Add New Revenue Stream',
            description: 'Integrate NFT lending protocol to generate additional yield for token holders.',
            status: 'active',
            votesFor: 78,
            votesAgainst: 22,
            timeLeft: '4 days'
        }
    ];
}

async function getTreasury() {
    return {
        BAYC8697: '300,000,000',
        SLN: '50,000',
        ETH: '25.5'
    };
}

async function submitVote(proposalId, support) {
    // This would be replaced with actual blockchain transaction
    console.log(`Voting ${support ? 'for' : 'against'} proposal ${proposalId}`);
    return new Promise(resolve => setTimeout(resolve, 1000));
}

// UI update functions
function updateVotingPower(power) {
    const votingPowerElement = document.querySelector('.governance-stats .value');
    if (votingPowerElement) {
        votingPowerElement.textContent = `${power.toLocaleString()} BAYC8697`;
    }
}

function updateProposals(proposals) {
    // Update proposals list
    const proposalsList = document.querySelector('.proposals-list');
    if (!proposalsList) return;
    
    // Update proposal cards...
}

function updateTreasury(treasury) {
    // Update treasury balances
    Object.entries(treasury).forEach(([token, amount]) => {
        const balanceElement = document.querySelector(`.treasury-balance .${token.toLowerCase()}`);
        if (balanceElement) {
            balanceElement.textContent = amount;
        }
    });
}

// Modal functions
function showProposalModal() {
    // Show proposal creation modal
    alert('Proposal creation modal coming soon!');
}

function showSettingModal(settingName) {
    // Show setting edit modal
    alert(`${settingName} edit modal coming soon!`);
} 