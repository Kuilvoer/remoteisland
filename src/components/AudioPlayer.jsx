import React, { useState, useEffect, useRef } from 'react';

const audioTracks = {
  tropical: import.meta.env.BASE_URL + 'audio/tropical.mp3',
  arctic: import.meta.env.BASE_URL + 'audio/arctic.wav',
  desert: import.meta.env.BASE_URL + 'audio/desert.mp3',
  jungle: import.meta.env.BASE_URL + 'audio/jungle.mp3',
  volcanic: import.meta.env.BASE_URL + 'audio/volcanic.mp3',
};

export default function AudioPlayer({ themeType, p }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playersRef = useRef({});
  const activeThemeRef = useRef(null);
  const fadeIntervalsRef = useRef({});

  // Initialize all 5 audio elements once
  useEffect(() => {
    Object.keys(audioTracks).forEach(theme => {
      const audio = new Audio(audioTracks[theme]);
      audio.loop = true;
      audio.preload = 'none'; // Bespaart bandbreedte, pas inladen wanneer nodig!
      audio.volume = 0;
      playersRef.current[theme] = audio;
    });

    return () => {
      // Cleanup on unmount
      Object.values(playersRef.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const crossfade = (oldTheme, newTheme) => {
    const oldAudio = oldTheme ? playersRef.current[oldTheme] : null;
    const newAudio = playersRef.current[newTheme];

    // Fade out old
    if (oldAudio && oldAudio.volume > 0) {
      clearInterval(fadeIntervalsRef.current[oldTheme]);
      fadeIntervalsRef.current[oldTheme] = setInterval(() => {
        let newVol = oldAudio.volume - 0.1;
        if (newVol <= 0.05) {
          oldAudio.volume = 0;
          oldAudio.pause();
          clearInterval(fadeIntervalsRef.current[oldTheme]);
        } else {
          oldAudio.volume = newVol;
        }
      }, 100);
    }

    // Fade in new
    if (newAudio && isPlaying) {
      clearInterval(fadeIntervalsRef.current[newTheme]);
      // Forceer direct inladen van netwerk
      if (newAudio.readyState === 0) newAudio.load();
      newAudio.play().catch(e => console.log("Audio play blocked", e));
      
      fadeIntervalsRef.current[newTheme] = setInterval(() => {
        let newVol = newAudio.volume + 0.1;
        const maxVol = newTheme === 'volcanic' ? 0.9 : 1.0;
        if (newVol >= maxVol - 0.05) {
          newAudio.volume = maxVol;
          clearInterval(fadeIntervalsRef.current[newTheme]);
        } else {
          newAudio.volume = newVol;
        }
      }, 100);
    }
  };

  useEffect(() => {
    const desiredTheme = audioTracks[themeType] ? themeType : 'tropical';
    
    if (activeThemeRef.current !== desiredTheme) {
      if (isPlaying) {
        crossfade(activeThemeRef.current, desiredTheme);
      }
      activeThemeRef.current = desiredTheme;
    }
  }, [themeType, isPlaying]);

  const togglePlay = () => {
    const theme = activeThemeRef.current || (audioTracks[themeType] ? themeType : 'tropical');
    const audio = playersRef.current[theme];
    
    if (isPlaying) {
      // Pause all playing audio
      Object.values(playersRef.current).forEach(a => {
        clearInterval(fadeIntervalsRef.current[a.src]); 
        a.pause();
      });
    } else {
      if (audio) {
        if (audio.readyState === 0) audio.load();
        audio.volume = theme === 'volcanic' ? 0.9 : 1.0;
        audio.play().catch(e => console.log("Audio play blocked", e));
      }
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={togglePlay}
      className="w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0 hover:scale-110 transition-transform bg-white/90 backdrop-blur-sm"
      style={{ borderColor: p.accent, color: p.accent }}
      title={isPlaying ? "Pauzeer Sfeer Audio" : "Speel Sfeer Audio"}
    >
      <i className={`fa-solid ${isPlaying ? 'fa-volume-high' : 'fa-volume-xmark'} text-xl`}></i>
    </button>
  );
}
