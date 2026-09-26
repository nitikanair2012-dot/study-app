export const THEMES = {
  dustyRose: {
    name: 'Dusty Rose',
    primary: '#F8DCD9',
    accent: '#D4A8A0',
    light: '#FDEEF0',
    dark: '#8B6B65',
    background: '#F8DCD9',
  },
  deepIndigo: {
    name: 'Deep Indigo',
    primary: '#474C80',
    accent: '#6B7FA8',
    light: '#E8EBF5',
    dark: '#2D3156',
    background: '#474C80',
  },
  slateGray: {
    name: 'Slate Gray',
    primary: '#708090',
    accent: '#8FA0B0',
    light: '#E8EDF2',
    dark: '#4A5568',
    background: '#708090',
  },
  sageGreen: {
    name: 'Sage Green',
    primary: '#848D5D',
    accent: '#9CA89C',
    light: '#E8ECE0',
    dark: '#5A6642',
    background: '#848D5D',
  },
  paleGolden: {
    name: 'Deep Maroon',
    primary: '#460404',
    accent: '#941d1d',
    light: '#db9b9b',
    dark: '#882525',
    background: '#9c1313',
  },
  warmBrown: {
    name: 'Warm Brown',
    primary: '#3C2218',
    accent: '#5A4A42',
    light: '#f0e9dd',
    dark: '#5a3627',
    background: '#6d1f00',
  },
  creamAccent: {
    name: 'Cream Accent',
    primary: '#EEEBDA',
    accent: '#D4C4B0',
    light: '#FFFEF0',
    dark: '#5A4A42',
    background: '#EEEBDA',
  },
  darkMode: {
    name: 'Dark Mode',
    primary: '#E8DCC8',
    accent: '#D4A574',
    light: '#3a3a3a',
    dark: '#0f0f0f',
    background: '#1a1a1a',
  },
};

export const getTheme = (themeName) => THEMES[themeName] || THEMES.dustyRose;

export const applyTheme = (theme) => {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-light', theme.light);
  root.style.setProperty('--color-dark', theme.dark);
  root.style.setProperty('--color-background', theme.background);
  
  // Update body background with the theme color
  if (theme.name.includes('Dark')) {
    document.body.style.background = `linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)`;
    document.body.style.color = '#E8DCC8';
  } else {
    // Create a subtle gradient with the theme background color
    document.body.style.background = `linear-gradient(135deg, ${theme.background}40 0%, ${theme.background}20 50%, ${theme.background}10 100%)`;
    document.body.style.color = '#5a4a42';
  }
};
