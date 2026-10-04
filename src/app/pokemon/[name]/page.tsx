import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../../../services/pokeApi';
import Link from 'next/link';

interface Props {
  // Requisito Next.js 15+: params debe ser una Promesa
  params: Promise<{ name: string }>;
}

export default async function PokemonDetailPage({ params }: Props) {
  // CORRECCIÓN: Hacemos await para desenvolver los parámetros de la URL de forma segura
  const resolvedParams = await params;
  const name = resolvedParams.name;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonDetail(name),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetailView name={name} />
    </HydrationBoundary>
  );
}

async function PokemonDetailView({ name }: { name: string }) {
  const pokemon = await fetchPokemonDetail(name);
  const imgUrl = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

  return (
    <div style={{
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      border: '3px solid #232323',
      borderRadius: '24px',
      fontFamily: 'sans-serif',
      boxShadow: '0 8px 0px #232323'
    }}>
      <Link href="/" style={{
        textDecoration: 'none',
        color: '#3b4cca',
        fontWeight: 'bold',
        display: 'inline-block',
        marginBottom: '1rem'
      }}>
        ← Volver a la Pokédex
      </Link>

      <div style={{ textAlign: 'center', textTransform: 'capitalize' }}>
        <div style={{ backgroundColor: '#f1f5f9', borderRadius: '20px', padding: '1rem', display: 'inline-block' }}>
          <img src={imgUrl} alt={name} style={{ width: '180px', height: '180px' }} />
        </div>
        <h1 style={{ marginTop: '1rem', color: '#24292e', fontSize: '2rem' }}>{pokemon.name}</h1>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Estadísticas de Batalla
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pokemon.stats.map(s => (
            <li key={s.stat.name} style={{
              textTransform: 'capitalize',
              padding: '0.5rem 0',
              display: 'flex',
              justifyContent: 'between',
              borderBottom: '1px dashed #e2e8f0'
            }}>
              <span style={{ fontWeight: '600', color: '#4a5568' }}>{s.stat.name}:</span>
              <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: '#3b4cca' }}>{s.base_stat}</span>
            </li>
          ))}
        </ul>

        <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Tipo
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {pokemon.types.map(t => (
            <span key={t.type.name} style={{
              textTransform: 'capitalize',
              backgroundColor: '#ffcb05',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              border: '1px solid #232323'
            }}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
