document.addEventListener('DOMContentLoaded', () => {
    fetchItems('http://localhost:8080/api/skins/best', 'items-container');
    fetchItems('http://localhost:8080/api/skins/worst', 'more-items-container');
});

function fetchItems(url, containerId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById(containerId);
            data.forEach(item => {
                const price = item.price !== undefined ? item.price.toFixed(2) : 'N/A';
                const priceChange = item.daychange !== undefined ? item.daychange.toFixed(2) : 'N/A';
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                const priceChangeClass = item.daychange < 0 ? 'negative' : '';
                
                itemDiv.innerHTML = `
                    <img src="${item.imageurl}" alt="${item.itemname}">
                    <div class="item-details">
                        <strong>${item.itemname}</strong>
                        <div>Price: $${price}</div>
                        <div class="price-change ${priceChangeClass}">Price Change: ${priceChange}%</div>
                    </div>
                `;
                container.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function handleSearchInput(event) {
    const query = event.target.value;

    if (!query) {
        closeAutocompleteList();
        return;
    }

    fetch(`http://localhost:8080/api/skins/searchitem?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            displayAutocompleteSuggestions(data);
        })
        .catch(error => console.error('Error fetching autocomplete suggestions:', error));
}

function displayAutocompleteSuggestions(suggestions) {
    closeAutocompleteList();
    const list = document.getElementById("autocomplete-list");
    list.innerHTML = "";

    suggestions.forEach(suggestion => {
        const itemDiv = document.createElement("div");
        itemDiv.textContent = suggestion;
        itemDiv.addEventListener("click", () => {
            document.getElementById("search-bar").value = suggestion;
            closeAutocompleteList();
        });
        list.appendChild(itemDiv);
    });
}

function closeAutocompleteList() {
    const list = document.getElementById("autocomplete-list");
    list.innerHTML = "";
}
/*
document.addEventListener("click", function(e) {
    closeAutocompleteList();
});
*/