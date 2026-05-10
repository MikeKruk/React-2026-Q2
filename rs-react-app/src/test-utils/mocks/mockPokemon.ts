const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
};

const mockPokemon2 = {
  id: 4,
  name: 'charmander',
  types: [
    {
      slot: 1,
      type: {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
      },
    },
  },
};

const mockItemPokemonsList1 = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};
const mockItemPokemonsList2 = {
  name: 'ivysaur',
  url: 'https://pokeapi.co/api/v2/pokemon/2/',
};

export {
  mockItemPokemonsList1,
  mockItemPokemonsList2,
  mockPokemon,
  mockPokemon2,
};
