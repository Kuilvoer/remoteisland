import React from 'react';
import { tahitiData } from '../data';

const palettes = {
  A: { bg: '#FFFFFF', text: '#333333', accent: '#556B2F', panelBg: '#D4C5B9', panelText: '#FFFFFF', lightBg: '#F4F1DE' },
  B: { bg: '#FDFBF7', text: '#222222', accent: '#000080', panelBg: '#D4AF37', panelText: '#000080', lightBg: '#F0F0F0' },
  C: { bg: '#FAF0E6', text: '#4E3629', accent: '#2E8B57', panelBg: '#8FBC8F', panelText: '#FFFFFF', lightBg: '#E8E4D9' }
};

export default function Theme3Magazine({ paletteKey }) {
  const p = palettes[paletteKey];
  const island = tahitiData;

  return (
    <div className="min-h-screen font-['Lato'] transition-colors duration-500" style={{ backgroundColor: p.bg, color: p.text }}>
      {/* Header */}
      <header className="max-w-6xl mx-auto py-8 px-6 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white"
            style={{ backgroundColor: p.accent }}
          >
            <i className="fa-solid fa-leaf"></i>
          </div>
          <div className="text-2xl tracking-widest uppercase font-['Playfair_Display']">The Island Guide</div>
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest opacity-60 font-semibold">
          <span className="cursor-pointer hover:opacity-100 transition-opacity">Ontdekken</span>
          <span className="cursor-pointer hover:opacity-100 transition-opacity">Klimaat</span>
          <span className="cursor-pointer hover:opacity-100 transition-opacity">Cultuur</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Left: Article */}
        <div className="lg:w-2/3">
          <div className="relative w-full h-[300px] md:h-[500px] mb-8">
            <img src={island.imageUrlHero} alt={island.name} className="w-full h-full object-cover shadow-sm" />
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm uppercase tracking-widest font-bold" style={{ color: p.accent }}>{island.country}</span>
            <span className="w-12 h-px bg-gray-300"></span>
            <span className="text-sm italic font-['Playfair_Display'] opacity-70">{island.region}</span>
          </div>

          <h1 className="text-5xl md:text-6xl mb-6 font-['Playfair_Display']">De magie van {island.name}</h1>
          
          <p className="text-lg leading-relaxed mb-8 font-light opacity-90">
            {island.description}
          </p>

          <div 
            className="p-8 border-l-4 mb-12"
            style={{ backgroundColor: p.lightBg, borderColor: p.accent }}
          >
            <h3 className="text-2xl mb-4 font-['Playfair_Display']" style={{ color: p.accent }}>Wist je dat?</h3>
            <p className="italic font-['Playfair_Display'] text-lg opacity-90">"{island.fact}"</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img src={island.imageUrlSmall1} className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            <img src={island.imageUrlSmall2} className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:w-1/3">
          
          {/* Stats Box */}
          <div className="border border-gray-200 p-8 mb-8 bg-white/50">
            <h3 className="text-2xl mb-6 border-b border-gray-200 pb-4 font-['Playfair_Display']">Eiland Feiten</h3>
            
            <div className="mb-4">
              <span className="block text-xs uppercase tracking-widest opacity-60 mb-1">Inwoners</span>
              <span className="text-xl font-['Playfair_Display']">{island.population.toLocaleString('nl-NL')}</span>
            </div>
            
            <div className="mb-4">
              <span className="block text-xs uppercase tracking-widest opacity-60 mb-1">Afstand tot continent</span>
              <span className="text-xl font-['Playfair_Display']">{island.distance.toLocaleString('nl-NL')} km ({island.target})</span>
            </div>
            
            <div className="mb-6">
              <span className="block text-xs uppercase tracking-widest opacity-60 mb-1">Vlag</span>
              <img src={island.flagUrl} className="w-20 mt-2 border border-gray-200 shadow-sm" />
            </div>

            <div className="mb-6">
              <span className="block text-xs uppercase tracking-widest opacity-60 mb-3">Faciliteiten</span>
              <ul className="space-y-3 text-sm">
                {island.facilities.map((fac, i) => (
                  <li key={i} className="flex items-center">
                    <i className="fa-solid fa-check mr-3" style={{ color: p.accent }}></i> {fac}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weather Box */}
          <div 
            className="p-8 transition-colors duration-500"
            style={{ backgroundColor: p.accent, color: p.panelText }}
          >
            <h3 className="text-2xl mb-2 font-['Playfair_Display']" style={{ color: p.panelBg }}>Huidig Weer</h3>
            <p className="text-sm uppercase tracking-widest mb-6 opacity-80">{island.name}</p>
            
            <div className="flex items-center gap-6">
              <i className="fa-solid fa-sun text-6xl" style={{ color: p.panelBg }}></i>
              <div>
                <span className="text-5xl font-light">{island.weather.temp}&deg;C</span>
                <p className="mt-1 opacity-90">{island.weather.condition}</p>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
