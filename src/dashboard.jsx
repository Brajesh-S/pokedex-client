import React, { useState } from 'react';
import axios from 'axios';
import OverlayMenu from './overLay';
import './dashboard.css'
import logoImage from './logo.png'
import Stats from './stats';
import './overLay.css';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/pokemon/${searchQuery.toLowerCase()}`);

      const { id, name, height, weight, abilities, types, sprites, moves,stats} = response.data;
      
      setPokemonData({ id, name, height, weight, abilities,  types, sprite: sprites.other.dream_world.front_default, moves, stats });
      setOverlayOpen(false);
      console.log('Loooooooooooooooooooook',stats)
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setPokemonData(null);
    }
  };

  const handlePokemonClick = async (name) => {
    // Fetch more details of the selected Pokemon
    try {
      const response = await axios.get(`http://localhost:3000/api/pokemon/${name.toLowerCase()}`);
      setSelectedPokemon(response.data);
      setOverlayOpen(true);
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };



  const handleClose = () => {
    setOverlayOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div>
      
      <div className="logo-container">
      <img src={logoImage} alt="Pokedex Logo" />
      </div>
    
      <div className="search-container">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch}>Search</button>
        </div>

      {pokemonData &&  (
        <div className="pokemon-data-container">
              <span className="pokemon-type-container">
          <span className="pokemon-type">{pokemonData.types[0]}</span>
          </span>
          <img src={pokemonData.sprite} alt={pokemonData.name} className="pokemon-image"  />
          
          <p className="pokemon-name">Name: {pokemonData.name}</p>
      
          <button className="view-details-button" onClick={() => setSelectedPokemon(pokemonData)}>View Details</button>        
          </div>
      )}

{selectedPokemon && (
  <div className="overlay">
    <div className="background-image"></div>
    
      <div className="overlay-content">
      <div className="pokemon-image-overlay">
          <img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
        </div>
        <div className="pokemon-info">
          <span className="pokemon-name-overlay">Name: {selectedPokemon.name}</span>
          <span className="pokemon-height-overlay">Height: {selectedPokemon.height} ft</span>
          <span className="pokemon-weight-overlay">Weight: {selectedPokemon.weight} kg</span>
          <span className="pokemon-type-overlay">Type: {selectedPokemon.types[0]}</span>
          <span className="pokemon-moves-overlay">Moves: {selectedPokemon.moves.slice(0, 6).map(move => move.name).join(', ')}</span>
        </div>
      </div>
      {/* <div className="pokemon-abilities">
          <span className="pokemon-abilities1-overlay">{selectedPokemon.abilities[0]}</span>
          <span className="pokemon-abilities2-overlay">{selectedPokemon.abilities[1]}</span>
        </div>
        <div className="pokemon-stats">
          <p>Stats:</p>
          <Stats stats={selectedPokemon.stats} />
        </div> */}
        {/* <span className="pokemon-moves-overlay">Moves: {selectedPokemon.moves.slice(0, 6).map(move => move.name).join(', ')}</span> */}
        <button onClick={() => setSelectedPokemon(null)}>Close</button>
      
    
  </div>
)}

       
       {/* {selectedPokemon && (
        <div className="overlay">
          <div className="background-image"></div>
          <div className="card-content"> 
          <div className="overlay-content">
          <div className="pokemon-image-overlay">
            <img  src={selectedPokemon.sprite} alt={selectedPokemon.name} />
            </div>
           
            <span className="pokemon-name-overlay">Name: {selectedPokemon.name}</span>
            < span className="pokemon-abilities1-overlay">{selectedPokemon.abilities[0]}</span>
            <span className="pokemon-abilities2-overlay">{selectedPokemon.abilities[1]}</span>
            <span className='pokemon-height-overlay'>Height: {selectedPokemon.height} ft </span>
            <span className='pokemon-height-overlay'>Weight: {selectedPokemon.weight} kg </span>
   
            <span className="pokemon-type-overlay">Type: {selectedPokemon.types[0]}</span>
            <span className="pokemon-moves-overlay">Moves: {selectedPokemon.moves.slice(0, 6).map(move => move.name).join(', ')}</span>
            <p>Stats:</p>
            <ul>  
            <Stats stats={selectedPokemon.stats} /> 
              
              
            </ul>
            
            
            <button onClick={() => setSelectedPokemon(null)}>Close</button>
            
          </div>
          </div>
        </div>
        
       )}  
       */}


    </div>
    
  );
};


export default Dashboard;
