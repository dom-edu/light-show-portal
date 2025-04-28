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

 function renderPage(){
    document.getElementById('cubeSizeDisplay').textContent = state.cubeSize;
  document.getElementById('sphereRadiusDisplay').textContent = state.sphereRadius;

  // Render the selected pattern
  document.getElementById('patternDisplay').textContent = state.selectedPattern;

  // Display the generated hex values
  const hexList = document.getElementById('hexList');
  hexList.innerHTML = "";  // Clear current list
  state.hexOutput.forEach(hex => {
    const li = document.createElement('li');
    li.textContent = hex;
    hexList.appendChild(li);
  });
 } 

 document.getElementById('cubeSizeSlider').addEventListener('input', (e) => {
    setState({ cubeSize: e.target.value });
  });
  
  document.getElementById('sphereRadiusSlider').addEventListener('input', (e) => {
    setState({ sphereRadius: e.target.value });
  });
  
  document.getElementById('patternButton').addEventListener('click', () => {
    setState({ selectedPattern: "Cube", hexOutput: generateHexOutput("Cube") });
  });
  
