import React from 'react';
import { tahitiData } from '../data';

const palettes = {
  A: { bg: '#F9FAFB', panel: '#111827', accent: '#FBBF24', textPanel: '#FFFFFF', textPanelMuted: '#9CA3AF' },
  B: { bg: '#E5E7EB', panel: '#121212', accent: '#00E5FF', textPanel: '#FFFFFF', textPanelMuted: '#6B7280' },
  C: { bg: '#F3F4F6', panel: '#2C3E50', accent: '#E67E22', textPanel: '#ECF0F1', textPanelMuted: '#95A5A6' }
};

export default function Theme2Modern({ paletteKey }) {
  const p = palettes[paletteKey];
  const island = tahitiData;

  return (
    <div className="min-h-screen font-['Inter'] transition-colors duration-500" style={{ backgroundColor: p.bg }}>
      {/* Top Nav */}
      <nav className="w-full bg-white px-8 py-4 flex justify-between items-center border-b border-gray-200 shadow-sm">
        <div className="font-black text-2xl tracking-tighter">ISLAND<span style={{ color: p.accent }}>EXPLORER</span></div>
        <div className="flex gap-6 text-sm font-bold text-gray-400">
          <span className="text-black">TAHITI</span>
          <span className="cursor-pointer hover:text-black">GALAPAGOS</span>
          <span className="cursor-pointer hover:text-black">SVALBARD</span>
          <span className="cursor-pointer hover:text-black"><i className="fa-solid fa-magnifying-glass"></i></span>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
        
        {/* Left: Big Image */}
        <div className="lg:w-2/3 relative h-[50vh] lg:h-auto">
          <img src={island.imageUrlHero} alt={island.name} className="w-full h-full object-cover" />
          <div className="absolute top-8 left-8 flex items-center gap-4">
            <img src={island.flagUrl} className="h-10 w-auto rounded shadow-lg border border-white/20" />
            <span className="text-white font-bold tracking-widest text-sm drop-shadow-md uppercase">{island.country}</span>
          </div>
          <div className="absolute bottom-12 left-12">
            <h1 className="text-white text-6xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl uppercase">{island.name}</h1>
            <p className="text-white/90 text-lg lg:text-xl max-w-lg mt-4 font-light drop-shadow-md">{island.description}</p>
          </div>
        </div>

        {/* Right: Dashboard */}
        <div 
          className="lg:w-1/3 p-10 flex flex-col justify-between transition-colors duration-500"
          style={{ backgroundColor: p.panel, color: p.textPanel }}
        >
          {/* Weather Widget */}
          <div>
            <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: p.textPanelMuted }}>Actueel Weer</p>
            <div className="flex items-start gap-4">
              <i className="fa-solid fa-cloud-sun text-5xl" style={{ color: p.accent }}></i>
              <div className="text-7xl font-light -mt-2">{island.weather.temp}&deg;</div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div>
                <p className="text-xs mb-1" style={{ color: p.textPanelMuted }}>WIND</p>
                <p className="font-bold">{island.weather.wind}</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: p.textPanelMuted }}>VOCHT</p>
                <p className="font-bold">{island.weather.humidity}</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: p.textPanelMuted }}>WATER</p>
                <p className="font-bold">{island.weather.waterTemp}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex-grow">
            <p className="text-xs font-bold tracking-widest mb-6 uppercase" style={{ color: p.textPanelMuted }}>Eiland Data</p>
            
            <div className="mb-6">
              <div className="flex justify-between border-b pb-2 mb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <span style={{ color: p.textPanelMuted }}>Inwoners</span>
                <span className="font-bold">{island.population.toLocaleString('nl-NL')}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <span style={{ color: p.textPanelMuted }}>Locatie</span>
                <span className="font-bold">{island.coordinates}</span>
              </div>
              <div className="flex justify-between border-b pb-2 mb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <span style={{ color: p.textPanelMuted }}>Afstand Continent</span>
                <span className="font-bold">{island.distance.toLocaleString('nl-NL')} km</span>
              </div>
            </div>

            <div className="mb-8">
              <span className="text-sm block mb-3" style={{ color: p.textPanelMuted }}>Faciliteiten:</span>
              <div className="flex gap-2 flex-wrap">
                {island.facilities.map((fac, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded bg-black/30 font-medium">
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button 
            className="w-full font-black py-4 rounded transition flex justify-between items-center px-6 mt-6 hover:brightness-110"
            style={{ backgroundColor: p.accent, color: p.panel }}
          >
            ONTDEK MEER <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
