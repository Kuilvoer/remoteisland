import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

export default function Theme1Card({ island, p, onReadMore }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(island?.id);
  if (!island) return null;

  return (
    <div className={`flex flex-col md:flex-row gap-8 w-full max-w-[90vw] md:max-w-6xl mx-auto items-stretch font-['Outfit'] transition-all duration-700 md:h-[600px]`}>
      
      {/* Map/Visual Area */}
      <div 
        className={`w-full md:w-1/2 relative rounded-[40px] overflow-hidden border-4 transition-all duration-700 flex-shrink-0 cursor-pointer group shadow-2xl z-10 flex h-72 md:h-full`}
        style={{ borderColor: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
        onClick={() => onReadMore(island)}
      >
        <img src={island.media?.images?.heroDesktop} alt={island.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div 
          className="absolute top-6 left-6 px-5 py-3 rounded-full border-2 font-black flex items-center gap-2 transition-colors duration-500 shadow-lg text-sm"
          style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}
        >
          <i className="fa-solid fa-location-dot"></i> {island.location?.lat.toFixed(2)}, {island.location?.lng.toFixed(2)}
        </div>
        <div 
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
        >
          <span className="bg-white text-black px-8 py-4 rounded-full font-bold text-xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">Bekijk Details <i className="fa-solid fa-arrow-right ml-2"></i></span>
        </div>
      </div>

      {/* Info Card */}
      <div 
        className={`w-full md:w-1/2 rounded-[40px] p-8 md:p-10 relative transition-all duration-700 border-4 flex flex-col justify-between h-full`}
        style={{ backgroundColor: p.card, color: p.accent, boxShadow: `10px 10px 0px ${p.accent}`, borderColor: p.accent }}
      >
        <div 
          className="absolute -top-8 -right-8 w-24 h-24 bg-white rounded-full border-4 overflow-hidden shadow-2xl flex items-center justify-center z-20"
          style={{ borderColor: p.accent }}
        >
          <img src={`https://flagcdn.com/w320/${island.media?.countryCode}.png`} alt="Flag" className="w-full h-full object-cover" />
        </div>

        <div>
          <div className="flex gap-2 mb-4 self-start flex-wrap items-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2"
                style={{ borderColor: p.accent, color: p.accent, backgroundColor: `${p.accent}10` }}>
              {island.region}
            </div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2"
                style={{ borderColor: p.accent, color: p.accent, backgroundColor: `${p.accent}10` }}>
              {island.geographyType || 'Eiland'}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleFavorite(island.id); }} 
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              style={{ borderColor: p.accent, backgroundColor: `${p.accent}10` }}
            >
              <i className={`fa-heart text-sm ${fav ? 'fa-solid text-red-500' : 'fa-regular'}`} style={{ color: fav ? undefined : p.accent }}></i>
            </button>
          </div>

          <h1 className="text-3xl lg:text-5xl font-black mb-3 uppercase tracking-tighter drop-shadow-sm leading-tight">{island.name}</h1>
          <p className="text-xl lg:text-2xl font-bold mb-6 opacity-90 border-b-4 pb-4" style={{ borderColor: p.accent }}>
            {island.country}
          </p>

          <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-6">
            <div className="p-4 lg:p-5 rounded-2xl border-2" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: p.accent }}>
              <p className="text-xs lg:text-sm font-black opacity-70 uppercase tracking-widest mb-1">Inwoners</p>
              <p className="text-xl lg:text-3xl font-black">{island.stats?.population === 0 ? 'Onbewoond' : island.stats?.population.toLocaleString('nl-NL')}</p>
            </div>
            <div className="p-4 lg:p-5 rounded-2xl border-2" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: p.accent }}>
              <p className="text-xs lg:text-sm font-black opacity-70 uppercase tracking-widest mb-1">Afstand</p>
              <p className="text-xl lg:text-3xl font-black">{island.stats?.distanceToMainlandKm.toLocaleString('nl-NL')} <span className="text-sm">km</span></p>
            </div>
          </div>

        </div>

        <div className="p-5 lg:p-6 rounded-3xl transition-all duration-500 cursor-pointer hover:scale-[1.02] shadow-xl mt-auto shrink-0" 
             style={{ backgroundColor: p.accent, color: p.card }}
             onClick={() => onReadMore(island)}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-black text-xs lg:text-sm uppercase tracking-widest" style={{ color: p.bg }}>Start Verkenning</h3>
            <i className="fa-solid fa-arrow-right" style={{ color: p.bg }}></i>
          </div>
          <p className="text-sm lg:text-base font-medium opacity-90 line-clamp-2 leading-relaxed">{island.story?.description}</p>
        </div>
      </div>
    </div>
  );
}
