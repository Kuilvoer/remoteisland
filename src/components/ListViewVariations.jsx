import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import WeatherWidget from './WeatherWidget';
import { palettes } from '../App';

// 1. Atlas Index (Data-driven Table)
export function ListViewAtlas({ islands, onSelect, onHover }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 fade-in pb-32">
      {islands.map(island => {
        const fav = isFavorite(island.id);
        const theme = palettes[island.themeType] || palettes.tropical;
        const pTheme = theme.accent;
        const pBg = theme.bg;
        
        return (
          <div 
            key={island.id}
            onMouseEnter={() => onHover && onHover(island)}
            className="group flex items-center justify-between p-4 rounded-3xl border-4 bg-white hover:bg-opacity-80 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
            style={{ borderColor: pTheme }}
          >
            <div className="flex items-center gap-6 flex-1" onClick={() => onSelect(island)}>
              <div className="w-16 h-16 rounded-full border-4 overflow-hidden shrink-0" style={{ borderColor: pBg }}>
                <img src={`https://flagcdn.com/w320/${island.media?.countryCode}.png`} alt="flag" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-xl font-black uppercase tracking-tighter" style={{ color: pTheme }}>{island.name}</h3>
                  <p className="text-sm font-bold opacity-70" style={{ color: pTheme }}>{island.country}</p>
                </div>
                <div className="hidden md:block text-sm font-bold uppercase" style={{ color: pTheme }}>
                  <span className="opacity-50 block text-[10px]">Regio</span>
                  {island.region}
                </div>
                <div className="hidden md:block text-sm font-bold uppercase" style={{ color: pTheme }}>
                  <span className="opacity-50 block text-[10px]">Type</span>
                  {island.geographyType || 'Eiland'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 px-4 shrink-0">
               <button onClick={(e) => { e.stopPropagation(); toggleFavorite(island.id); }} className="hover:scale-125 transition-transform">
                 <i className={`fa-heart text-2xl ${fav ? 'fa-solid text-red-500' : 'fa-regular'}`} style={{ color: fav ? undefined : pTheme }}></i>
               </button>
               <button onClick={() => onSelect(island)} className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:scale-110 transition-transform" style={{ borderColor: pTheme, color: pTheme }}>
                 <i className="fa-solid fa-chevron-right"></i>
               </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 2. Master-Detail Split Screen
export function ListViewSplit({ islands, onSelect, activeIsland, setActiveIsland }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const activePreview = activeIsland || islands[0];
  
  const theme = palettes[activePreview?.themeType] || palettes.tropical;
  const pTheme = theme.accent;
  const pBg = theme.bg;

  return (
    <div className="w-full max-w-7xl mx-auto flex h-[75vh] bg-white rounded-[40px] border-4 overflow-hidden shadow-2xl fade-in" style={{ borderColor: pTheme }}>
      {/* Left List */}
      <div className="w-full md:w-2/5 border-r-4 overflow-y-auto hide-scrollbar" style={{ borderColor: pTheme }}>
        {islands.map(island => (
          <div 
            key={island.id}
            onClick={() => setActiveIsland(island)}
            className={`p-6 border-b-4 cursor-pointer transition-colors ${activePreview?.id === island.id ? 'bg-opacity-20' : 'hover:bg-opacity-5'}`}
            style={{ borderColor: pTheme, backgroundColor: activePreview?.id === island.id ? pBg : 'transparent' }}
          >
            <h3 className="text-xl font-black uppercase tracking-tighter" style={{ color: pTheme }}>{island.name}</h3>
            <p className="text-xs font-bold uppercase opacity-60 mt-1" style={{ color: pTheme }}>{island.region}</p>
          </div>
        ))}
      </div>
      
      {/* Right Preview */}
      <div className="hidden md:flex w-3/5 relative flex-col items-center justify-center p-12 bg-black/5 overflow-hidden group">
         {activePreview && (
           <>
             {/* Large background image */}
             <div className="absolute inset-0 opacity-40">
               <img src={activePreview.media?.images?.heroDesktop || `https://flagcdn.com/w320/${activePreview.media?.countryCode}.png`} alt="preview" className="w-full h-full object-cover blur-sm" />
             </div>
             
             <div className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-md border-4 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl transition-transform hover:-translate-y-2" style={{ borderColor: pTheme }}>
               <div>
                  <div className="flex gap-2 items-center mb-4">
                    <img src={`https://flagcdn.com/w320/${activePreview.media?.countryCode}.png`} alt="Flag" className="w-8 h-8 rounded-full border-2 object-cover" style={{ borderColor: pTheme }} />
                    <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2"
                        style={{ borderColor: pTheme, color: pTheme, backgroundColor: `${pTheme}10` }}>
                      {activePreview.geographyType || 'Eiland'}
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(activePreview.id); }}
                    className="absolute top-8 right-8 w-10 h-10 rounded-full border-2 flex items-center justify-center hover:scale-110 transition-transform shadow-sm bg-white"
                    style={{ borderColor: pTheme }}
                  >
                    <i className={`fa-heart text-lg ${isFavorite(activePreview.id) ? 'fa-solid text-red-500' : 'fa-regular'}`} style={{ color: isFavorite(activePreview.id) ? undefined : pTheme }}></i>
                  </button>
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-2" style={{ color: pTheme }}>{activePreview.name}</h2>
                  <p className="text-sm font-bold opacity-70" style={{ color: pTheme }}>{activePreview.country}</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-2xl border-2" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: pTheme }}>
                   <p className="text-xs font-black opacity-70 uppercase tracking-widest mb-1" style={{ color: pTheme }}>Inwoners</p>
                   <p className="text-xl font-black" style={{ color: pTheme }}>{activePreview.stats?.population === 0 ? 'Onbewoond' : activePreview.stats?.population.toLocaleString('nl-NL')}</p>
                 </div>
                 <div className="p-4 rounded-2xl border-2" style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: pTheme }}>
                   <p className="text-xs font-black opacity-70 uppercase tracking-widest mb-1" style={{ color: pTheme }}>Afstand</p>
                   <p className="text-xl font-black" style={{ color: pTheme }}>{activePreview.stats?.distanceToMainlandKm.toLocaleString('nl-NL')} <span className="text-sm">km</span></p>
                 </div>
               </div>
               
               <p className="text-sm font-medium opacity-90 line-clamp-3 leading-relaxed" style={{ color: pTheme }}>{activePreview.story?.description}</p>
               
               <button onClick={() => onSelect(activePreview)} className="mt-2 px-6 py-4 rounded-full border-4 font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform bg-white" style={{ borderColor: pTheme, color: pTheme }}>
                 Start Verkenning <i className="fa-solid fa-arrow-right ml-2"></i>
               </button>
             </div>
           </>
         )}
      </div>
    </div>
  );
}

// 3. Accordion
export function ListViewAccordion({ islands, onSelect }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-2 fade-in pb-32">
      {islands.map(island => {
        const isOpen = openId === island.id;
        const theme = palettes[island.themeType] || palettes.tropical;
        const pTheme = theme.accent;
        
        return (
          <div key={island.id} className="border-4 bg-white rounded-2xl overflow-hidden transition-all duration-500 shadow-sm" style={{ borderColor: pTheme }}>
            <div 
              onClick={() => setOpenId(isOpen ? null : island.id)}
              className="p-6 flex justify-between items-center cursor-pointer hover:bg-black/5"
            >
              <h3 className="text-2xl font-black uppercase tracking-tighter" style={{ color: pTheme }}>{island.name}</h3>
              <div className="flex items-center gap-6">
                 <span className="hidden md:inline text-sm font-bold opacity-60 uppercase" style={{ color: pTheme }}>{island.region}</span>
                 <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} text-xl transition-transform`} style={{ color: pTheme }}></i>
              </div>
            </div>
            
            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] border-t-4 opacity-100' : 'max-h-0 opacity-0'}`} style={{ borderColor: pTheme }}>
              <div className="p-6 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 h-40 rounded-xl border-4 overflow-hidden shrink-0" style={{ borderColor: pTheme }}>
                  <img src={island.media?.images?.heroDesktop || `https://flagcdn.com/w320/${island.media?.countryCode}.png`} alt="island" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <p className="font-medium text-sm leading-relaxed mb-4 opacity-80" style={{ color: pTheme }}>
                    Een prachtige locatie in {island.country}. Klik op ontdekken om alle details over fauna, klimaat en reismogelijkheden te zien.
                  </p>
                  <div className="flex justify-between items-end">
                     <div>
                       <span className="block text-[10px] font-black uppercase opacity-50" style={{ color: pTheme }}>Type</span>
                       <span className="font-bold text-sm" style={{ color: pTheme }}>{island.geographyType || 'Eiland'}</span>
                     </div>
                     <button onClick={() => onSelect(island)} className="px-6 py-3 rounded-full border-4 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform" style={{ borderColor: pTheme, color: pTheme, backgroundColor: `${pTheme}10` }}>
                       Ontdek <i className="fa-solid fa-arrow-right ml-2"></i>
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 4. Bento Box
export function ListViewBento({ islands, onSelect }) {
  // Map items to different bento spans
  const getBentoClasses = (index) => {
    const layout = [
      "col-span-1 md:col-span-2 row-span-2", // Big hero
      "col-span-1 md:col-span-1 row-span-1", // Small square
      "col-span-1 md:col-span-1 row-span-1", // Small square
      "col-span-1 md:col-span-2 row-span-1", // Wide rectangle
      "col-span-1 md:col-span-1 row-span-2", // Tall portrait
      "col-span-1 md:col-span-1 row-span-1", // Small square
      "col-span-1 md:col-span-2 row-span-2", // Big hero
    ];
    return layout[index % layout.length];
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-[150px] gap-4 fade-in pb-32">
      {islands.map((island, idx) => {
        const theme = palettes[island.themeType] || palettes.tropical;
        const pTheme = theme.accent;
        
        return (
          <div 
            key={island.id}
            onClick={() => onSelect(island)}
            className={`group relative rounded-3xl border-4 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform shadow-lg ${getBentoClasses(idx)}`}
            style={{ borderColor: pTheme, backgroundColor: pTheme }}
          >
            <img src={island.media?.images?.heroDesktop || `https://flagcdn.com/w320/${island.media?.countryCode}.png`} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity mix-blend-overlay" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
               <div className="flex gap-2 items-center mb-1">
                 <img src={`https://flagcdn.com/w320/${island.media?.countryCode}.png`} alt="Flag" className="w-4 h-4 rounded-full border border-white" />
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{island.country}</p>
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tighter text-white drop-shadow-md">{island.name}</h3>
            </div>
            
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-black uppercase text-white border-2 border-white/30">
               {island.geographyType || 'Eiland'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
