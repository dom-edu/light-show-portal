import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { Canvas, useFrame } from "@react-three/fiber";
import { DarkModeContext } from '../main'; 



function computeChecksum(byteCount, address, recordType, dataBytes) {
  const addrHigh = (address >> 8) & 0xff;
  const addrLow = address & 0xff;
  const sum = byteCount + addrHigh + addrLow + recordType + dataBytes.reduce((a, b) => a + b, 0);
  return ((~sum + 1) & 0xff);
}

function toIntelHex(frames, startAddress = 0x8000) {
  const lines = [];
  let addr = startAddress;

  for (const frame of frames) {
    const flattened = frame.reduce((acc, plane) => acc.concat(plane.flat()), []);
    const frameBytes = new Uint8Array(64);

    flattened.forEach((bit, i) => {
      if (bit) frameBytes[Math.floor(i / 8)] |= 1 << (7 - (i % 8));
    });

    for (let i = 0; i < 64; i += 16) {
      const chunk = frameBytes.slice(i, i + 16);
      const checksum = computeChecksum(0x10, addr, 0x00, [...chunk]);
      const hexLine =
        ":10" +
        addr.toString(16).padStart(4, "0").toUpperCase() +
        "00" +
        [...chunk].map((b) => b.toString(16).padStart(2, "0").toUpperCase()).join("") +
        checksum.toString(16).padStart(2, "0").toUpperCase();
      lines.push(hexLine);
      addr += 16;
    }
  }
  lines.push(":00000001FF");
  return lines.join("\n");
}

function createAllOffFrame() {
  return Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => Array(8).fill(0))
  );
}

function createAllOnFrame() {
  return Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => Array(8).fill(1))
  );
}

function createHeartFrame() {
  const heart2D = [
    "00011000",
    "00111100",
    "01111110",
    "11111111",
    "11111111",
    "01111110",
    "00111100",
    "00011000"
  ];
  return Array.from({ length: 8 }, (_, z) =>
    heart2D.map(row => row.split('').map(bit => parseInt(bit)))
  );
}

function createSphereFrame(radius = 3.0, center = [3.5, 3.5, 3.5]) {
  const [cx, cy, cz] = center;
  return Array.from({ length: 8 }, (_, x) =>
    Array.from({ length: 8 }, (_, y) =>
      Array.from({ length: 8 }, (_, z) =>
        (x - cx) ** 2 + (y - cy) ** 2 + (z - cz) ** 2 <= radius ** 2 ? 1 : 0
      )
    )
  );
}

function createCubeFrame(size = 4) {
  const offset = Math.floor((8 - size) / 2);
  return Array.from({ length: 8 }, (_, x) =>
    Array.from({ length: 8 }, (_, y) =>
      Array.from({ length: 8 }, (_, z) =>
        x >= offset && x < offset + size &&
        y >= offset && y < offset + size &&
        z >= offset && z < offset + size ? 1 : 0
      )
    )
  );
}

function createPyramidFrame() {
  const frame = createAllOffFrame();
  for (let z = 0; z < 4; z++) {
    for (let y = z; y < 8 - z; y++) {
      for (let x = z; x < 8 - z; x++) {
        frame[x][y][z] = 1;
      }
    }
  }
  return frame;
}

function createWaveFrame(step = 0) {
  return Array.from({ length: 8 }, (_, x) =>
    Array.from({ length: 8 }, (_, y) =>
      Array.from({ length: 8 }, (_, z) => (z === (x + y + step) % 8 ? 1 : 0))
    )
  );
}

function generatePulseFrames(frame, cycles = 4) {
  const result = [];
  for (let i = 1; i <= cycles; i++) {
    const scale = i / cycles;
    const shrunk = frame.map(layer =>
      layer.map(row =>
        row.map(bit => (Math.random() < scale ? bit : 0))
      )
    );
    result.push(shrunk);
  }
  for (let i = cycles - 1; i >= 1; i--) {
    const scale = i / cycles;
    const shrunk = frame.map(layer =>
      layer.map(row =>
        row.map(bit => (Math.random() < scale ? bit : 0))
      )
    );
    result.push(shrunk);
  }
  return result;
}
const sendHex = async (hex) => {
  try {
    const response = await fetch("/api/send-hex", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // Required if using cookies or sessions with CORS
      body: JSON.stringify({ hex })
    });

    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error("Error sending hex:", err);
  }
};

function VoxelViewer({ frames }) {
  const { darkMode } = useContext(DarkModeContext);
  
  return (
    <Canvas style={{ 
      background: darkMode ? '#1a1a1a' : '#f8f9fa',
      transition: 'background 0.3s ease'
    }}>
  <ambientLight intensity={darkMode ? 0.8 : 1.0} />
  <pointLight 
    position={[15, 15, 15]} 
    intensity={darkMode ? 1.5 : 1.2}
    color={darkMode ? '#ffffff' : '#f8f8f8'}
  />
      <ambientLight intensity={darkMode ? 0.6 : 0.8} />
      <pointLight position={[15, 15, 15]} intensity={darkMode ? 1.3 : 1} />
      {/* Rest of your existing mesh code */}
    </Canvas>
  );
}

export default function HexExporter() {
  const [hex, setHex] = useState("");
  const [size, setSize] = useState(4);
  const [radius, setRadius] = useState(3.0);
  const [previewFrames, setPreviewFrames] = useState([createAllOffFrame()]);

  const handleGenerate = (type) => {
    let frames = [];
    switch (type) {
      case "on":
        frames = [createAllOnFrame()];
        break;
      case "off":
        frames = [createAllOffFrame()];
        break;
      case "heart":
        frames = [createHeartFrame()];
        break;
      case "sphere":
        frames = [createSphereFrame(radius)];
        break;
      case "cube":
        frames = [createCubeFrame(size)];
        break;
      case "pyramid":
        frames = [createPyramidFrame()];
        break;
      case "wave":
        frames = Array.from({ length: 8 }, (_, i) => createWaveFrame(i));
        break;
      case "pulse":
        frames = generatePulseFrames(createSphereFrame(radius));
        break;
      default:
        frames = generateDummyFrames();
    }
    setPreviewFrames(frames);
    const hexData = toIntelHex(frames);
    setHex(hexData);
  };

  function generateDummyFrames(count = 4) {
    const frames = [];
    for (let f = 0; f < count; f++) {
      const frame = Array.from({ length: 8 }, () =>
        Array.from({ length: 8 }, () =>
          Array.from({ length: 8 }, () => (Math.random() > 0.85 ? 1 : 0))
        )
      );
      frames.push(frame);
    }
    return frames;
  }

  const handleDownload = () => {
    const blob = new Blob([hex], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "led_cube_output.hex");
  };

  return (
    <div className="container py-4">
      {/* Enhanced Header */}
      <div className={`text-center mb-5 p-4 rounded-3 shadow-sm ${darkMode ? 'bg-dark' : 'bg-white'}`}>
        <h1 className="display-5 fw-bold text-primary">iCube 3D8S HEX Exporter</h1>
        <p className="lead">Generate LED cube patterns and download as HEX files</p>
      </div>

      <div className="row g-4">
        {/* Controls Column */}
        <div className="col-lg-4">
          <div className={`card shadow-sm h-100 ${darkMode ? 'bg-secondary text-white' : ''}`}>
            <div className="card-body">
              <h2 className="h5 card-title mb-4">Controls</h2>
              
              <div className="mb-4">
                <label className="form-label d-flex justify-content-between">
                  <span>Cube Size: <strong>{size}</strong></span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="8"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                />
              </div>

              <div className="mb-4">
                <label className="form-label d-flex justify-content-between">
                  <span>Sphere Radius: <strong>{radius.toFixed(1)}</strong></span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value))}
                />
              </div>

              {/* Buttons Grid */}
              <div className="d-grid gap-2">
                <div className="row row-cols-2 g-2">
                  {['on', 'off', 'heart', 'sphere', 'cube', 'pyramid', 'wave', 'pulse', 'random'].map((type) => (
                    <div className="col" key={type}>
                      <button
                        onClick={() => handleGenerate(type)}
                        className={`btn w-100 ${
                          type === 'pulse' ? 'btn-purple' : 'btn-primary'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={handleDownload}
                  className="btn btn-success mt-3"
                  disabled={!hex}
                >
                  <i className="bi bi-download me-2"></i>
                  Download .hex
                </button>
                <button onClick={() => sendHex(hex)}>Send it!</button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h2 className="h5 card-title mb-4">3D Preview</h2>
              <div className="d-flex justify-content-center">
                <VoxelViewer frames={previewFrames} />
              </div>
            </div>
          </div>
        </div>

        {/* HEX Output Column */}
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5 card-title mb-4">HEX Output</h2>
              <pre className={`p-3 rounded-2 ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                {hex || "Click a shape or animation to generate .hex output..."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}