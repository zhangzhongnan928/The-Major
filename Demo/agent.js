// Wallet Connection
let walletConnected = false;
let userAddress = null;

// Connect wallet button
const connectWalletBtn = document.querySelector('.connect-wallet');
if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', connectWallet);
}

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
        
        // Check access rights and update UI
        checkGovernanceAccess();
        
        // Load user's trading info
        loadTradingInfo();
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

// Trading Functions
async function loadTradingInfo() {
    if (!walletConnected) return;
    
    try {
        // Load user's token balance
        // This would be replaced with actual blockchain calls
        const balance = await getTokenBalance(userAddress);
        
        // Update trading interface
        updateTradingInterface(balance);
    } catch (error) {
        console.error('Error loading trading info:', error);
    }
}

function updateTradingInterface(balance) {
    // Update balance displays
    const balanceElements = document.querySelectorAll('.token-balance');
    balanceElements.forEach(el => {
        el.textContent = `${balance} AGENT`;
    });
    
    // Enable trading buttons if balance > 0
    const sellButtons = document.querySelectorAll('.trade-button');
    sellButtons.forEach(button => {
        if (button.textContent.includes('Sell')) {
            button.disabled = balance <= 0;
        }
    });
}

// Trading form handlers
const tradeForms = document.querySelectorAll('.trade-form');
tradeForms.forEach(form => {
    const amountInput = form.querySelector('input[type="number"]');
    const priceInput = form.querySelector('input[disabled]');
    const tradeButton = form.querySelector('.trade-button');
    
    amountInput.addEventListener('input', async (e) => {
        const amount = parseFloat(e.target.value);
        if (amount > 0) {
            // Calculate price (this would be replaced with actual DEX price calculation)
            const price = await calculatePrice(amount, tradeButton.textContent.includes('Buy'));
            priceInput.value = price;
        } else {
            priceInput.value = '';
        }
    });
    
    tradeButton.addEventListener('click', async () => {
        if (!walletConnected) {
            alert('Please connect your wallet first');
            return;
        }
        
        const amount = parseFloat(amountInput.value);
        const price = parseFloat(priceInput.value);
        
        if (amount <= 0 || isNaN(price)) {
            alert('Please enter a valid amount');
            return;
        }
        
        try {
            // This would be replaced with actual blockchain transaction
            const isBuy = tradeButton.textContent.includes('Buy');
            await executeTrade(amount, price, isBuy);
            
            // Reset form
            amountInput.value = '';
            priceInput.value = '';
            
            // Reload trading info
            loadTradingInfo();
        } catch (error) {
            console.error('Error executing trade:', error);
            alert('Error executing trade. Please try again.');
        }
    });
});

// Governance Access Control
async function checkGovernanceAccess() {
    if (!walletConnected) {
        showAccessDenied();
        return;
    }
    
    try {
        // Check if user is NFT owner or token holder
        const [isNFTOwner, isTokenHolder] = await Promise.all([
            checkNFTOwnership(userAddress),
            checkTokenHolding(userAddress)
        ]);
        
        if (isNFTOwner || isTokenHolder) {
            showGovernanceContent();
            loadGovernanceData();
        } else {
            showAccessDenied();
        }
    } catch (error) {
        console.error('Error checking governance access:', error);
        showAccessDenied();
    }
}

function showAccessDenied() {
    document.querySelector('.portal-access-denied').style.display = 'block';
    document.querySelectorAll('.governance-card').forEach(card => {
        card.style.display = 'none';
    });
}

function showGovernanceContent() {
    document.querySelector('.portal-access-denied').style.display = 'none';
    document.querySelectorAll('.governance-card').forEach(card => {
        card.style.display = 'block';
    });
}

// Governance Data Loading
async function loadGovernanceData() {
    if (!walletConnected) return;
    
    try {
        // Load governance stats
        const stats = await getGovernanceStats(userAddress);
        updateGovernanceStats(stats);
        
        // Load active proposals
        const proposals = await getActiveProposals();
        updateProposalsList(proposals);
        
        // Load agent settings
        const settings = await getAgentSettings();
        updateAgentSettings(settings);
    } catch (error) {
        console.error('Error loading governance data:', error);
    }
}

// Placeholder functions for blockchain interactions
async function getTokenBalance(address) {
    // This would be replaced with actual blockchain call
    return 50000;
}

async function calculatePrice(amount, isBuy) {
    // This would be replaced with actual DEX price calculation
    return amount * (isBuy ? 0.001 : 0.00095);
}

async function executeTrade(amount, price, isBuy) {
    // This would be replaced with actual blockchain transaction
    console.log(`Executing ${isBuy ? 'buy' : 'sell'} trade:`, { amount, price });
    return new Promise(resolve => setTimeout(resolve, 1000));
}

async function checkNFTOwnership(address) {
    // This would be replaced with actual blockchain call
    return false;
}

async function checkTokenHolding(address) {
    // This would be replaced with actual blockchain call
    return true;
}

async function getGovernanceStats(address) {
    // This would be replaced with actual blockchain call
    return {
        totalVotingPower: '1,000,000',
        userVotingPower: '50,000',
        activeProposals: 3
    };
}

async function getActiveProposals() {
    // This would be replaced with actual blockchain call
    return [];
}

async function getAgentSettings() {
    // This would be replaced with actual blockchain call
    return {};
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log

    // Check if wallet is already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
        connectWallet();
    }

    // Initialize Governance Portal Button
    const governanceBtn = document.querySelector('.governance-btn');
    console.log('Found governance button:', governanceBtn); // Debug log

    if (governanceBtn) {
        governanceBtn.onclick = function(e) {
            e.preventDefault();
            console.log('Governance button clicked'); // Debug log
            window.location.href = 'governance.html';
        };
    }
});

// Add styles for the governance button
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .governance-access {
            text-align: center;
        }
        
        .governance-header {
            margin-bottom: 20px;
        }
        
        .governance-header h3 {
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
        }
        
        .governance-header p {
            color: var(--subtle-text);
            font-size: 0.9rem;
            margin-top: 8px;
        }
        
        .governance-btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0 auto;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .governance-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }
    </style>
`); 