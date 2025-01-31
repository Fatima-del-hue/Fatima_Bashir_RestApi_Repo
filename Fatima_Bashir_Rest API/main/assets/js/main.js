// event listner for click on search button
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchButton").addEventListener("click", lookupTerm);
});

async function lookupTerm() {
    // get imput in the term
    const term = document.getElementById('term').value.trim();
    // if enter is pressed on empty show alert
    if (!term) {
        alert('Please enter a term.');
        return;
    }

    const KeyUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=3ba057ce-13b7-4e33-8c9c-a2fe8737d53a`;

    // get the deifnation tag in a variable 
    let defi = document.getElementById('definition');

    try {
        // Fetch data from the API
        const response = await fetch(KeyUrl);
        const data = await response.json();

        // to display the response we got
        console.log( data );

        // If a definition exists, display the first one 
        // shortdef is where the first defination is placed in api
        if (data.length > 0 && data[0].shortdef) {
            defi.innerHTML = `<span style="font-weight: bold;">Definition:</span> ${data[0].shortdef[0]}`;
        } else {
            // if there exist no defination display this
            defi.innerHTML = 'No definition found.';
        }
    } catch (error) {
        // display error if something doesnt work
        defi.innerHTML = 'Error fetching definition.';
        console.error('Error:', error);
    }
}
