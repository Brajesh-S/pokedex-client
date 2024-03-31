import React from 'react';
import Dashboard from './dashboard';
import PokemonDetail from './pokemonData';
import './App.css';

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        
        {/* You can replace this with your Dashboard or PokemonDetail components */}
        {<Dashboard /> }
        {<PokemonDetail /> }
        
      </header>
    </div>
  );
}

export default App;