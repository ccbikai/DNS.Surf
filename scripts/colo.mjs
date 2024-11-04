import fs from 'node:fs'
import locations from './locations.json' with { type: 'json' }
// wget "https://speed.cloudflare.com/locations" -o scripts/locations.json

const displayNames = new Intl.DisplayNames(['en-US'], { type: 'region' })

const COLOS = Object.values(locations)
  .reduce((acc, location) => {
    if (location.iata && location.city) {
      acc[location.iata?.toUpperCase()] = {
        country: location.cca2?.toUpperCase(),
        location: [location.city, displayNames.of(location.cca2?.toUpperCase())].filter(Boolean).join(', '),
      }
    }
    return acc
  }, {})

fs.writeFileSync('./colo.json', JSON.stringify(COLOS, null, 2))
