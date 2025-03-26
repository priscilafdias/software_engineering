document.addEventListener("DOMContentLoaded", function () {
    const filterForm = document.getElementById("filter-form");
    const outfits = document.querySelectorAll(".outfit-card");

    // Event listener for the filter form submission
    filterForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent page reload on form submit

        // Get selected filter values
        const category = document.getElementById("category").value;
        const itemName = document.getElementById("item-name").value;
        const size = document.getElementById("size").value;

        // Loop through each outfit card
        outfits.forEach(outfit => {
            const outfitCategory = outfit.getAttribute("data-category");
            const outfitSize = outfit.getAttribute("data-size");
            const outfitName = outfit.getAttribute("data-name");

            // Check if outfit matches the selected filters
            const categoryMatch = (category === "" || outfitCategory === category);
            const nameMatch = (itemName === "" || outfitName === itemName);
            const sizeMatch = (size === "" || outfitSize === size);

            // If all selected filters match, display the outfit, otherwise hide it
            if (categoryMatch && nameMatch && sizeMatch) {
                outfit.style.display = "block"; // Show matching outfit
                outfit.classList.add("filtered-outfit");
            } else {
                outfit.style.display = "none"; // Hide non-matching outfit
                outfit.classList.remove("filtered-outfit");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const outfitCards = document.querySelectorAll(".outfit-card");

    outfitCards.forEach(card => {
        card.addEventListener("click", function () {
            const outfitId = card.getAttribute("data-id"); // Get the correct ID
            if (outfitId) {
                window.location.href = `/detail-outfit/${outfitId}`; // ✅ Redirect correctly
            } else {
                console.error("Outfit ID is missing!");
            }
        });
    });
});

