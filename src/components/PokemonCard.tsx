'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchPokemonDetail } from '../services/pokeApi';
import { useState } from 'react';

interface PokemonCardProps {
  name: string;
  imageUrl: string; // Recibe la URL calculada desde el componente padre
}

export default function PokemonCard({ name, imageUrl }: PokemonCardProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    queryClient.prefetchQuery({
      queryKey: ['pokemon', name],
      queryFn: () => fetchPokemonDetail(name),
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push("/pokemon/" + name)}
      style={{
        backgroundColor: isHovered ? '#ffcb05' : '#ffffff',
        border: isHovered ? '2px solid #3b4cca' : '2px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 10px 20px rgba(59, 76, 202, 0.15)' : '0 4px 6px rgba(0,0,0,0.02)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative'
      }}
    >
      <div style={{
        backgroundColor: '#f1f5f9',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        margin: '0 auto 1rem auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #e2e8f0'
      }}>
        {/* CORRECCIÓN: Usamos la variable imageUrl directa que nos pasa el componente padre */}
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: '85px',
            height: '85px',
            objectFit: 'contain'
          }}
        />
      </div>
      <h3 style={{
        textTransform: 'capitalize',
        fontSize: '1.1rem',
        fontWeight: '700',
        color: isHovered ? '#232323' : '#2d3748',
        letterSpacing: '0.3px'
      }}>
        {name}
      </h3>
    </div>
  );
}
