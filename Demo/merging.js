document.addEventListener('DOMContentLoaded', function() {
    // Filter dropdown functionality
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // Add dropdown menu functionality here
            console.log('Filter clicked');
        });
    }

    // Create New Merge button functionality
    const createBtn = document.querySelector('.create-agent-btn');
    if (createBtn) {
        createBtn.addEventListener('click', function() {
            // Add create new merge functionality here
            console.log('Create new merge clicked');
        });
    }

    // Make table rows clickable
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            const collectionName = this.querySelector('.collection-name').textContent;
            // Navigate to collection detail page
            console.log(`Clicked on ${collectionName}`);
        });
        
        // Add cursor pointer on hover
        row.style.cursor = 'pointer';
    });

    // Update remaining time periodically
    function updateRemainingTime() {
        const timeElements = document.querySelectorAll('.time-remaining');
        timeElements.forEach(element => {
            // Here you would implement the actual time calculation
            // For now, we'll just log that it's being updated
            console.log('Updating remaining time for', element.textContent);
        });
    }

    // Update time every minute
    setInterval(updateRemainingTime, 60000);

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const tableRows = document.querySelectorAll('.table-row');
            
            tableRows.forEach(row => {
                const collectionName = row.querySelector('.collection-name').textContent.toLowerCase();
                const tokenSymbol = row.querySelector('.token-symbol').textContent.toLowerCase();
                
                if (collectionName.includes(searchTerm) || tokenSymbol.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}); 