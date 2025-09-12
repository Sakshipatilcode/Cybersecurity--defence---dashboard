import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Example attacks
  const attacks = [
    { id: 1, type: "Malware (High)", country: "USA", ip: "23.17.225.116" },
    { id: 2, type: "Phishing (High)", country: "USA", ip: "24.216.200.78" },
    { id: 3, type: "Port Scan (Low)", country: "Germany", ip: "262.211.132" },
    { id: 4, type: "DDoS (Low)", country: "Russia", ip: "23.187.50.4" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start 
                    bg-gradient-to-br from-blue-200 to-blue-500 
                    dark:from-gray-900 dark:to-black text-black dark:text-white p-6 transition-all">
      
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛡️ Cybersecurity Defence System</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white 
                     dark:bg-yellow-400 dark:text-black shadow-md transition-all"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Attack Feed */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3">📡 Live Attack Feed</h2>
          <ul className="space-y-2">
            {attacks.map((attack) => (
              <li
                key={attack.id}
                className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 shadow"
              >
                <span className="font-bold">{attack.type}</span>  
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {attack.country} | {attack.ip}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3">🌍 Attack Map</h2>
          <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url={darkMode 
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {attacks.map((attack, idx) => (
              <Marker key={idx} position={[20 + idx * 10, 0 + idx * 20]}>
                <Popup>
                  <strong>{attack.type}</strong> <br />
                  {attack.country} | {attack.ip}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
