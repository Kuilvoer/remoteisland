import React, { useState } from 'react';

// Common Island Thumbnail component used across variations
const IslandThumbnail = ({ island, isActive, onClick, p }) => (
  <div 
    onClick={onClick}
    className={`flex flex-col items-center justify-center cursor-pointer transition-all shrink-0 relative ${isActive ? 'scale-110 -translate-y-2' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
  >
    <div 
      className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 overflow-hidden shadow-xl transition-colors duration-700"
      style={{ borderColor: isActive ? p.bg : p.accent, backgroundColor: '#fff' }}
    >
      <img src={island.flagUrl} className="w-full h-full object-cover" />
    </div>
    <span className="text-[10px] md:text-xs font-black mt-3 uppercase tracking-widest transition-colors duration-700 drop-shadow-md text-center" 
          style={{ color: p.accent }}>
      {island.name}
    </span>
  </div>
);

// Variation 1: Integrated Tabs
export const DockVar1Tabs = ({ islands, activeIsland, setActiveIsland, regions, activeRegion, setActiveRegion, p }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(islands.length / itemsPerPage);
  
  const currentIslands = islands.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const prev = () => setPage(p => Math.max(0, p - 1));
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1));

  return (
    <div className="flex flex-col items-center pointer-events-auto">
      {/* Tabs attached to dock */}
      <div className="flex gap-1 justify-center z-10 -mb-2">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => { setActiveRegion(r); setPage(0); }}
            className={`px-6 py-3 rounded-t-2xl text-xs font-black uppercase transition-all duration-300 border-4 border-b-0`}
            style={{
              backgroundColor: activeRegion === r ? p.card : p.bg,
              color: p.accent,
              borderColor: activeRegion === r ? p.accent : `${p.accent}50`,
              transform: activeRegion === r ? 'translateY(2px)' : 'translateY(10px)',
              zIndex: activeRegion === r ? 10 : 0
            }}
          >
            {r}
          </button>
        ))}
      </div>
      
      {/* Dock Body */}
      <div 
        className="relative z-20 w-full max-w-[95vw] md:max-w-4xl rounded-[40px] px-8 border-4 shadow-2xl flex items-center justify-between transition-colors duration-700 h-[140px] backdrop-blur-md"
        style={{ backgroundColor: p.card, borderColor: p.accent }}
      >
        <button onClick={prev} disabled={page === 0} className={`text-2xl transition-opacity ${page === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-125'}`} style={{ color: p.accent }}><i className="fa-solid fa-chevron-left"></i></button>
        
        <div className="flex gap-6 justify-center flex-1">
          {currentIslands.map(island => (
            <IslandThumbnail key={island.id} island={island} isActive={activeIsland?.id === island.id} onClick={() => setActiveIsland(island)} p={p} />
          ))}
        </div>

        <button onClick={next} disabled={page >= totalPages - 1} className={`text-2xl transition-opacity ${page >= totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-125'}`} style={{ color: p.accent }}><i className="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  );
};

// Variation 2: Dropdown inside Dock
export const DockVar2Dropdown = ({ islands, activeIsland, setActiveIsland, regions, activeRegion, setActiveRegion, p }) => {
  const [page, setPage] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(islands.length / itemsPerPage);
  
  const currentIslands = islands.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const prev = () => setPage(p => Math.max(0, p - 1));
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1));

  return (
    <div className="pointer-events-auto w-full max-w-[95vw] md:max-w-5xl">
      <div 
        className="w-full rounded-[40px] pl-4 pr-8 border-4 shadow-2xl flex items-center gap-6 transition-colors duration-700 h-[140px] backdrop-blur-md relative"
        style={{ backgroundColor: p.card, borderColor: p.accent }}
      >
        
        {/* Dropdown Button */}
        <div className="relative h-full flex items-center border-r-4 pr-6 pl-4" style={{ borderColor: `${p.accent}30` }}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            style={{ color: p.accent }}
          >
            {activeRegion} <i className={`fa-solid fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
          </button>
          
          {dropdownOpen && (
            <div className="absolute bottom-full left-0 mb-4 bg-white border-4 rounded-2xl shadow-xl overflow-hidden min-w-[200px]" style={{ borderColor: p.accent }}>
              {regions.map(r => (
                <div 
                  key={r}
                  onClick={() => { setActiveRegion(r); setPage(0); setDropdownOpen(false); }}
                  className="px-6 py-4 font-black uppercase text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  style={{ color: p.accent, backgroundColor: activeRegion === r ? `${p.accent}20` : 'transparent' }}
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={prev} disabled={page === 0} className={`text-2xl transition-opacity ${page === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-125'}`} style={{ color: p.accent }}><i className="fa-solid fa-chevron-left"></i></button>
        
        <div className="flex gap-6 justify-center flex-1">
          {currentIslands.map(island => (
            <IslandThumbnail key={island.id} island={island} isActive={activeIsland?.id === island.id} onClick={() => setActiveIsland(island)} p={p} />
          ))}
        </div>

        <button onClick={next} disabled={page >= totalPages - 1} className={`text-2xl transition-opacity ${page >= totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-125'}`} style={{ color: p.accent }}><i className="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  );
};

// Variation 3: Carousel Style (Floating Filters + Arrows outside)
export const DockVar3Carousel = ({ islands, activeIsland, setActiveIsland, regions, activeRegion, setActiveRegion, p }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(islands.length / itemsPerPage);
  
  const currentIslands = islands.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const prev = () => setPage(p => Math.max(0, p - 1));
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1));

  return (
    <div className="flex flex-col items-center gap-4 pointer-events-auto">
      {/* Floating Filters */}
      <div className="flex gap-2 bg-white/60 backdrop-blur-md p-1.5 rounded-full border-2 shadow-lg" style={{ borderColor: `${p.accent}30` }}>
        {regions.map(r => (
          <button
            key={r}
            onClick={() => { setActiveRegion(r); setPage(0); }}
            className={`px-5 py-2 rounded-full text-xs font-black uppercase transition-all duration-300`}
            style={{ backgroundColor: activeRegion === r ? p.accent : 'transparent', color: activeRegion === r ? p.card : p.accent }}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={prev} disabled={page === 0} className={`w-14 h-14 rounded-full border-4 flex items-center justify-center shrink-0 transition-transform ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`} style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}><i className="fa-solid fa-chevron-left text-xl"></i></button>
        
        <div 
          className="w-full max-w-3xl rounded-[40px] px-8 border-4 shadow-2xl flex gap-8 transition-colors justify-center items-center h-[140px] backdrop-blur-md"
          style={{ backgroundColor: p.card, borderColor: p.accent }}
        >
          {currentIslands.map(island => (
             <IslandThumbnail key={island.id} island={island} isActive={activeIsland?.id === island.id} onClick={() => setActiveIsland(island)} p={p} />
          ))}
        </div>

        <button onClick={next} disabled={page >= totalPages - 1} className={`w-14 h-14 rounded-full border-4 flex items-center justify-center shrink-0 shadow-lg transition-transform ${page >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`} style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}><i className="fa-solid fa-chevron-right text-xl"></i></button>
      </div>
    </div>
  );
};

// Variation 4: Purist Filter Icon & Bottom Sheet
export const DockVar4FilterIcon = ({ islands, activeIsland, setActiveIsland, regions, activeRegion, setActiveRegion, p }) => {
  const [page, setPage] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(islands.length / itemsPerPage);
  
  const currentIslands = islands.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const prev = () => setPage(p => Math.max(0, p - 1));
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1));

  return (
    <div className="flex items-center gap-6 pointer-events-auto w-full max-w-5xl justify-center">
      
      {/* Purist Filter Button */}
      <button 
        onClick={() => setSheetOpen(!sheetOpen)}
        className="w-16 h-16 rounded-full border-4 flex items-center justify-center shrink-0 shadow-2xl hover:scale-110 transition-transform relative z-50"
        style={{ backgroundColor: sheetOpen ? p.accent : p.card, borderColor: p.accent, color: sheetOpen ? p.card : p.accent }}
      >
        <i className={`fa-solid ${sheetOpen ? 'fa-xmark' : 'fa-filter'} text-2xl`}></i>
      </button>

      {/* Dock (No visible region text) */}
      <div 
        className="relative z-20 w-full max-w-3xl rounded-[40px] px-8 border-4 shadow-2xl flex items-center justify-between transition-colors duration-700 h-[140px] backdrop-blur-md"
        style={{ backgroundColor: p.card, borderColor: p.accent }}
      >
        <button onClick={prev} disabled={page === 0} className={`text-2xl transition-opacity ${page === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-125'}`} style={{ color: p.accent }}><i className="fa-solid fa-chevron-left"></i></button>
        
        <div className="flex gap-6 justify-center flex-1">
          {currentIslands.map(island => (
            <IslandThumbnail key={island.id} island={island} isActive={activeIsland?.id === island.id} onClick={() => setActiveIsland(island)} p={p} />
          ))}
        </div>

        <button onClick={next} disabled={page >= totalPages - 1} className={`text-2xl transition-opacity ${page >= totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-125'}`} style={{ color: p.accent }}><i className="fa-solid fa-chevron-right"></i></button>
      </div>

      {/* Bottom Sheet Overlay */}
      {sheetOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end fade-in">
           <div className="w-full bg-white rounded-t-[40px] border-t-8 p-12 flex flex-col gap-6 shadow-2xl transform transition-transform" style={{ borderColor: p.accent }}>
              <h2 className="text-3xl font-black uppercase tracking-tighter" style={{ color: p.accent }}>Filter op Oceaan</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {regions.map(r => (
                    <button
                      key={r}
                      onClick={() => { setActiveRegion(r); setPage(0); setSheetOpen(false); }}
                      className="py-6 px-4 rounded-2xl border-4 font-black uppercase tracking-widest text-lg hover:scale-105 transition-transform"
                      style={{ 
                        backgroundColor: activeRegion === r ? p.accent : 'transparent',
                        borderColor: p.accent,
                        color: activeRegion === r ? p.card : p.accent
                      }}
                    >
                      {r}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}

    </div>
  );
};
