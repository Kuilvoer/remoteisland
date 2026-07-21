import fs from 'fs';

const islands = [
  // Stille Oceaan
  { id: 'tahiti', title: 'Tahiti', name: 'Tahiti', countryCode: 'pf', country: 'Frans-Polynesië', region: 'Stille Oceaan', target: 'Australië', fact: 'Het overwater bungalow concept werd in de jaren 60 bedacht in Tahiti.' },
  { id: 'easterisland', title: 'Easter_Island', name: 'Paaseiland', countryCode: 'cl', country: 'Chili', region: 'Stille Oceaan', target: 'Zuid-Amerika', fact: 'Beroemd om de bijna 1000 monumentale stenen beelden (Moai).' },
  { id: 'pitcairn', title: 'Pitcairn_Islands', name: 'Pitcairn', countryCode: 'pn', country: 'Verenigd Koninkrijk', region: 'Stille Oceaan', target: 'Zuid-Amerika', fact: 'De bevolking stamt grotendeels af van de muiters van de HMS Bounty.' },
  { id: 'borabora', title: 'Bora_Bora', name: 'Bora Bora', countryCode: 'pf', country: 'Frans-Polynesië', region: 'Stille Oceaan', target: 'Australië', fact: 'Tijdens WOII was dit een belangrijke Amerikaanse bevoorradingsbasis.' },
  { id: 'fiji', title: 'Fiji', name: 'Fiji', countryCode: 'fj', country: 'Fiji', region: 'Stille Oceaan', target: 'Australië', fact: 'Fiji bestaat uit meer dan 330 eilanden, waarvan 110 bewoond.' },
  { id: 'vanuatu', title: 'Vanuatu', name: 'Vanuatu', countryCode: 'vu', country: 'Vanuatu', region: 'Stille Oceaan', target: 'Australië', fact: 'Bungeejumpen vindt zijn oorsprong in het rituele landduiken hier.' },
  { id: 'tuvalu', title: 'Tuvalu', name: 'Tuvalu', countryCode: 'tv', country: 'Tuvalu', region: 'Stille Oceaan', target: 'Australië', fact: 'Een van de kleinste en meest laaggelegen landen ter wereld.' },
  { id: 'kiribati', title: 'Kiribati', name: 'Kiribati', countryCode: 'ki', country: 'Kiribati', region: 'Stille Oceaan', target: 'Hawaï', fact: 'Ligt in alle vier de halfronden van de aarde.' },
  { id: 'nauru', title: 'Nauru', name: 'Nauru', countryCode: 'nr', country: 'Nauru', region: 'Stille Oceaan', target: 'Australië', fact: 'De kleinste eilandrepubliek ter wereld.' },
  { id: 'galapagos', title: 'Galápagos_Islands', name: 'Galapagoseilanden', countryCode: 'ec', country: 'Ecuador', region: 'Stille Oceaan', target: 'Zuid-Amerika', fact: 'De observaties hier leidden tot Darwin\'s evolutietheorie.' },
  { id: 'samoa', title: 'Samoa', name: 'Samoa', countryCode: 'ws', country: 'Samoa', region: 'Stille Oceaan', target: 'Nieuw-Zeeland', fact: 'Heeft in 2011 een dag overgeslagen om naar de andere kant van de datumgrens te gaan.' },
  { id: 'tonga', title: 'Tonga', name: 'Tonga', countryCode: 'to', country: 'Tonga', region: 'Stille Oceaan', target: 'Nieuw-Zeeland', fact: 'Het enige koninkrijk in de Stille Oceaan dat nooit volledig is gekoloniseerd.' },
  { id: 'cookislands', title: 'Cook_Islands', name: 'Cookeilanden', countryCode: 'ck', country: 'Nieuw-Zeeland', region: 'Stille Oceaan', target: 'Nieuw-Zeeland', fact: 'Vernoemd naar ontdekkingsreiziger James Cook.' },
  { id: 'niue', title: 'Niue', name: 'Niue', countryCode: 'nu', country: 'Nieuw-Zeeland', region: 'Stille Oceaan', target: 'Nieuw-Zeeland', fact: 'Een van de grootste koraaleilanden ter wereld.' },
  { id: 'tokelau', title: 'Tokelau', name: 'Tokelau', countryCode: 'tk', country: 'Nieuw-Zeeland', region: 'Stille Oceaan', target: 'Nieuw-Zeeland', fact: 'Weckt bijna 100% van zijn elektriciteit op via zonne-energie.' },
  { id: 'wallis', title: 'Wallis_and_Futuna', name: 'Wallis en Futuna', countryCode: 'wf', country: 'Frankrijk', region: 'Stille Oceaan', target: 'Australië', fact: 'Heeft nog steeds drie traditionele koningen.' },
  { id: 'palau', title: 'Palau', name: 'Palau', countryCode: 'pw', country: 'Palau', region: 'Stille Oceaan', target: 'Filipijnen', fact: 'Bekend om het unieke kwallenmeer waar kwallen niet steken.' },
  { id: 'micronesia', title: 'Federated_States_of_Micronesia', name: 'Micronesië', countryCode: 'fm', country: 'Micronesië', region: 'Stille Oceaan', target: 'Filipijnen', fact: 'Bestaat uit 607 eilanden verspreid over 2.700 kilometer oceaan.' },
  { id: 'marshall', title: 'Marshall_Islands', name: 'Marshalleilanden', countryCode: 'mh', country: 'Marshalleilanden', region: 'Stille Oceaan', target: 'Hawaï', fact: 'Locatie van de bekende Bikini Atol kernproeven.' },
  { id: 'marquesas', title: 'Marquesas_Islands', name: 'Markiezen', countryCode: 'pf', country: 'Frans-Polynesië', region: 'Stille Oceaan', target: 'Zuid-Amerika', fact: 'Paul Gauguin en Jacques Brel brachten hier hun laatste jaren door.' },

  // Atlantisch & Europa
  { id: 'tristan', title: 'Tristan_da_Cunha', name: 'Tristan da Cunha', countryCode: 'sh', country: 'Verenigd Koninkrijk', region: 'Atlantisch', target: 'Afrika', fact: 'De meest afgelegen permanent bewoonde eilandengroep ter wereld.' },
  { id: 'bermuda', title: 'Bermuda', name: 'Bermuda', countryCode: 'bm', country: 'Verenigd Koninkrijk', region: 'Atlantisch', target: 'Noord-Amerika', fact: 'Bekend om de roze zandstranden en de Bermuda Driehoek.' },
  { id: 'ascension', title: 'Ascension_Island', name: 'Ascension', countryCode: 'sh', country: 'Verenigd Koninkrijk', region: 'Atlantisch', target: 'Afrika', fact: 'Darwin hielp hier bij het creëren van een kunstmatig ecosysteem.' },
  { id: 'sainthelena', title: 'Saint_Helena', name: 'Sint-Helena', countryCode: 'sh', country: 'Verenigd Koninkrijk', region: 'Atlantisch', target: 'Afrika', fact: 'De verbanningsoord van Napoleon Bonaparte tot zijn dood.' },
  { id: 'falkland', title: 'Falkland_Islands', name: 'Falklandeilanden', countryCode: 'fk', country: 'Verenigd Koninkrijk', region: 'Atlantisch', target: 'Zuid-Amerika', fact: 'Er wonen meer schapen en pinguïns dan mensen.' },
  { id: 'azores', title: 'Azores', name: 'Azoren', countryCode: 'pt', country: 'Portugal', region: 'Atlantisch', target: 'Europa', fact: 'Onderdeel van de Midden-Atlantische Rug die boven water uitsteekt.' },
  { id: 'capeverde', title: 'Cape_Verde', name: 'Kaapverdië', countryCode: 'cv', country: 'Kaapverdië', region: 'Atlantisch', target: 'Afrika', fact: 'Een archipel van vulkanische oorsprong ten westen van Senegal.' },
  { id: 'faroe', title: 'Faroe_Islands', name: 'Faeröer', countryCode: 'fo', country: 'Denemarken', region: 'Atlantisch', target: 'Europa', fact: 'Er zijn geen inheemse bomen op de eilanden.' },
  { id: 'greenland', title: 'Greenland', name: 'Groenland', countryCode: 'gl', country: 'Denemarken', region: 'Atlantisch', target: 'Noord-Amerika', fact: 'Het grootste eiland ter wereld dat geen continent is.' },
  { id: 'iceland', title: 'Iceland', name: 'IJsland', countryCode: 'is', country: 'IJsland', region: 'Atlantisch', target: 'Europa', fact: 'Ligt precies op de grens van twee tektonische platen.' },
  { id: 'svalbard', title: 'Svalbard', name: 'Spitsbergen', countryCode: 'sj', country: 'Noorwegen', region: 'Noordpool', target: 'Europa', fact: 'Heeft een wereldzaadbank (Global Seed Vault) diep in de berg.' },
  
  // Indische Oceaan
  { id: 'cocos', title: 'Cocos_(Keeling)_Islands', name: 'Cocoseilanden', countryCode: 'cc', country: 'Australië', region: 'Indische Oceaan', target: 'Australië', fact: 'Ontdekt in 1609 en een klassiek koraalatol.' },
  { id: 'christmas', title: 'Christmas_Island', name: 'Christmaseiland', countryCode: 'cx', country: 'Australië', region: 'Indische Oceaan', target: 'Azië', fact: 'Wereldberoemd om de massale migratie van rode krabben.' },
  { id: 'maldives', title: 'Maldives', name: 'Malediven', countryCode: 'mv', country: 'Malediven', region: 'Indische Oceaan', target: 'Azië', fact: 'Het laagstgelegen land ter wereld.' },
  { id: 'seychelles', title: 'Seychelles', name: 'Seychellen', countryCode: 'sc', country: 'Seychellen', region: 'Indische Oceaan', target: 'Afrika', fact: 'De eilanden bestaan uit zeldzaam graniet.' },
  { id: 'mauritius', title: 'Mauritius', name: 'Mauritius', countryCode: 'mu', country: 'Mauritius', region: 'Indische Oceaan', target: 'Afrika', fact: 'De enige plek ter wereld waar de inmiddels uitgestorven Dodo leefde.' },
  { id: 'reunion', title: 'Réunion', name: 'Réunion', countryCode: 're', country: 'Frankrijk', region: 'Indische Oceaan', target: 'Afrika', fact: 'Heeft een van de meest actieve vulkanen ter wereld, de Piton de la Fournaise.' },
  { id: 'socotra', title: 'Socotra', name: 'Socotra', countryCode: 'ye', country: 'Jemen', region: 'Indische Oceaan', target: 'Midden-Oosten', fact: 'Een derde van het plantenleven hier komt nergens anders ter wereld voor.' },
  { id: 'andaman', title: 'Andaman_Islands', name: 'Andamanen', countryCode: 'in', country: 'India', region: 'Indische Oceaan', target: 'Azië', fact: 'Thuisbasis van inheemse stammen die nog nauwelijks contact met de buitenwereld hebben.' },
  { id: 'nicobar', title: 'Nicobar_Islands', name: 'Nicobaren', countryCode: 'in', country: 'India', region: 'Indische Oceaan', target: 'Azië', fact: 'Toegang is strikt beperkt voor buitenlanders.' },
  
  // Zuidelijke Oceaan (Subantarctisch)
  { id: 'kerguelen', title: 'Kerguelen_Islands', name: 'Kerguelen', countryCode: 'tf', country: 'Frankrijk', region: 'Zuidpool', target: 'Antarctica', fact: 'Staat bekend als de Desolation Islands vanwege het ruige klimaat.' },
  { id: 'southgeorgia', title: 'South_Georgia', name: 'Zuid-Georgia', countryCode: 'gs', country: 'Verenigd Koninkrijk', region: 'Zuidpool', target: 'Zuid-Amerika', fact: 'Miljoenen pinguïns en zeehonden verzamelen zich hier tijdens de zomer.' },
  { id: 'bouvet', title: 'Bouvet_Island', name: 'Bouveteiland', countryCode: 'bv', country: 'Noorwegen', region: 'Zuidpool', target: 'Antarctica', fact: 'Het meest afgelegen onbewoonde eiland ter wereld.' },
  { id: 'macquarie', title: 'Macquarie_Island', name: 'Macquarie-eiland', countryCode: 'au', country: 'Australië', region: 'Zuidpool', target: 'Nieuw-Zeeland', fact: 'De enige plek waar rotsen uit de aardmantel actief boven zeeniveau worden gedrukt.' },
  { id: 'heard', title: 'Heard_Island_and_McDonald_Islands', name: 'Heard Island', countryCode: 'hm', country: 'Australië', region: 'Zuidpool', target: 'Antarctica', fact: 'Heeft de enige actieve vulkanen in Australisch territorium.' },
  { id: 'crozet', title: 'Crozet_Islands', name: 'Crozeteilanden', countryCode: 'tf', country: 'Frankrijk', region: 'Zuidpool', target: 'Afrika', fact: 'Thuishaven voor vier soorten pinguïns in gigantische kolonies.' },
  { id: 'stpaul', title: 'Île_Saint-Paul', name: 'Saint-Paul', countryCode: 'tf', country: 'Frankrijk', region: 'Zuidpool', target: 'Australië', fact: 'Het eiland is in feite de top van een actieve vulkaan.' },
  { id: 'amsterdam', title: 'Île_Amsterdam', name: 'Amsterdam eiland', countryCode: 'tf', country: 'Frankrijk', region: 'Zuidpool', target: 'Afrika', fact: 'Ontdekt in 1522 door de Spaanse ontdekkingsreiziger Juan Sebastián Elcano.' },
  { id: 'chagos', title: 'Chagos_Archipelago', name: 'Chagosarchipel', countryCode: 'io', country: 'Verenigd Koninkrijk', region: 'Indische Oceaan', target: 'Azië', fact: 'Bevat een van de grootste en best bewaarde koraalriffen ter wereld.' }
];

async function fetchIslandData() {
  console.log(`Starting data enrichment for ${islands.length} islands...`);
  const enriched = [];

  for (const island of islands) {
    console.log(`Fetching data for ${island.name}...`);
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${island.title}`, {
        headers: { 'User-Agent': 'IslandExplorerApp/1.0 (test@example.com)' }
      });
      
      if (!res.ok) {
        console.log(`Failed for ${island.name} - Status: ${res.status}`);
        throw new Error('API failed');
      }

      const data = await res.json();
      
      const desc = data.extract || island.fact;
      const imageUrl = data.originalimage?.source || `https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1600`;
      
      let coordsStr = 'Onbekend';
      if (data.coordinates) {
        coordsStr = `${Math.abs(data.coordinates.lat).toFixed(2)}°${data.coordinates.lat > 0 ? 'N' : 'S'} ${Math.abs(data.coordinates.lon).toFixed(2)}°${data.coordinates.lon > 0 ? 'E' : 'W'}`;
      }

      const getTheme = (region) => {
        if (region === 'Noordpool' || region === 'Zuidpool') return 'arctic';
        if (region === 'Stille Oceaan') return Math.random() > 0.5 ? 'tropical' : 'sunset';
        if (region === 'Indische Oceaan') return 'jungle';
        return 'volcanic';
      };

      enriched.push({
        id: island.id,
        name: island.name,
        country: island.country,
        region: island.region,
        themeType: getTheme(island.region),
        coordinates: coordsStr,
        distance: island.distance || Math.floor(Math.random() * 4000) + 1000,
        target: island.target,
        population: island.population || Math.floor(Math.random() * 50000),
        description: desc,
        fact: island.fact,
        imageUrlHero: imageUrl,
        imageUrlSmall1: imageUrl, 
        imageUrlSmall2: imageUrl,
        flagUrl: `https://flagcdn.com/w160/${island.countryCode}.png`,
        facilities: island.facilities || ["Onderzoekscentrum", "Haven", "Kliniek"],
        weather: { temp: Math.floor(Math.random() * 30), condition: "Licht bewolkt", wind: "15 km/h", humidity: "75%", waterTemp: "20°C" }
      });
      
    } catch (e) {
      const getTheme = (region) => {
        if (region === 'Noordpool' || region === 'Zuidpool') return 'arctic';
        if (region === 'Stille Oceaan') return Math.random() > 0.5 ? 'tropical' : 'sunset';
        if (region === 'Indische Oceaan') return 'jungle';
        return 'volcanic';
      };

      // Fallback
      enriched.push({
        id: island.id,
        name: island.name,
        country: island.country,
        region: island.region,
        themeType: getTheme(island.region),
        coordinates: 'Onbekend',
        distance: island.distance || Math.floor(Math.random() * 4000) + 1000,
        target: island.target,
        population: island.population || Math.floor(Math.random() * 50000),
        description: island.fact,
        fact: island.fact,
        imageUrlHero: `https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1600`,
        imageUrlSmall1: `https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1600`,
        imageUrlSmall2: `https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1600`,
        flagUrl: `https://flagcdn.com/w160/${island.countryCode}.png`,
        facilities: ["Haven", "Kliniek"],
        weather: { temp: 20, condition: "Onbekend", wind: "10 km/h", humidity: "50%", waterTemp: "18°C" }
      });
    }
    
    // 500ms delay to avoid rate limits
    await new Promise(r => setTimeout(r, 500));
  }

  const fileContent = `// Auto-generated enriched data
export const islandsData = ${JSON.stringify(enriched, null, 2)};
`;

  fs.writeFileSync('./src/data/islandsData.js', fileContent);
  console.log('Successfully wrote enriched data to src/data/islandsData.js!');
}

fetchIslandData();
