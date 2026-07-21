import React, { useState, useEffect } from 'react';

// WMO Weather interpretation codes
const weatherCodes = {
  0: { label: 'Helder', icon: 'fa-sun' },
  1: { label: 'Gedeeltelijk bewolkt', icon: 'fa-cloud-sun' },
  2: { label: 'Bewolkt', icon: 'fa-cloud' },
  3: { label: 'Zwaar bewolkt', icon: 'fa-cloud' },
  45: { label: 'Mist', icon: 'fa-smog' },
  48: { label: 'Mist', icon: 'fa-smog' },
  51: { label: 'Lichte motregen', icon: 'fa-cloud-rain' },
  53: { label: 'Motregen', icon: 'fa-cloud-rain' },
  55: { label: 'Zware motregen', icon: 'fa-cloud-rain' },
  61: { label: 'Lichte regen', icon: 'fa-cloud-showers-heavy' },
  63: { label: 'Regen', icon: 'fa-cloud-showers-heavy' },
  65: { label: 'Zware regen', icon: 'fa-cloud-showers-water' },
  71: { label: 'Lichte sneeuw', icon: 'fa-snowflake' },
  73: { label: 'Sneeuw', icon: 'fa-snowflake' },
  75: { label: 'Zware sneeuw', icon: 'fa-snowflake' },
  95: { label: 'Onweer', icon: 'fa-bolt' },
  96: { label: 'Onweer met hagel', icon: 'fa-bolt' },
  99: { label: 'Zwaar onweer', icon: 'fa-bolt' },
};

export default function WeatherWidget({ coordinates, p }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchWeather = async () => {
      if (!coordinates || !coordinates.lat || !coordinates.lng) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lng}&current=temperature_2m,weather_code,is_day&daily=sunrise,sunset&timezone=auto`);
        const data = await res.json();
        
        if (isMounted && data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
            isDay: data.current.is_day,
            sunrise: data.daily?.sunrise?.[0] ? new Date(data.daily.sunrise[0]).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) : '--:--',
            sunset: data.daily?.sunset?.[0] ? new Date(data.daily.sunset[0]).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) : '--:--'
          });
        }
      } catch (e) {
        console.error("Weather fetch failed", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => { isMounted = false; };
  }, [coordinates]);

  if (loading) {
    return <div className="animate-pulse w-32 h-12 bg-black/10 rounded-xl"></div>;
  }

  if (!weather) return null;

  const wData = weatherCodes[weather.code] || { label: 'Onbekend', icon: 'fa-cloud' };
  // If it's night and the code is clear/cloudy, use moon icon
  const displayIcon = !weather.isDay && weather.code <= 1 ? 'fa-moon' : wData.icon;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md px-4 py-3 rounded-2xl border-2 shadow-sm" style={{ borderColor: `${p.accent}20` }}>
        
        {/* Main Temperature & Icon */}
        <div className="flex items-center gap-3">
          <i className={`fa-solid ${displayIcon} text-2xl`} style={{ color: p.accent }}></i>
          <div>
            <div className="text-xl font-black leading-none" style={{ color: p.accent }}>{weather.temp}°C</div>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-80" style={{ color: p.accent }}>{wData.label}</div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-black/10 mx-2"></div>

        {/* Sunrise/Sunset */}
        <div className="flex flex-col gap-1">
           <div className="flex items-center gap-2 text-xs font-bold" style={{ color: p.accent }} title="Zonsopkomst">
             <i className="fa-solid fa-sun text-yellow-500 w-4"></i> <span className="opacity-80">{weather.sunrise}</span>
           </div>
           <div className="flex items-center gap-2 text-xs font-bold" style={{ color: p.accent }} title="Zonsondergang">
             <i className="fa-solid fa-moon text-blue-400 w-4"></i> <span className="opacity-80">{weather.sunset}</span>
           </div>
        </div>

      </div>
    </div>
  );
}
