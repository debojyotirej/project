
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");
const showMoreButton = document.getElementById("show-more-button");

const apiKey = "puUPAKS7NntAxymT7B2MV0Uaxse6S0Kehe8HzcfgBEyCorovInivTdvz";
const perPage = 15;
let page = 1;

const getImages = (query) => {
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`;
    
    fetch(apiUrl, {
        headers: {
            Authorization: apiKey
        }
    })
    .then((response) => response.json())
    .then((data) => {
        const photos = data.photos;

        if (photos.length > 0) {
            photos.forEach((photo) => {
                // Create HTML elements to display the photos (you can customize this part)
                const imageElement = document.createElement("img");
                imageElement.src = photo.src.medium;
                searchResults.appendChild(imageElement);
                
            });
            

            showMoreButton.addEventListener("click",()=>{
                page++;
                getImages(query);
                
            })
          
        } else {
            // No more results to show
            showMoreButton.disabled = true;
           
        }
    })
    .catch((error) => {
        console.error("An error occurred:", error);
    });
};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    searchResults.innerHTML = ""; // Clear previous search results
    page = 1; // Reset the page to 1
    showMoreButton.disabled = false; // Enable the "Load More" button

    const query = searchBox.value;
    getImages(query);
});

showMoreButton.addEventListener("click", () => {
    const query = searchBox.value;
    getImages(query);
});
