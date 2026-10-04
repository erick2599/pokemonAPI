import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchPokemons } from '../services/pokeApi';
import PokemonCard from '../components/PokemonCard';

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['pokemons', 50],
    queryFn: () => fetchPokemons(50),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main>

      <header style={{
        backgroundColor: '#e3350d',
        padding: '2rem 1rem',
        textAlign: 'center',
        borderBottom: '6px solid #232323',
        marginBottom: '2.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#ffffff',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: '2px 2px 0px #232323'
        }}>
          Pokedex: 150 Pokémons
        </h1>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <HydrationBoundary state={dehydratedState}>
          <PokemonListSection />
        </HydrationBoundary>
      </div>
    </main>
  );
}


async function PokemonListSection() {
  const data = await fetchPokemons(50);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '1.5rem'
    }}>
      {data.results.map((pokemon) => {

        const urlParts = pokemon.url.split('/').filter(Boolean);
        const id = urlParts[urlParts.length - 1];

        // revisar la URL al inicio estaba mal, esta es la correcta para obtener la imagen oficial del Pokémon
        const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png";

        return (
          <PokemonCard key={pokemon.name} name={pokemon.name} imageUrl={imageUrl} />
        );
      })}
    </div>
  );
}
