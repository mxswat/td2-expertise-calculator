import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function normalize(val: number, max: number, min: number) {
  return Math.max(Math.min((val - min) / (max - min), 1), 0);
}

function calcXPRequired(proficencyRank: number, rankProgress: number) {
  return 880000 - ((proficencyRank * 88000) + rankProgress)
}

function App() {
  const [rankProgress, setRankProgress] = useState(0);
  const [proficencyRank, setProficencyRank] = useState(0);
  const [barPercentage, setBarPercentage] = useState(0);
  const [itemTypeDivided, setItemTypeDivided] = useState(0)

  const handleItemType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTypeDivided(parseInt(e.target.value))
  }

  const onRankProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalize(parseInt(e.target.value), 88000, 0)
    setRankProgress(isNaN(value) ? 0 : parseInt(e.target.value))
    setBarPercentage(isNaN(value) ? 0 : (value * 100))
  }

  const xpRequired = calcXPRequired(proficencyRank, rankProgress)

  return (
    <div className="App">
      <h1>The Division 2 Expertise/Proficency Calculator</h1>
      <div className='flex flex-1 w-full flex-col'>
        <div className='flex justify-between'>
          <span>Proficency Rank</span>
          <input className='td2-input' type="number" placeholder='0' min={0} max={9} onChange={(e) => setProficencyRank(parseInt(e.target.value))} />
        </div>
        <div className='flex justify-between'>
          <span>Rank progress </span>
          <input className='td2-input' type="number" placeholder='0' min={0} max={88000} onChange={onRankProgressChange} />
        </div>
        <div className='progress-bar-container flex w-full h-2'>
          <div className='bg-black h-2' style={{ width: `${barPercentage}%` }} />
        </div>
        <div className='flex flex-col'>
          <input type="radio" name="gender" value="8800" onChange={handleItemType} defaultChecked/>
          <label htmlFor="8800">normal brands and gear set pieces</label>
          <input type="radio" name="gender" value="44000" onChange={handleItemType} />
          <label htmlFor="44000">weapons, improvised gear, exotics and named</label>
        </div>
        <div className="flex flex-col">
          <span>XP Required = {xpRequired}</span>
          <span>Items to donate = {xpRequired / itemTypeDivided}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
