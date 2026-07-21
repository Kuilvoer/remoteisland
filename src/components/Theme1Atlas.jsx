import React from 'react';
import { tahitiData } from '../data';

const palettes = {
  A: { bg: '#00B4D8', card: '#F4F1DE', accent: '#03045E' },
  B: { bg: '#2A9D8F', card: '#E9C46A', accent: '#E76F51' },
  C: { bg: '#F4A261', card: '#FFFFFF', accent: '#264653' }
};

export default function Theme1Atlas({ paletteKey }) {
  const p = palettes[paletteKey];
  const island = tahitiData;

  return (
    <div 
      className="min-h-screen p-8 flex items-center justify-center font-['Outfit']"
      style={{ backgroundColor: p.bg, backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
    >
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8">
        
        {/* Map/Visual Area */}
        <div 
          className="flex-1 relative rounded-3xl overflow-hidden border-4 shadow-lg transition-colors duration-500"
          style={{ borderColor: p.accent, boxShadow: `8px 8px 0px ${p.accent}` }}
        >
          <img src={island.imageUrlHero} alt={island.name} className="w-full h-full object-cover min-h-[400px]" />
          <div 
            className="absolute top-4 left-4 px-4 py-2 rounded-full border-2 font-bold flex items-center gap-2 transition-colors duration-500"
            style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}
          >
            <i className="fa-solid fa-location-dot"></i> {island.coordinates}
          </div>
        </div>

        {/* Info Card */}
        <div 
          className="flex-1 rounded-3xl p-8 relative transition-colors duration-500"
          style={{ backgroundColor: p.card, color: p.accent, boxShadow: `10px 10px 0px ${p.accent}`, border: `2px solid ${p.accent}` }}
        >
          <div 
            className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full border-4 overflow-hidden shadow-lg flex items-center justify-center"
            style={{ borderColor: p.accent }}
          >
            <img src={island.flagUrl} alt="Flag" className="w-full h-full object-cover" />
          </div>

          <h1 className="text-5xl font-extrabold mb-2 uppercase tracking-tight">{island.name}</h1>
          <p className="text-xl font-semibold mb-6 opacity-80 border-b-2 pb-4" style={{ borderColor: p.accent }}>
            {island.country}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/50 p-4 rounded-xl border" style={{ borderColor: p.accent }}>
              <p className="text-sm font-bold opacity-70 uppercase">Inwoners</p>
              <p className="text-2xl font-extrabold">{island.population.toLocaleString('nl-NL')}</p>
            </div>
            <div className="bg-white/50 p-4 rounded-xl border" style={{ borderColor: p.accent }}>
              <p className="text-sm font-bold opacity-70 uppercase">Actueel Weer</p>
              <p className="text-2xl font-extrabold flex items-center gap-2">
                <i className="fa-solid fa-sun text-yellow-500"></i> {island.weather.temp}°C
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><i className="fa-solid fa-umbrella-beach"></i> Faciliteiten</h3>
            <div className="flex flex-wrap gap-2">
              {island.facilities.map((fac, i) => (
                <span 
                  key={i} 
                  className="text-white px-3 py-1 rounded-full text-sm font-semibold border"
                  style={{ backgroundColor: p.bg, borderColor: p.accent }}
                >
                  {fac}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl transition-colors duration-500" style={{ backgroundColor: p.accent, color: p.card }}>
            <h3 className="font-bold text-sm uppercase mb-1" style={{ color: p.bg }}>Interessant Feitje</h3>
            <p className="text-sm">{island.fact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
