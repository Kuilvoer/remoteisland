import React from 'react';
import WeatherWidget from '../components/WeatherWidget';

export default function DetailPage({ island, p, onBack }) {
    if (!island) return null;

  return (
    <div className={`w-full max-w-6xl mx-auto pb-16 px-4 font-['Outfit'] fade-in transition-all duration-700`}>
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-6 px-8 py-3 rounded-full border-4 font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform"
        style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Terug naar overzicht
      </button>

      {/* Hero Section */}
      <div className="flex flex-col mb-12 z-10">
        <div 
          className={`relative w-full h-[30vh] md:h-[50vh] rounded-[40px] overflow-hidden border-4 mb-6`}
          style={{ borderColor: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
        >
          <img src={island.media?.images?.heroDesktop || `https://flagcdn.com/w320/${island.media?.countryCode}.png`} className="w-full h-full object-cover" />
        </div>
        
        <div 
          className="w-full px-6 md:px-10 py-6 md:py-8 rounded-[40px] border-4 shadow-xl relative"
          style={{ backgroundColor: `${p.card}dd`, borderColor: p.accent }}
        >
          <div className="flex items-center gap-4 mb-2">
            <img src={`https://flagcdn.com/w320/${island.media?.countryCode}.png`} className="w-8 h-8 rounded-full border-2" style={{ borderColor: p.accent }} />
            {island.name !== island.country && (
              <span className="font-bold text-sm md:text-base uppercase tracking-widest" style={{ color: p.accent }}>{island.country}</span>
            )}
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-lg break-words hyphens-auto" style={{ color: p.accent }}>{island.name}</h1>
          {island.logistics?.tags && island.logistics.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {island.logistics.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full border-2 text-[10px] font-black uppercase tracking-widest bg-white/60 backdrop-blur-sm shadow-sm" style={{ borderColor: p.accent, color: p.accent }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Text & Story */}
        <div className="md:col-span-2 flex flex-col gap-8">
          
          <div 
            className={`p-10 rounded-[40px] border-4`}
            style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
          >
            <h2 className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight break-words hyphens-auto">Het Verhaal van {island.name}</h2>
            <p className="text-lg font-medium leading-relaxed opacity-90 mb-4">{island.story?.description}</p>
            <p className="text-lg font-medium leading-relaxed opacity-90">Dit eiland biedt een unieke ervaring ver weg van de bewoonde wereld. De natuur is ongerept en de cultuur is diep geworteld in de geschiedenis van de regio. Ideaal voor de echte ontdekkingsreiziger.</p>
          </div>

          {/* Flora / Fauna Fact */}
          <div 
            className="p-10 rounded-[40px] border-4 shadow-xl"
            style={{ backgroundColor: p.accent, borderColor: p.accent, color: p.card }}
          >
            <h2 className="text-2xl font-black mb-4 uppercase tracking-widest" style={{ color: p.bg }}>Natuurlijke Wonderen</h2>
            <p className="text-lg font-medium leading-relaxed opacity-90">{island.story?.floraFauna}</p>
          </div>
          
          <div 
            className="p-10 rounded-[40px] border-4 shadow-xl"
            style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}
          >
            <h2 className="text-2xl font-black mb-4 uppercase tracking-widest">Connectiviteit</h2>
            <p className="text-lg font-medium leading-relaxed opacity-90">{island.economyAndCulture?.connectivity}</p>
          </div>

          {island.economyAndCulture?.souvenirTip && (
            <div 
              className="p-10 rounded-[40px] border-4 shadow-xl"
              style={{ backgroundColor: p.bg, borderColor: p.accent, color: p.accent }}
            >
              <div className="flex items-center gap-4 mb-4">
                <i className="fa-solid fa-gift text-2xl"></i>
                <h2 className="text-2xl font-black uppercase tracking-widest">Souvenir Tip</h2>
              </div>
              <p className="text-lg font-medium leading-relaxed opacity-90">{island.economyAndCulture.souvenirTip}</p>
            </div>
          )}

          {island.hazards && island.hazards.length > 0 && (
            <div 
              className="p-10 rounded-[40px] border-4 shadow-xl"
              style={{ backgroundColor: '#ffebee', borderColor: '#c62828', color: '#c62828' }}
            >
              <h2 className="text-2xl font-black mb-4 uppercase tracking-widest">Gevaren / Waarschuwingen</h2>
              <ul className="list-disc list-inside text-lg font-medium leading-relaxed opacity-90">
                {island.hazards.map((hazard, idx) => (
                  <li key={idx}>{hazard}</li>
                ))}
              </ul>
            </div>
          )}

          {island.story?.history && island.story.history.length > 0 && (
            <div 
              className="p-10 rounded-[40px] border-4 shadow-xl"
              style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent }}
            >
              <h2 className="text-2xl font-black mb-4 uppercase tracking-widest">Tijdlijn</h2>
              <div className="flex flex-col gap-4">
                {island.story.history.map((h, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="font-black text-xl shrink-0" style={{ color: p.accent }}>{h.year}</span>
                    <p className="text-lg font-medium opacity-90">{h.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right: Sidebar Stats */}
        <div className="flex flex-col gap-8">
          
          <div 
            className={`p-8 rounded-[40px] border-4`}
            style={{ backgroundColor: p.card, borderColor: p.accent, color: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
          >
            <h3 className="text-xl font-black mb-8 border-b-4 pb-4 uppercase tracking-widest" style={{ borderColor: p.accent }}>Feiten & Cijfers</h3>
            
            <div className="mb-6">
              <span className="text-xs uppercase font-black opacity-60 tracking-widest">Locatie</span>
              <p className="text-2xl font-black">{island.location?.lat.toFixed(2)}, {island.location?.lng.toFixed(2)}</p>
            </div>
            <div className="mb-6">
              <span className="text-xs uppercase font-black opacity-60 tracking-widest">Inwoners</span>
              <p className="text-2xl font-black">{island.stats?.population === 0 ? 'Onbewoond' : island.stats?.population.toLocaleString('nl-NL')}</p>
            </div>
            <div className="mb-6">
              <span className="text-xs uppercase font-black opacity-60 tracking-widest">Afstand tot vasteland</span>
              <p className="text-2xl font-black">{island.stats?.distanceToMainlandKm?.toLocaleString('nl-NL')} km</p>
            </div>
            {island.stats?.areaSqKm && (
              <div className="mb-6">
                <span className="text-xs uppercase font-black opacity-60 tracking-widest">Oppervlakte</span>
                <p className="text-2xl font-black">{island.stats.areaSqKm.toLocaleString('nl-NL')} km²</p>
              </div>
            )}
            {island.stats?.highestPointMeters && (
              <div className="mb-6">
                <span className="text-xs uppercase font-black opacity-60 tracking-widest">Hoogste Punt</span>
                <p className="text-2xl font-black">{island.stats.highestPointMeters.toLocaleString('nl-NL')} m</p>
              </div>
            )}
            {island.economyAndCulture?.currencyCode && (
              <div className="mb-6">
                <span className="text-xs uppercase font-black opacity-60 tracking-widest">Valuta</span>
                <p className="text-2xl font-black">{island.economyAndCulture.currencyCode}</p>
              </div>
            )}
            <div className="mb-6">
              <span className="text-xs uppercase font-black opacity-60 tracking-widest">Regio</span>
              <p className="text-2xl font-black">{island.region}</p>
            </div>
          </div>

          <div 
            className={`p-8 rounded-[40px] border-4`}
            style={{ backgroundColor: p.bg, borderColor: p.accent, color: p.accent, boxShadow: `12px 12px 0px ${p.accent}` }}
          >
            <h3 className="text-xl font-black mb-6 uppercase tracking-widest">Actueel Weer</h3>
            <WeatherWidget coordinates={island.location} p={p} />
          </div>

        </div>

      </div>

      {/* Logistics Reality Check */}
      {(() => {
        if (!island.logistics?.journey && !island.logistics?.route) return null;

        const journey = island.logistics?.journey || {};
        const routeText = island.logistics?.route || '';

        // Helper parsers
        const parseV1 = (text) => {
          if (!text) return [{ city: 'Vasteland', country: '' }];
          return text.split(/\s+of\s+/).map(part => {
            const match = part.match(/^(.*?)\s*(?:\((.*?)\))?$/);
            let city = match ? match[1].trim() : part.trim();
            let country = match && match[2] ? match[2].trim() : '';
            city = city.replace(/[.,;:]$/, '');
            return { city, country };
          });
        };

        const formatDataWithBold = (text) => {
          if (!text) return null;
          text = text.replace(/\.$/, '');
          const match = text.match(/^([~<]?\s*\d+.*?(?:uur|dagen|dag|weken|week|km|kilometer|mijl|minuten))\s*(.*)$/i);
          if (match) {
            return <><span className="font-bold text-gray-900">{match[1]}</span> <span className="font-normal text-gray-700">{match[2]}</span></>;
          }
          return <span className="font-bold text-gray-900">{text}</span>;
        };

        const cleanString = (text) => text ? text.replace(/\.$/, '') : '';

        return (
          <div className="w-full mt-12 bg-white/40 backdrop-blur-md border-4 rounded-[40px] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1" style={{ borderColor: p.accent }}>
            <h3 className="text-3xl font-black uppercase tracking-widest mb-8" style={{ color: p.accent }}>Hoe kom je er?</h3>
            
            {island.logistics?.journey ? (
              <div className="flex flex-col xl:flex-row w-full border-4 rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] bg-white" style={{ borderColor: p.accent }}>
                
                {/* Block 1: Vertrek (V1/V4) */}
                <div className="flex-1 p-6 md:p-8 flex flex-col text-left border-b-4 xl:border-b-0 xl:border-r-4" style={{ borderColor: p.accent }}>
                  <span className="text-sm font-black uppercase tracking-widest mb-6 opacity-60" style={{ color: p.accent }}>Vertrek</span>
                  <div className="flex flex-col gap-5">
                    {parseV1(journey.vanaf).map((loc, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900 leading-tight">{loc.city}</span>
                        {loc.country && <span className="text-sm font-medium text-gray-500 mt-1">{loc.country}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Block 2: Transport (V1/V4) */}
                <div className="flex-[2] p-6 md:p-8 flex flex-col text-left border-b-4 xl:border-b-0 xl:border-r-4 relative" style={{ borderColor: p.accent }}>
                  <span className="text-sm font-black uppercase tracking-widest mb-6 opacity-60" style={{ color: p.accent }}>Vervoer</span>
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <p className="text-xl font-bold text-gray-900">{cleanString(journey.vervoer)}</p>
                      {journey.tussenstops && (
                        <p className="text-sm font-medium text-gray-600 mt-2 max-w-lg leading-relaxed">{cleanString(journey.tussenstops)}</p>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8 pt-6 border-t-2" style={{ borderColor: p.accent + '40' }}>
                      {journey.reistijd && (
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase opacity-50 mb-1" style={{ color: p.accent }}>Reistijd</span>
                          <span className="text-base">{formatDataWithBold(journey.reistijd)}</span>
                        </div>
                      )}
                      {journey.afstand && (
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase opacity-50 mb-1" style={{ color: p.accent }}>Afstand</span>
                          <span className="text-base">{formatDataWithBold(journey.afstand)}</span>
                        </div>
                      )}
                      {journey.permitRequired && (
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase opacity-50 mb-1" style={{ color: p.accent }}>Vergunning</span>
                          <span className="text-base font-bold text-gray-900">Vereist</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Block 3: Aankomst (V1/V4) */}
                <div className="flex-1 p-6 md:p-8 flex flex-col text-left justify-between" style={{ backgroundColor: p.accent, color: p.bg }}>
                  <span className="text-sm font-black uppercase tracking-widest mb-6 opacity-70">Aankomst</span>
                  <div className="mt-auto">
                    <i className="fa-solid fa-location-dot text-4xl mb-4 opacity-90"></i>
                    <h4 className="text-2xl font-black leading-tight tracking-wide">{island.name}</h4>
                  </div>
                </div>
                
              </div>
            ) : (
              <div className="p-8 rounded-3xl border-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]" style={{ borderColor: p.accent }}>
                <p className="text-lg font-medium text-gray-800 leading-relaxed">{cleanString(routeText)}</p>
              </div>
            )}
          </div>
        );
      })()}
      
      <div className="h-32"></div>

    </div>
  );
}
