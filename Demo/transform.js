// Sample NFT data
const userNFTs = [
    {
        id: 1,
        name: "BAYC #8697",
        image: "https://placehold.co/300x300/8B5CF6/FFFFFF?text=BAYC+%238697",
        collection: "Bored Ape Yacht Club",
        traits: {
            background: "Army Green",
            fur: "Dark Brown",
            clothes: "Striped Tee",
            eyes: "Bored",
            mouth: "Bored Cigarette"
        }
    },
    {
        id: 2,
        name: "CryptoKitty #1337",
        image: "https://placehold.co/300x300/F472B6/FFFFFF?text=CryptoKitty+%231337",
        collection: "CryptoKitties",
        traits: {
            fur: "Calico",
            pattern: "Luckystripe",
            eye_color: "Topaz",
            accent_color: "Violet"
        }
    }
];

// Collection values (10% fixed traits)
const collectionValues = {
    "Bored Ape Yacht Club": {
        core_values: [
            "Community-driven innovation",
            "Creative expression",
            "Digital ownership rights",
            "Exclusive experiences"
        ],
        personality: "Confident and irreverent, with a strong sense of community and creativity"
    },
    "CryptoKitties": {
        core_values: [
            "Playful innovation",
            "Accessibility",
            "Digital collectibles",
            "Gaming evolution"
        ],
        personality: "Playful and curious, with a focus on fun and accessibility"
    }
};

// Auto-generated traits (40%)
const generateTraits = (nft, walletHistory) => {
    // In a real implementation, this would analyze wallet history and NFT traits
    return {
        values: [
            "Innovation-driven",
            "Community-focused",
            "Creative problem solver"
        ],
        personality_traits: [
            "Analytical thinking",
            "Strategic mindset",
            "Collaborative spirit"
        ]
    };
};

// Skill suggestions based on traits
const suggestSkills = (traits) => {
    return {
        creative: [
            "Digital Art Creation",
            "Content Generation",
            "Meme Creation"
        ],
        trading: [
            "Market Analysis",
            "Token Trading",
            "Portfolio Management"
        ],
        development: [
            "Smart Contract Development",
            "Web3 Integration",
            "DApp Building"
        ]
    };
};

// State management
let currentStep = 1;
let selectedNFT = null;
let generatedTraits = null;
let selectedTraits = [];
let selectedSkills = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Get all step navigation buttons
    const allBackButtons = document.querySelectorAll('.back-btn');
    const allNextButtons = document.querySelectorAll('.next-btn');
    const steps = document.querySelectorAll('.progress-step');
    const panels = document.querySelectorAll('.step-panel');
    const totalSteps = steps.length;

    // Initialize
    updateUI();

    // Add click handlers to all back buttons
    allBackButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateUI();
            }
        });
    });

    // Add click handlers to all next buttons
    allNextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateUI();
            }
        });
    });

    // Handle Agent Coin button click
    document.addEventListener('click', (e) => {
        if (e.target.closest('.agent-coin-btn')) {
            currentStep = 6; // Jump to Agent Coin Issuance step
            updateUI();
        }
    });

    // Update UI based on current step
    function updateUI() {
        console.log('Current step:', currentStep); // Debug log

        // Update progress steps
        steps.forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else if (stepNum < currentStep) {
                step.classList.add('completed');
            }
        });

        // Update panels
        panels.forEach((panel, index) => {
            panel.classList.remove('active');
            if (index + 1 === currentStep) {
                panel.classList.add('active');
            }
        });

        // Update all back buttons
        allBackButtons.forEach(btn => {
            btn.disabled = currentStep === 1;
        });

        // Update all next buttons
        allNextButtons.forEach(btn => {
            if (currentStep === 5) {
                btn.innerHTML = 'Agent Coin <i class="fas fa-coins"></i>';
            } else if (currentStep === totalSteps) {
                btn.innerHTML = 'Launch <i class="fas fa-rocket"></i>';
            } else {
                btn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            }
        });

        // Scroll to top of the new step
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Connect Wallet Button
    const connectWalletBtn = document.querySelector('.connect-wallet');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', () => {
            // Simulate wallet connection
            connectWalletBtn.innerHTML = '<i class="fas fa-circle-check"></i> 0x1234...5678';
            connectWalletBtn.classList.add('connected');
            
            // Move to next step
            if (currentStep === 1) {
                currentStep++;
                updateUI();
            }
        });
    }

    // Wallet option buttons
    document.querySelectorAll('.wallet-option').forEach(option => {
        option.addEventListener('click', () => {
            // Simulate wallet connection
            if (connectWalletBtn) {
                connectWalletBtn.innerHTML = '<i class="fas fa-circle-check"></i> 0x1234...5678';
                connectWalletBtn.classList.add('connected');
            }
            
            // Move to next step
            if (currentStep === 1) {
                currentStep++;
                updateUI();
            }
        });
    });

    // Initialize NFT grid
    populateNFTGrid();

    // Handle investment amount changes
    const investmentInput = document.querySelector('.investment-input input');
    if (investmentInput) {
        investmentInput.addEventListener('input', updateTokenCalculation);
    }

    // Handle Buy SLN button
    const buySLNBtn = document.querySelector('.buy-sln-btn');
    if (buySLNBtn) {
        buySLNBtn.addEventListener('click', () => {
            window.open('https://app.uniswap.org/#/swap', '_blank');
        });
    }

    // Launch Agent and Coin button handler
    const launchButton = document.querySelector('.launch-btn');
    if (launchButton) {
        launchButton.addEventListener('click', async () => {
            try {
                // Here you would typically:
                // 1. Sign the blockchain transaction
                // 2. Wait for confirmation
                // 3. Then redirect to agent page
                
                // For demo purposes, we'll just redirect
                window.location.href = 'agent.html';
            } catch (error) {
                console.error('Error launching agent:', error);
                alert('Error launching agent. Please try again.');
            }
        });
    }

    // Rest of the initialization code...
});

// Populate NFT grid
function populateNFTGrid() {
    const grid = document.querySelector('.nft-grid');
    if (!grid) return;

    userNFTs.forEach(nft => {
        const nftCard = document.createElement('div');
        nftCard.className = 'agent-card';
        nftCard.innerHTML = `
            <img src="${nft.image}" alt="${nft.name}">
            <div class="agent-info">
                <h3>${nft.name}</h3>
                <p>${nft.collection}</p>
            </div>
        `;
        nftCard.addEventListener('click', () => selectNFT(nft));
        grid.appendChild(nftCard);
    });
}

// NFT selection
function selectNFT(nft) {
    selectedNFT = nft;
    document.querySelectorAll('.agent-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // Generate initial traits
    generatedTraits = generateTraits(nft, {});
    
    // Enable next button
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.disabled = false;
    });
}

// Wallet connection simulation
async function connectWallet() {
    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    button.disabled = true;

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    button.innerHTML = originalContent;
    button.classList.add('connected');
    nextStep();
}

// Update traits display
function updateTraitsDisplay() {
    if (!generatedTraits) return;

    const traitsContainer = document.querySelector('.personality-traits');
    if (!traitsContainer) return;

    traitsContainer.innerHTML = `
        <h3>Generated Traits</h3>
        <div class="trait-chips">
            ${generatedTraits.values.map(trait => `
                <div class="trait-chip">${trait}</div>
            `).join('')}
        </div>
    `;
}

// Update skills grid
function updateSkillsGrid(category) {
    const grid = document.querySelector('.skills-grid');
    if (!grid) return;

    const skills = suggestSkills(generatedTraits)[category] || [];
    grid.innerHTML = skills.map(skill => `
        <div class="trait-card">
            <h4>${skill}</h4>
            <p>Suggested based on your agent's traits</p>
        </div>
    `).join('');
}

// Update token calculation based on investment amount
function updateTokenCalculation() {
    const investmentAmount = parseFloat(this.value) || 0;
    const tokenPrice = 0.0001; // SLN per token
    const tokensToReceive = Math.floor(investmentAmount / tokenPrice).toLocaleString();
    
    const tokensElement = document.querySelector('.info-value:last-child');
    if (tokensElement) {
        tokensElement.textContent = tokensToReceive;
    }
} 