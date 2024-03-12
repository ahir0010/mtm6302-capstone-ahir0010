const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
let nextUrl = '';

document.getElementById('loadMore').addEventListener('click', loadPokemons);

function loadPokemons() {
    fetch(nextUrl || apiUrl)
        .then(response => response.json())
        .then(data => {
            nextUrl = data.next;
            data.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokeData => {
                        const pokemonContainer = document.getElementById('pokemonContainer');
                        const pokemonCard = document.createElement('div');
                        pokemonCard.classList.add('col-md-4', 'pokemon-card');
                        pokemonCard.innerHTML = `
                            <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${pokeData.name}</h5>
                            </div>
                        `;
                        pokemonContainer.appendChild(pokemonCard);
                    });
            });
        });
}
loadPokemons();
