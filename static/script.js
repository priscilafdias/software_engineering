document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.getElementById("profile-btn");
    const profileMenu = document.getElementById("profile-menu");

    const browseBtn = document.getElementById("browse-btn");
    const browseMenu = document.querySelector("#browse-dropdown .dropdown-menu");

    // ✅ Function to toggle a dropdown and close the other
    function toggleDropdown(menu, otherMenu) {
        if (menu.style.display === "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
            otherMenu.style.display = "none"; // Close the other dropdown
        }
    }

    // ✅ Click on Profile Icon
    profileBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent immediate close
        toggleDropdown(profileMenu, browseMenu);
    });

    // ✅ Click on Browse Button
    browseBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleDropdown(browseMenu, profileMenu);
    });

    // ✅ Click anywhere else (closes both dropdowns)
    document.addEventListener("click", function (event) {
        if (!profileBtn.contains(event.target) && !profileMenu.contains(event.target) &&
            !browseBtn.contains(event.target) && !browseMenu.contains(event.target)) {
            closeAllDropdowns();
        }
    });

    // ✅ Click inside a dropdown link also closes it
    document.querySelectorAll(".dropdown-menu li a").forEach((item) => {
        item.addEventListener("click", function () {
            closeAllDropdowns();
        });
    });

    // ✅ Function to close all dropdowns
    function closeAllDropdowns() {
        profileMenu.style.display = "none";
        browseMenu.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    // ✅ Toggle Mobile Menu (Hamburger)
    menuIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent closing when clicking the icon
        navLinks.classList.toggle("active");
    });

    // ✅ Close Mobile Menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuIcon.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("active");
        }
    });

    // ✅ Prevent clicks inside menu from closing it
    navLinks.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get dropdown menu links
    const donateLink = document.getElementById("donate-link");
    const shareLink = document.getElementById("share-link");
    const sellLink = document.getElementById("sell-link");

    // Add click event listeners
    donateLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent page reload
        openUploadForm("Donate");
    });

    shareLink.addEventListener("click", function (event) {
        event.preventDefault();
        openUploadForm("Share");
    });

    sellLink.addEventListener("click", function (event) {
        event.preventDefault();
        openUploadForm("Sell");
    });
});

// Function to open the upload form
function openUploadForm(action) {
    document.getElementById("upload-form").classList.remove("hidden");
    document.getElementById("upload-title").textContent = `Upload Your Item - ${action}`;

    // Show or hide price field based on action
    const priceField = document.getElementById("price-field");
    if (action === "Sell") {
        priceField.style.display = "block";
    } else {
        priceField.style.display = "none";
    }
}

// Function to close the upload form
function closeUploadForm() {
    document.getElementById("upload-form").classList.add("hidden");
}


document.getElementById("profile-link").addEventListener("click", function (event) {
    event.preventDefault(); // Prevents default anchor behavior
    window.location.href = "profile"; // Redirects to profile page
});

// ✅ Function to filter outfits based on user selection
document.addEventListener("DOMContentLoaded", function () {
    const filterForm = document.getElementById("filter-form");
    const outfitCards = document.querySelectorAll(".outfit-card");

    filterForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reloading

        // Getting filter values
        const selectedCategory = document.getElementById("category").value;
        const selectedItem = document.getElementById("item-name").value;
        const selectedSize = document.getElementById("size").value;

        // Iterating over the outfit cards to show only the filtered ones
        outfitCards.forEach(card => {
            const cardCategory = card.getAttribute("data-category");
            const cardItem = card.getAttribute("data-name");
            const cardSize = card.getAttribute("data-size");

            // Check if the outfit meets the applied filters
            const categoryMatch = !selectedCategory || cardCategory === selectedCategory;
            const itemMatch = !selectedItem || cardItem === selectedItem;
            const sizeMatch = !selectedSize || cardSize === selectedSize;

            if (categoryMatch && itemMatch && sizeMatch) {
                card.style.display = "block"; // Show the card
            } else {
                card.style.display = "none"; // Hide the card
            }
        });
    });
});