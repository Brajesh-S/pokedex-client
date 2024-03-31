import React from 'react';

function Stats({ stats }) {
  const { hp, attack, defense, specialAttack, specialDefense, speed } = stats;
  

  const maxStat = Math.max(hp, attack, defense, specialAttack, specialDefense, speed);

  const barStyle = (statValue) => ({
    width: `${(statValue / maxStat) * 100}%`,
    backgroundColor: statValue > 100 ? 'green' : statValue > 70 ? 'orange' : 'red', // Adjust color scheme
  });

  return (
    <div className="stats">
      <p>HP: <div style={barStyle(hp)}></div></p>
      <p>Attack: <div style={barStyle(attack)}></div></p>
      <p>Defense: <div style={barStyle(defense)}></div></p>
      <p>Special Attack: <div style={barStyle(specialAttack)}></div></p>
      <p>Special Defense: <div style={barStyle(specialDefense)}></div></p>
      <p>Speed: <div style={barStyle(speed)}></div></p>
    </div>
  );
}

export default Stats;
