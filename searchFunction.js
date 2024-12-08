console.log('Search script loaded');

const siteData = [
    { title: 'About Me', url: 'aboutMe.html', keywords: ['about', 'personal', 'info', 'school', 'name'] },
    { title: 'Portfolio', url: 'Portfolio-Page.html', keywords: ['projects', 'work', 'portfolio'] },
    { title: 'Main Page', url: 'index.html', keywords: ['contact', 'email', 'message', 'home'] }
];


localStorage.setItem('siteData', JSON.stringify(siteData));

document.querySelector('input[type="search"]').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const storedData = JSON.parse(localStorage.getItem('siteData')) || [];
    
    if (searchTerm.length < 1) {
        hideSearchResults();
        return;
    }

    const results = storedData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) || 
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
    
    displayResults(results);
});

function displayResults(results) {
    // Create results container if it doesn't exist
    let resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'searchResults';
        document.querySelector('input[type="search"]').after(resultsContainer);
    }
    
    // Style the results container
    resultsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        width: 300px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
    `;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="padding: 10px;">No results found</p>';
        return;
    }
    
    resultsContainer.innerHTML = results.map(item => `
        <a href="${item.url}" style="
            display: block;
            padding: 10px;
            text-decoration: none;
            color: navy;
            border-bottom: 1px solid #eee;
        ">
            ${item.title}
        </a>
    `).join('');
}

function hideSearchResults() {
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('#searchResults') && !e.target.closest('input[type="search"]')) {
        hideSearchResults();
    }
});