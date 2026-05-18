const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const colorPreview = document.getElementById('color-preview');
const solidInfo = document.getElementById('solid-info');
const gradientInfo = document.getElementById('gradient-info');
const hexValue = document.getElementById('hex-value');
const rgbValue = document.getElementById('rgb-value');
const gradientCss = document.getElementById('gradient-css');
const generateSolidBtn = document.getElementById('generate-solid');
const generateGradientBtn = document.getElementById('generate-gradient');
const copyBtn = document.getElementById('copy-btn');
const recentColorsContainer = document.getElementById('recent-colors');

let currentMode = 'solid'; 
let currentSolidColor = { hex: '#3498db', rgb: 'rgb(52, 152, 219)' };
let currentGradientCSS = 'linear-gradient(135deg, #ff7e5f, #feb47b)';

const randomHex = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const STORAGE_KEY = 'recentColors';
let recentColors = [];

const loadRecentColors = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    recentColors = JSON.parse(saved);
  }
};

const saveRecentColors = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recentColors));
};

const addToRecentColors = (hex) => {
  recentColors = recentColors.filter(c => c !== hex);
  recentColors.unshift(hex);
  if (recentColors.length > 10) recentColors.pop();
  saveRecentColors();
  renderRecentColors();
};

const renderRecentColors = () => {
  recentColorsContainer.innerHTML = '';
  recentColors.forEach(hex => {
    const circle = document.createElement('div');
    circle.className = 'color-circle';
    circle.style.backgroundColor = hex;
    circle.title = hex;
    circle.addEventListener('click', () => setSolidColor(hex));
    recentColorsContainer.appendChild(circle);
  });
};

const setSolidColor = (hex) => {
  currentMode = 'solid';
  currentSolidColor.hex = hex;
  currentSolidColor.rgb = hexToRgb(hex);

  body.style.background = hex;
  colorPreview.style.background = hex;

  hexValue.textContent = hex;
  rgbValue.textContent = currentSolidColor.rgb;

  solidInfo.style.display = 'block';
  gradientInfo.style.display = 'none';
  copyBtn.textContent = 'Copy HEX';

  addToRecentColors(hex);
};

const setGradient = (color1, color2, angle) => {
  currentMode = 'gradient';
  currentGradientCSS = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  body.style.background = currentGradientCSS;
  colorPreview.style.background = currentGradientCSS;

  gradientCss.textContent = currentGradientCSS;
  solidInfo.style.display = 'none';
  gradientInfo.style.display = 'block';
  copyBtn.textContent = 'Copy CSS';

  addToRecentColors(color1);
  addToRecentColors(color2);
};

const generateSolid = () => {
  const hex = randomHex();
  setSolidColor(hex);
};

const generateGradient = () => {
  const color1 = randomHex();
  const color2 = randomHex();
  const angle = Math.floor(Math.random() * 360);
  setGradient(color1, color2, angle);
};

const copyToClipboard = async () => {
  const textToCopy = currentMode === 'solid' ? currentSolidColor.hex : currentGradientCSS;
  try {
    await navigator.clipboard.writeText(textToCopy);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = currentMode === 'solid' ? 'Copy HEX' : 'Copy CSS';
    }, 1500);
  } catch (err) {
    alert('Failed to copy');
  }
};

const toggleTheme = () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDark);
};

const loadTheme = () => {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
};

generateSolidBtn.addEventListener('click', generateSolid);
generateGradientBtn.addEventListener('click', generateGradient);
copyBtn.addEventListener('click', copyToClipboard);
themeToggle.addEventListener('click', toggleTheme);

const init = () => {
  loadTheme();
  loadRecentColors();
  renderRecentColors();
  const initialHex = randomHex();
  setSolidColor(initialHex);
};

init();