document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemname = urlParams.get('item');
    

    if (itemname) {
        fetch(`http://localhost:8080/api/skins/search?item=${encodeURIComponent(itemname)}`)
            .then(response => response.json())
            .then(data => {
                displayItemDetails(data);
            })
            .catch(error => console.error('Error fetching item details:', error));
    } else {
        console.error('No item name provided in query');
    }

    function displayItemDetails(item) {
        const itemContainer = document.getElementById('item-details');
        const price = item.price !== undefined ? item.price.toFixed(2) : 'N/A';
        const priceChange = item.daychange !== undefined ? item.daychange.toFixed(2) : 'N/A';
        itemContainer.innerHTML = `
            <img src="${item.imageurl}" alt="${item.itemname}" style="width: 150px; height: auto;">
            <div>
                <h2>${item.itemname}</h2>
                <p>Price: $${price}</p>
                <p>Price Change: ${priceChange}%</p>
            </div>
        `;
    }
});
