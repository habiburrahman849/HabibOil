const previewCanvas = document.getElementById('previewCanvas');
const heroPreview = document.getElementById('heroPreview');
const colorAInput = document.getElementById('colorA');
const colorBInput = document.getElementById('colorB');
const angleInput = document.getElementById('angle');
const angleValue = document.getElementById('angleValue');
const cssOutput = document.getElementById('cssOutput');
const copyCssButton = document.getElementById('copyCss');
const saveGradientButton = document.getElementById('saveGradient');
const savedList = document.getElementById('savedList');

const moodPresets = {
  calm: { a: '#4f7cff', b: '#7cf2d8', angle: 145 },
  energetic: { a: '#ff5f6d', b: '#ffc371', angle: 110 },
  professional: { a: '#284fa8', b: '#42d2ff', angle: 135 },
  playful: { a: '#c94bff', b: '#3bf7d2', angle: 60 }
};

const savedGradients = [];

const gradientString = ({ a, b, angle }) => `linear-gradient(${angle}deg, ${a}, ${b})`;

function currentSettings() {
  return {
    a: colorAInput.value,
    b: colorBInput.value,
    angle: Number(angleInput.value)
  };
}

function renderGradient() {
  const settings = currentSettings();
  const css = gradientString(settings);

  previewCanvas.style.background = css;
  heroPreview.style.background = css;
  cssOutput.textContent = `background: ${css};`;
  angleValue.textContent = `${settings.angle}°`;
}

function renderSaved() {
  savedList.innerHTML = '';

  if (!savedGradients.length) {
    const empty = document.createElement('li');
    empty.className = 'saved-meta';
    empty.textContent = 'No saved gradients yet.';
    savedList.appendChild(empty);
    return;
  }

  savedGradients.forEach((gradient, index) => {
    const item = document.createElement('li');
    const swatch = document.createElement('div');
    swatch.className = 'saved-swatch';
    swatch.style.background = gradient.css;

    const meta = document.createElement('div');
    meta.className = 'saved-meta';
    meta.innerHTML = `<span>#${index + 1} · ${gradient.angle}°</span><button class="btn" data-index="${index}">Use</button>`;

    item.appendChild(swatch);
    item.appendChild(meta);
    savedList.appendChild(item);
  });
}

function applyPreset(name) {
  const preset = moodPresets[name];
  if (!preset) return;

  colorAInput.value = preset.a;
  colorBInput.value = preset.b;
  angleInput.value = String(preset.angle);
  renderGradient();
}

[colorAInput, colorBInput, angleInput].forEach((input) => {
  input.addEventListener('input', renderGradient);
});

document.querySelectorAll('.mood-btn').forEach((button) => {
  button.addEventListener('click', () => {
    applyPreset(button.dataset.mood);
  });
});

copyCssButton.addEventListener('click', async () => {
  const css = cssOutput.textContent;
  try {
    await navigator.clipboard.writeText(css);
    copyCssButton.textContent = 'Copied!';
    setTimeout(() => {
      copyCssButton.textContent = 'Copy CSS';
    }, 1300);
  } catch {
    copyCssButton.textContent = 'Copy failed';
  }
});

saveGradientButton.addEventListener('click', () => {
  const settings = currentSettings();
  const css = gradientString(settings);
  savedGradients.unshift({ ...settings, css });
  if (savedGradients.length > 6) savedGradients.pop();
  renderSaved();
});

savedList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-index]');
  if (!button) return;

  const gradient = savedGradients[Number(button.dataset.index)];
  if (!gradient) return;

  colorAInput.value = gradient.a;
  colorBInput.value = gradient.b;
  angleInput.value = String(gradient.angle);
  renderGradient();
});

let hue = 0;
setInterval(() => {
  hue = (hue + 1) % 360;
  document.body.style.setProperty('--accent', `hsl(${hue}, 90%, 68%)`);
  document.body.style.setProperty('--accent-2', `hsl(${(hue + 80) % 360}, 95%, 62%)`);
}, 180);

renderGradient();
renderSaved();
