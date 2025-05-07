const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

(async() => {

  const fs = require('fs');

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const pokemonPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
  .then(res => res.json());

  //Páginas por id de pokémon
  let fileContentIds = pokemonIds.map(id => `/pokemons/${id}`).join('\n');

  //Por páginas de pokémon
  let fileContentPages = pokemonPages.map(page => `/pokemons/page/${page}`).join('\n');

  //Por nombres de pokémon
  let fileContentNames = pokemonNameList.results.map(pokemon => `/pokemons/${pokemon.name}`).join('\n');

  let fileContent = fileContentIds + '\n' + fileContentPages + '\n' + fileContentNames;

  fs.writeFileSync('routes.txt', fileContent);

  console.log('routes.txt generated');
})()
