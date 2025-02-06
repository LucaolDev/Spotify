const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const gridContainer = document.querySelector("#result-artist .grid-container");

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`; // Pega todos os artistas
    
    fetch(url)
        .then(response => response.json())
        .then(result => {
            // Filtra os artistas pelo nome que contenha o termo pesquisado
            const filteredResults = result.filter(artist => 
                artist.name.toLowerCase().includes(searchTerm)
            );
            displayResults(filteredResults);
        })
        .catch(error => console.error("Erro ao buscar artistas:", error));
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");

    // Limpa os resultados anteriores
    gridContainer.innerHTML = "";

    if (result.length === 0) {
        gridContainer.innerHTML = "<p>Nenhum artista encontrado.</p>";
        return;
    }

    result.forEach(element => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${element.urlImg}" alt="${element.name}">
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <a title="Artista" class="vst" href="#">${element.name}</a>
                <span class="artist-categorie">Artista</span>
            </div>
        `;

        gridContainer.appendChild(artistCard);
    });
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === "") {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }
    
    requestApi(searchTerm);
});
