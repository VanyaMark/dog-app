const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector('.breeds');
const img = document.querySelector('.dog-img');
const dogImgTitle = document.querySelector('.dog-img-title');
const loader = document.querySelector('.loader');

// Fetch the list of all dog breeds from the Dog CEO API and populate the <select> dropdown
fetch(BREEDS_URL)
    .then(response => {
        // Convert the API response to JSON format
        return response.json();
    })
    .then(data => {
        // Extract the breeds object from the API response
        const breedsObject = data.message;
        // Get an array of breed names from the object keys
        const breedsArray = Object.keys(breedsObject);

        // Iterate through the array of breeds and create <option> elements for each breed
        for (let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option');
            // Set the value and inner text of each option to the breed name
            option.value = breedsArray[i];
            option.innerText = breedsArray[i];
            // Append each option to the <select> dropdown
            select.appendChild(option);
        }
    });

// Listen for changes in the <select> dropdown and update the dog image based on the selected breed
select.addEventListener('change', event => {
    // Get the value of the selected breed from the event object
    let selectedBreed = event.target.value;
    // Fetch and display a random image of the selected breed
    getDoggo(selectedBreed);
});

// Fetch a random image of the selected breed from the Dog CEO API and update the page
const getDoggo = selectedBreed => {
    // Construct the API URL for fetching a random image of the selected breed
    let url = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;

    // Show the loader and hide the previous dog image while the new image is being fetched
    loader.classList.add('show');
    img.classList.remove('show');

    // Fetch the image from the API
    fetch(url)
        .then(response => {
            // Convert the API response to JSON format
            return response.json();
        })
        .then(data => {
            // Set the <img> src to the fetched dog image URL
            img.src = data.message;
        });
    
    // Update the image title with the selected breed name in uppercase
    dogImgTitle.innerHTML = selectedBreed.toUpperCase();
};

// Hide the loader and show the new dog image once it has fully loaded
img.addEventListener('load', () => {
    loader.classList.remove('show');
    img.classList.add('show');
});