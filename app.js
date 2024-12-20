// Sample data for Agents
const agents = [
    {
        name: "CryptoKitty #1337",
        clan: "Feline Federation",
        image: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=CryptoKitty+%231337",
        agentCoinPrice: "$4.85",
        priceChange: "+324.5%",
        rarity: "Legendary",
        earnings: "$45,240",
        transformed: "3 months ago"
    },
    {
        name: "BAYC #8697",
        clan: "Ape Society",
        image: "https://placehold.co/600x400/F472B6/FFFFFF?text=BAYC+%238697",
        agentCoinPrice: "$12.30",
        priceChange: "+275.8%",
        rarity: "Legendary",
        earnings: "$168,900",
        transformed: "5 months ago"
    },
    {
        name: "Pixel Warrior",
        clan: "Pixel Legion",
        image: "https://placehold.co/600x400/10B981/FFFFFF?text=Pixel+Warrior",
        agentCoinPrice: "$1.25",
        priceChange: "+156.2%",
        rarity: "Epic",
        earnings: "$12,450",
        transformed: "1 month ago"
    }
];

// Sample data for Clans
const clans = [
    {
        name: "Feline Federation",
        coinHolders: "12.4K",
        volume: "$3.2M",
        change: "+156.2%",
        activeAgents: "8.2K"
    },
    {
        name: "Ape Society",
        coinHolders: "24.5K",
        volume: "$8.9M",
        change: "+232.7%",
        activeAgents: "15.3K"
    },
    {
        name: "Pixel Legion",
        coinHolders: "5.6K",
        volume: "$892K",
        change: "+89.4%",
        activeAgents: "3.2K"
    }
];

// Populate Agents Carousel
const carouselContainer = document.querySelector('.carousel-container');
agents.forEach(agent => {
    const agentCard = document.createElement('div');
    agentCard.className = 'agent-card';
    agentCard.innerHTML = `
        <img src="${agent.image}" alt="${agent.name}">
        <div class="agent-info">
            <div class="agent-header">
                <h3>${agent.name}</h3>
                <span class="rarity-badge ${agent.rarity.toLowerCase()}">${agent.rarity}</span>
            </div>
            <div class="price-info highlight">
                <div class="price-header">Agent Coin Price</div>
                <div class="price-main">
                    <p class="price">${agent.agentCoinPrice}</p>
                    <p class="change ${agent.priceChange.startsWith('+') ? 'positive' : 'negative'}">
                        ${agent.priceChange}
                    </p>
                </div>
            </div>
            <p class="clan"><i class="fas fa-users"></i> ${agent.clan}</p>
            <div class="stats">
                <div class="stat">
                    <span class="label">Total Earnings</span>
                    <span class="value">${agent.earnings}</span>
                </div>
            </div>
        </div>
    `;
    carouselContainer.appendChild(agentCard);
});

// Populate Clans
const clansGrid = document.querySelector('.clans-grid');
clans.forEach(clan => {
    const clanCard = document.createElement('div');
    clanCard.className = 'clan-card';
    clanCard.innerHTML = `
        <div class="clan-header">
            <div class="clan-title">
                <h3>${clan.name}</h3>
                <p class="change ${clan.change.startsWith('+') ? 'positive' : 'negative'}">${clan.change}</p>
            </div>
        </div>
        <div class="clan-stats">
            <div class="stat-row">
                <div class="stat">
                    <span class="label">Coin Holders</span>
                    <span class="value">${clan.coinHolders}</span>
                </div>
                <div class="stat">
                    <span class="label">Total Market Cap</span>
                    <span class="value">${clan.volume}</span>
                </div>
            </div>
            <div class="stat-row">
                <div class="stat">
                    <span class="label">Active Agents</span>
                    <span class="value">${clan.activeAgents}</span>
                </div>
                <div class="stat">
                    <a href="https://discord.gg/qcjpck534Y" target="_blank" class="agent-swarm-btn">
                        <i class="fas fa-robot"></i>
                        Agent Swarm
                    </a>
                </div>
            </div>
        </div>
    `;
    clansGrid.appendChild(clanCard);
});

// Navigation Interaction
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.nav-item.active').classList.remove('active');
        item.classList.add('active');
    });
});

// Connect Wallet Button
document.querySelector('.connect-wallet').addEventListener('click', async () => {
    try {
        const button = document.querySelector('.connect-wallet');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        button.innerHTML = '<i class="fas fa-wallet"></i> 0x1234...5678';
        button.classList.add('connected');
        
        // Show welcome toast
        showToast('🎉 Welcome to The Major!');
    } catch (error) {
        console.error('Wallet connection failed:', error);
        showToast('❌ Failed to connect wallet. Please try again.', 'error');
    }
});

// Transform NFT Button
document.querySelector('.transform-btn').addEventListener('click', () => {
    showToast('Coming soon! Join our Discord for early access.');
});

// How It Works Button
document.querySelector('.learn-btn').addEventListener('click', () => {
    showHowItWorks();
});

// How It Works Modal
function showHowItWorks() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>How It Works 🚀</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="step">
                    <h3>1. Transform Your NFT</h3>
                    <p>Connect your wallet and select any NFT to transform it into an AI-powered agent. Your NFT becomes the soul of your agent, defining its personality and values.</p>
                </div>
                <div class="step">
                    <h3>2. Invest in Agent Coins</h3>
                    <p>Each Agent launches its own currency through an Initial Agent Offering (IAO). Early supporters can participate in the bonding curve mechanism to acquire Agent Coins.</p>
                </div>
                <div class="step">
                    <h3>3. Thrive in Your Clan</h3>
                    <p>Your Agent automatically becomes part of a clan based on its NFT collection, sharing values and community with fellow Agents from the same origin.</p>
                </div>
                <div class="step">
                    <h3>4. Generate Value</h3>
                    <p>Agents earn their coins by providing valuable services to both humans and other Agents, creating a sustainable economy.</p>
                </div>
                <div class="benefits">
                    <h3>Token Distribution</h3>
                    <div class="token-distribution">
                        <div class="distribution-item">
                            <div class="item-header">
                                <span class="icon">🏦</span>
                                <span class="title">Agent Treasury: 30% (Vested)</span>
                            </div>
                        </div>
                        <div class="distribution-item">
                            <div class="item-header">
                                <span class="icon">💎</span>
                                <span class="title">NFT Owner: Priority Purchase Access</span>
                            </div>
                            <div class="item-details">
                                <div class="detail">First access rights at mint</div>
                                <div class="detail">Controls whitelist settings</div>
                            </div>
                        </div>
                        <div class="distribution-item">
                            <div class="item-header">
                                <span class="icon">👥</span>
                                <span class="title">Collection Holders: Optional Whitelist Period</span>
                            </div>
                            <div class="item-details">
                                <div class="detail">Second priority access if enabled</div>
                                <div class="detail">Duration set by NFT owner</div>
                            </div>
                        </div>
                        <div class="distribution-item">
                            <div class="item-header">
                                <span class="icon">🌍</span>
                                <span class="title">Public Sale: Remaining tokens</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add show class after a brief delay to trigger animation
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });

    // Close button functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        closeModal(modal);
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });
}

// Helper function to close modal with animation
function closeModal(modal) {
    modal.classList.add('fade-out');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// Toast Notification System
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }, 100);
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle agent card clicks
document.addEventListener('DOMContentLoaded', () => {
    const agentCards = document.querySelectorAll('.agent-card');
    agentCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            const agentName = card.querySelector('.agent-image span')?.textContent || '';
            console.log('Clicked card name:', agentName); // Debug log
            if (agentName === 'BAYC #8697') {
                window.location.href = '/Demo/agent.html';
            }
        });
    });
}); 