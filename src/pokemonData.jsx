import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetail = ({ name }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/pokemon/${name}`);
        

        const { id, name: pokemonName, height, weight, abilities, types, sprites, moves, stats } = response.data;

        const mappedStats = {};
        // Map stat names to more readable forms
        const statNames = {
          'hp': 'HP',
          'attack': 'Attack',
          'defense': 'Defense',
          'special-attack': 'Special Attack',
          'special-defense': 'Special Defense',
          'speed': 'Speed'
        };

        // Loop through the stats array to extract base stats
        stats.forEach(stat => {
          const statName = statNames[stat.stat.name];
          const baseStat = stat.base_stat;
          mappedStats[statName] = baseStat;
        });

        setPokemonData({
          id,
          name,
          height,
          weight,
          abilities: abilities.map(ability => ability.ability.name),
          types: types.map(type => type.type.name),
          sprites,
          moves, // Keep the original moves structure
          stats: mappedStats
        });
        console.log('LOOOOOOOOOOOOK',mappedStats)
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (!pokemonData) {
    return <div></div>;
  }

  return (
    <div>
      <h2>{pokemonData.pokemonName}</h2>
      <p>ID: {pokemonData.id}</p>
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      <p>Abilities: {pokemonData.abilities.join(', ')}</p>
      <p>Types: {pokemonData.types.join(', ')}</p>
      <p>Stats:</p>
      <ul>
        {Object.entries(pokemonData.stats).map(([statName, baseStat]) => (
          <li key={statName}>{statName}: {baseStat}</li>
        ))}
      </ul>
      <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
    </div>
  );
};

export default PokemonDetail;
