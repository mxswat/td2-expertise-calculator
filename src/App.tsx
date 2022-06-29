import React, { useState } from 'react';
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
  const [itemTypeDivided, setItemTypeDivided] = useState(8800)

  const handleItemType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTypeDivided(parseInt(e.target.value))
  }

  const onProficencyRankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setProficencyRank(isNaN(value) ? 0 : value)
  }

  const onRankProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalize(parseInt(e.target.value), 88000, 0)
    setRankProgress(isNaN(value) ? 0 : parseInt(e.target.value))
    setBarPercentage(isNaN(value) ? 0 : (value * 100))
  }

  const xpRequired = calcXPRequired(proficencyRank, rankProgress)
  const itemsToDonate = Math.ceil(xpRequired / itemTypeDivided);

  return (
    <div className="App">
      <h1 className='mb-4 text-xl text-center'>The Division 2 Expertise/Proficency Calculator</h1>
      <div className='flex flex-1 w-full flex-col'>
        <div className='flex justify-between'>
          <span className='text-lg'>Proficency Rank</span>
          <input className='text-lg td2-input' type="number" placeholder='0' min={0} max={9} step={1} onChange={onProficencyRankChange} />
        </div>
        <div className='flex justify-between mb-2'>
          <span className='text-lg'>Rank progress </span>
          <input className='text-lg td2-input' type="number" placeholder='0' min={0} max={88000} step={8800} onChange={onRankProgressChange} />
        </div>
        <div className='progress-bar-container flex w-full border border-solid border-black'>
          <div className='bg-black h-2' style={{ width: `${barPercentage}%` }} />
        </div>

        <div className='flex flex-col mt-4 mb-4'>
          Calculate for:
          <label className='flex items-center capitalize mb-1' htmlFor="8800">
            <input className='mr-1' type="radio" name="gender" value="8800" onChange={handleItemType} defaultChecked />
            normal brands and gear set pieces
          </label>
          <label className='flex items-center capitalize' htmlFor="44000">
            <input className='mr-1' type="radio" name="gender" value="44000" onChange={handleItemType} />
            weapons, improvised gear, exotics and named
          </label>
        </div>
        <div className="flex flex-col">
          <span>XP Required = {xpRequired}</span>
          <span>Items to donate = {itemsToDonate}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
