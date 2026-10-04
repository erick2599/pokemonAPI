import { PokemonListResponse, PokemonDetail } from '../types/pokemon';

export async function fetchPokemons(limit = 50): Promise<PokemonListResponse> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error('Error al cargar la lista de Pokémon');
  return res.json();
}

export async function fetchPokemonDetail(name: string): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error(`Error al cargar el detalle de ${name}`);
  return res.json();
}
