import React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './overLay.css';

const OverlayMenu = ({ isOpen, handleClose, selectedPokemon }) => {
  console.log('OverlayMenu isOpen:', isOpen);

  return (
    <div className={`overlay ${isOpen ? 'open' : ''}`}>
      <div className="overlay-content">
        {selectedPokemon && (
          <>
            <img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
            <p>ID: {selectedPokemon.id}</p>
            <p>Name: {selectedPokemon.name}</p>
            <p>Height: {selectedPokemon.height} ft</p>
            <p>Weight: {selectedPokemon.weight} kg</p>
            <p>Abilities: {selectedPokemon.abilities.join(', ')}</p>
            <p>Type: {selectedPokemon.types[0]}</p>
            <p>Moves: {selectedPokemon.moves.slice(0, 6).map(move => move.name).join(', ')}</p>
            <p>Stats:</p>
            <ul>
              {selectedPokemon.stats.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name.replace('-', ' ')}: {stat.base_stat}
                </li>
              ))}
            </ul>
            <button onClick={handleClose} className="closebtn">
              <CloseOutlinedIcon sx={{ fontSize: 40 }} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OverlayMenu;
