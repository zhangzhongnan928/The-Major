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
document.addEventListener('DOMContentLoaded', () => {
    updateStepDisplay();
    populateNFTGrid();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.querySelector('.back-btn').addEventListener('click', previousStep);
    document.querySelector('.next-btn').addEventListener('click', nextStep);

    // Wallet connection
    document.querySelectorAll('.wallet-option').forEach(option => {
        option.addEventListener('click', connectWallet);
    });

    // Skill category selection
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('click', () => {
            document.querySelector('.skill-category.active').classList.remove('active');
            category.classList.add('active');
            updateSkillsGrid(category.textContent.trim().toLowerCase());
        });
    });

    // Regenerate traits button
    const regenerateBtn = document.querySelector('.regenerate-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            generatedTraits = generateTraits(selectedNFT, {});
            updateTraitsDisplay();
        });
    }
}

// Step navigation
function nextStep() {
    if (currentStep < 5) {
        currentStep++;
        updateStepDisplay();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

// Update display based on current step
function updateStepDisplay() {
    // Update progress bar
    document.querySelectorAll('.progress-step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (stepNum < currentStep) {
            step.classList.add('completed');
        }
    });

    // Update step panels
    document.querySelectorAll('.step-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(`step${currentStep}`).classList.add('active');

    // Update navigation buttons
    document.querySelector('.back-btn').disabled = currentStep === 1;
    document.querySelector('.next-btn').textContent = currentStep === 5 ? 'Transform NFT' : 'Next';
}

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
    document.querySelector('.next-btn').disabled = false;
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