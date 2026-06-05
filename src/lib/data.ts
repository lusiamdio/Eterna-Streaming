import { Content, Channel, Download } from '../types';

export const CATALOG: Content[] = [
  {id:0,emoji:'🌌',coverUrl:'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=300&auto=format&fit=crop',title:'Aníkúlápó',sub:'Fantasy Drama',tag:'new',rating:'9.2',year:2025,eps:8,genres:['Fantasy','Drama'],desc:'An epic tale of love, betrayal, and mysticism in the ancient Oyo Empire.',cast:[{emoji:'👩',name:'Sola',role:'Arolake',bg:'#7c5ce8'}],episodes:[]},
  {id:1,emoji:'🔥',coverUrl:'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=300&auto=format&fit=crop',title:'Inception',sub:'Sci-Fi Action',tag:'hot',rating:'8.7',year:2010,eps:null,genres:['Action','Sci-Fi'],desc:'A thief who enters the dreams of others to steal their secrets gets a final chance at redemption.',cast:[{emoji:'👨',name:'Leo',role:'Cobb',bg:'#993c1d'}],episodes:[]},
  {id:2,emoji:'🕵️',coverUrl:'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&auto=format&fit=crop',title:'King of Boys',sub:'Crime Thriller',tag:'4k',rating:'9.0',year:2018,eps:10,genres:['Thriller','Drama'],desc:'A businesswoman and philanthropist with a checkered past is drawn into a power struggle.',cast:[{emoji:'🧔',name:'Shola',role:'Eniola',bg:'#185fa5'}],episodes:[]},
  {id:3,emoji:'⚔️',coverUrl:'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=300&auto=format&fit=crop',title:'The Dark Knight',sub:'Action Thriller',tag:'new',rating:'8.9',year:2008,eps:null,genres:['Action','Hero'],desc:'Batman raises the stakes in his war on crime when a menace known as the Joker wreaks havoc.',cast:[{emoji:'🧔',name:'Christian',role:'Bruce',bg:'#3b6d11'}],episodes:[]},
  {id:4,emoji:'🌊',coverUrl:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop',title:'Avatar: The Way of Water',sub:'Sci-Fi',tag:'hot',rating:'7.8',year:2022,eps:null,genres:['Sci-Fi','Action'],desc:'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',cast:[{emoji:'👩',name:'Zoe',role:'Neytiri',bg:'#185fa5'}],episodes:[]},
  {id:5,emoji:'🚂',coverUrl:'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=300&auto=format&fit=crop',title:'Sista',sub:'Drama',tag:'new',rating:'8.3',year:2023,eps:6,genres:['Drama'],desc:'A struggling single mother faces her past when the father of her children returns.',cast:[{emoji:'👩',name:'Kehinde',role:'Sista',bg:'#993556'}],episodes:[]},
  {id:6,emoji:'🤖',coverUrl:'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&auto=format&fit=crop',title:'Dune: Part Two',sub:'Sci-Fi Epic',tag:'4k',rating:'8.5',year:2024,eps:null,genres:['Sci-Fi','Adventure'],desc:'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge.',cast:[{emoji:'👨',name:'Tim',role:'Paul',bg:'#0f6e56'}],episodes:[]},
  {id:7,emoji:'🏔️',coverUrl:'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=300&auto=format&fit=crop',title:'Jagun Jagun',sub:'Action Action',tag:'new',rating:'9.1',year:2023,eps:null,genres:['Action'],desc:'A young man determined to become a powerful warrior joins an elite army.',cast:[{emoji:'👨',name:'Lateef',role:'Gbotija',bg:'#993c1d'}],episodes:[]},
  {id:8,emoji:'🎭',coverUrl:'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=300&auto=format&fit=crop',title:'Joker',sub:'Psychological Thriller',tag:'hot',rating:'8.2',year:2019,eps:null,genres:['Drama','Thriller'],desc:'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.',cast:[{emoji:'👨',name:'Joaquin',role:'Arthur',bg:'#993556'}],episodes:[]},
  {id:9,emoji:'🌺',coverUrl:'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=300&auto=format&fit=crop',title:'Citation',sub:'Thriller Drama',tag:'4k',rating:'8.8',year:2020,eps:null,genres:['Drama'],desc:'A bright student in Nigeria takes on the academic establishment when she reports a professor.',cast:[{emoji:'👩',name:'Temi',role:'Moremi',bg:'#993556'}],episodes:[]},
  {id:10,emoji:'🦋',coverUrl:'https://images.unsplash.com/photo-1560109947-543149eceb16?q=80&w=300&auto=format&fit=crop',title:'Gangs of Lagos',sub:'Action Crime',tag:'new',rating:'7.9',year:2023,eps:null,genres:['Crime','Action'],desc:'A group of friends who each have to navigate their own destiny, growing up on the bustling streets.',cast:[{emoji:'👨',name:'Tobi',role:'Obalola',bg:'#7c5ce8'}],episodes:[]},
  {id:11,emoji:'🌙',coverUrl:'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=300&auto=format&fit=crop',title:'Oppenheimer',sub:'Historical Drama',tag:'4k',rating:'9.3',year:2023,eps:null,genres:['Drama','History'],desc:'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',cast:[{emoji:'👨',name:'Cillian',role:'Oppie',bg:'#185fa5'}],episodes:[]},
];

export const CHANNELS: Channel[] = [
  {emoji:'📺',name:'Eterna News',cat:'News',live:true},{emoji:'🏆',name:'Eterna Sports',cat:'Sports',live:true},
  {emoji:'🎭',name:'Eterna Cinema',cat:'Movies',live:false},{emoji:'🎵',name:'Eterna Music',cat:'Music',live:true},
  {emoji:'🧒',name:'Eterna Kids',cat:'Kids',live:false},{emoji:'🌍',name:'Eterna World',cat:'Intl',live:false},
  {emoji:'🎮',name:'Eterna Gaming',cat:'E-sports',live:true},{emoji:'🍳',name:'Eterna Food',cat:'Lifestyle',live:false},
  {emoji:'📖',name:'Eterna Docs',cat:'Docs',live:false},{emoji:'🎤',name:'Eterna Talent',cat:'Reality',live:true},
];

export const DOWNLOADS_INIT: Download[] = [
  {emoji:'🌌',title:'Nebula Rising — S1:E1-3',meta:'3 Episodes · Sci-Fi',size:'2.8 GB',prog:100,id:'nebula'},
  {emoji:'🔥',title:'Inferno Protocol',meta:'Action Movie · 2h 18m',size:'3.2 GB',prog:100,id:'inferno'},
  {emoji:'🕵️',title:'The Watcher — S2:E1',meta:'Thriller · Episode 1',size:'1.1 GB',prog:100,id:'watcher'},
  {emoji:'🚂',title:'Orient Express',meta:'Drama · Downloading…',size:'1.4 GB',prog:68,id:'orient'},
];
