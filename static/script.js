const state = {
    cubeSize: 4,
    sphereRadius: 3.0,
    selectedPattern: null,
    hexOutput: []
  };
  
  function updateState(updates) {
    Object.assign(state, updates);
    renderPage();
  }
  
  function renderPage() {
    document.getElementById('cubeSizeDisplay').textContent = state.cubeSize;
    document.getElementById('sphereRadiusDisplay').textContent = state.sphereRadius;
  
    // Render the selected pattern
    document.getElementById('patternDisplay').textContent = state.selectedPattern;
  
    const hexList = document.getElementById('hexList');
    hexList.innerHTML = "";  // Clear current list
    state.hexOutput.forEach(hex => {
      const li = document.createElement('li');
      li.textContent = hex;
      hexList.appendChild(li);
    });
  }
  
  // Event listeners for sliders
  document.getElementById('cubeSizeSlider').addEventListener('input', (e) => {
    // Convert to number before updating the state
    updateState({ cubeSize: Number(e.target.value) });
  });
  
  document.getElementById('sphereRadiusSlider').addEventListener('input', (e) => {
    // Convert to number before updating the state
    updateState({ sphereRadius: Number(e.target.value) });
  });
  
  // Event listener for pattern selection
  document.getElementById('patternButton').addEventListener('click', () => {
    updateState({ selectedPattern: "Cube", hexOutput: generateHexOutput("Cube") });
  });
  
  // Function to generate hex output based on patterns
  function generateHexOutput(pattern) {
    if (pattern === "Cube") {
      return ["#FF0000", "#00FF00", "#0000FF"];
    }
    return [];
  }
  
  // Initial render when the page loads
  renderPage();
  