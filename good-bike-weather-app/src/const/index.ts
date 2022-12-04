export const OFFSET_YEAR = 10

export const WEATHER_PRECIPITATION_API_BASE = process.env.NEXT_PUBLIC_WEATHER_API_BASE as string
export const WEATHER_TEMPERATURE_API_BASE = process.env.NEXT_PUBLIC_WEATHER_TEMPERATURE_API_BASE as string
export const WEATHER_PRECIPITATION_API_KEY = process.env.NEXT_PUBLIC_WEATHER_PRECIPITATION_API_KEY as string
export const WEATHER_TEMPERATURE_API_KEY = process.env.NEXT_PUBLIC_WEATHER_TEMPERATURE_API_KEY as string

export const EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE = {
  attributes: {
    datum: 1307145600000,
    nasledky: 'nehoda s následky na životě nebo zdraví',
    druh_vozidla: 'jízdní kolo',
    globalid: '{054C156B-AB87-4F3F-AD07-81E145FCE56A}',
    alkohol: 'Ano, obsah alkoholu v krvi od 1,0‰ do 1,5‰',
    druh_komun: 'komunikace místní',
    den: 6,
    usmrceno_os: 0,
    mesic_t: 'červen',
    nasledek: 'lehké zranění',
    rok: 2011,
    vek_skupina: '19-24',
    cas: 55,
    point_y: 49.20937458,
    target_fid: 90,
    den_v_tydnu: 'sobota',
    point_x: 16.63597382,
    rozhled: 'dobré',
    misto_nehody: 'žádné nebo žádné z uvedených',
    osoba: 'řidič',
    mesic: 6,
    join_count: 1,
    id: 60206110974.00001,
    stav_vozovky: 'povrch suchý, neznečistěný',
    srazka: 'jiný druh nehody',
    d: -595966.388,
    nazev: 'Brno-sever',
    e: -1159397.444,
    povetrnostni_podm: 'neztížené',
    zavineni: 'řidičem nemotorového vozidla',
    hmotna_skoda: 0,
    lehce_zran_os: 1,
    viditelnost: 'v noci - bez veřejného osvětlení, viditelnost nezhoršená vlivem povětrnostních podmínek',
    pricina: 'nehoda při provádění služebního zákroku (pronásledování pachatele atd.)',
    ozn_osoba: 'bez přilby (pouze u motocyklistů, příp. cyklistů)',
    tezce_zran_os: 0,
    ovlivneni_ridice: 1,
    stav_ridic: 'pod vlivem alkoholu obsah alkoholu v krvi 1 ‰ a víc',
    hodina: 0,
    objectid: 89,
    pohlavi: 'muž',
  },
  geometry: { x: 16.635973826073265, y: 49.209374582087854 },
}

export const YEARS = [
  1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
  1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,
  1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
  2018,
] as const

export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export const DANGER_INDICES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

export const TRANSPORT_TYPES = ['BIKE', 'BUS', 'CAR'] as const

export const API_BRNO_BIKE_ACCIDENTS =
  'https://gis.brno.cz/ags1/rest/services/Hosted/Cyklo_nehody/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'

export const API_BRNO_BIKE_ACCIDENTS_DEV = 'http://localhost:3000/api/accidents/brno-dev'
