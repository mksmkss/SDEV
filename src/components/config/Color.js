const Color = {
  defaultBackground: '#efefef',
  black: 'black',
  green1: '#07b86c',
  green2: '#1e8f5e',
  green3: '#26a36d',
  green4: '#b9d08b',
  green5: '#82ba6c',
  green6: '#3ca897',
  blue1: '#363c8f',
  blue2: '#4287f5',
  red1: '#943b3b',
  red2: '#bd4d59',
  white1: '#ffffff',
  white2: '#e9e9e9',
  white3: '#d4d4d4',
  white4: '#bfbfbf',
  white5: '#fafafa',
  gray1: '#333333',
  gray2: '#999999',
  gray3: '#cccccc',
  gray4: '#888888',
  gray5: '#666666',
  replyblue1: '#344955',
  replyblue2: '#497d91',
  replyblue3: '#6599ab',
  cud: { // color universal design
    red: 'rgb(255,75,0)',
    yellow: 'rgb(255,241,0)',
    green: 'rgb(3,175,122)',
    blue: 'rgb(0,90,255)',
    sky: 'rgb(77,196,255)',
    pink: 'rgb(255,128,130)',
    orange: 'rgb(246,170,0)',
    purple: 'rgb(153,0,153)',
    brown: 'rgb(128,64,0)',
    pPink: 'rgb(255,202,191)',
    pCream: 'rgb(255,255,128)',
    pGreen1: 'rgb(216,242,85)',
    pGreen2: 'rgb(119,217,168)',
    pSky: 'rgb(191,228,255)',
    pBrown: 'rgb(255,202,128)',
    pPurple: 'rgb(201,172,230)',
  },
};

export const PastelColors = [
  '#5f7daf',
  '#6eceda',
  '#83b1c9',
  '#838bb2',
  '#909fa6',
  '#917b56',
  '#a2b59f',
  '#a3b6c5',
  '#aeddef',
  '#afafc7',
  '#b1d3c5',
  '#b57fb3',
  '#b97687',
  '#bdc2bb',
  '#bfc8d7',
  '#c3e2dd',
  '#c5dad1',
  '#c6d2be',
  '#c7d6db',
  '#c9ba9b',
  '#c9cbe0',
  '#c9decf',
  '#cacfe3',
  '#cb8a90',
  '#ccdbe2',
  '#ce8467',
  '#cfdd8e',
  '#d2d5b8',
  '#d5cb8e',
  '#d5e1df',
  '#d18063',
  '#dadafc',
  '#deb3cf',
  '#e1dfe8',
  '#e2b3a3',
  '#e2c3c8',
  '#e2d2d2',
  '#e3e2b4',
  '#e4a99b',
  '#e4beb3',
  '#e5bfbc',
  '#e5c1c5',
  '#e8e7d2',
  '#e9ceb9',
  '#e9e0cf',
  '#e098ae',
  '#eacacb',
  '#eadb80',
  '#ebebe3',
  '#ecd4d4',
  '#ede1e3',
  '#eeb8b8',
  '#eecfbb',
  '#efbad6',
  '#f0e4d4',
  '#f1bcae',
  '#f5ddad',
  '#f6b66d',
  '#f7dfd3',
  '#f8dae2',
  '#f9d9ca',
  '#fadcda',
  '#fef5d4',
  '#ffcec7',
  '#ffd0a6',
  '#ffd6aa',
];

export const getRandomPastel = () => {
  const r = Math.floor(Math.random() * PastelColors.length);
  return PastelColors[r];
};

export default Color;
