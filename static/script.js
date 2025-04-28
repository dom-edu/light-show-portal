// Unified state handler
async function updateState(updates) {
  const response = await fetch("/light_show/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
  });
  const newState = await response.json();
  updateUI(newState);
}

// UI updater
function updateUI(state) {
  // Sliders
  document.getElementById('cubeSizeDisplay').textContent = state.cubeSize;
  document.getElementById('cubeSizeSlider').value = state.cubeSize;
  
  document.getElementById('sphereRadiusDisplay').textContent = state.sphereRadius;
  document.getElementById('sphereRadiusSlider').value = state.sphereRadius;
  
  // Pattern display
  document.getElementById('patternDisplay').textContent = state.selectedPattern || "None";
  
  // Hex list
  const hexList = document.getElementById('hexList');
  hexList.innerHTML = state.hexOutput?.map(hex => 
      `<li>${hex}</li>`
  ).join('') || '';
}

// Your existing hex generator
function generateHexOutput(pattern) {
  if (pattern === "Cube") return ["#FF0000", "#00FF00", "#0000FF"];
  return [];
}

// Event listeners
document.getElementById('cubeSizeSlider').addEventListener('input', (e) => {
  updateState({ cubeSize: Number(e.target.value) });
});

document.getElementById('sphereRadiusSlider').addEventListener('input', (e) => {
  updateState({ sphereRadius: Number(e.target.value) });
});

document.getElementById('patternButton').addEventListener('click', () => {
  updateState({
      selectedPattern: "Cube",
      hexOutput: generateHexOutput("Cube")
  });
});

// Initialize with server state on load
document.addEventListener('DOMContentLoaded', () => {
  // Get initial state from embedded JSON
  const initialState = JSON.parse(document.getElementById('init-state').textContent);
  updateUI(initialState);
});