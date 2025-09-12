from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import random, asyncio, time

app = FastAPI(title="Threat Simulator API")

# Allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Sample Data ---
ATTACK_TYPES = ["Brute Force", "Phishing", "Malware", "DDoS", "Port Scan"]
SEVERITIES = ["Low", "Medium", "High", "Critical"]
SAMPLE_COORDS = [
    {"country": "USA", "lat": 37.0902, "lon": -95.7129},
    {"country": "India", "lat": 20.5937, "lon": 78.9629},
    {"country": "Russia", "lat": 61.5240, "lon": 105.3188},
    {"country": "China", "lat": 35.8617, "lon": 104.1954},
    {"country": "Germany", "lat": 51.1657, "lon": 10.4515},
    {"country": "Brazil", "lat": -14.2350, "lon": -51.9253},
]

def random_ip():
    return ".".join(str(random.randint(1, 254)) for _ in range(4))

def random_attack():
    coord = random.choice(SAMPLE_COORDS)
    return {
        "ip": random_ip(),
        "type": random.choice(ATTACK_TYPES),
        "severity": random.choice(SEVERITIES),
        "timestamp": int(time.time()),
        "country": coord["country"],
        "lat": coord["lat"] + random.uniform(-2, 2),
        "lon": coord["lon"] + random.uniform(-2, 2),
    }

# --- Routes ---
@app.get("/")
def root():
    """Root endpoint for testing"""
    return {"message": "Backend is running 🚀"}

@app.get("/attacks")
async def get_attacks():
    """Return a batch of simulated attacks (JSON)"""
    return [random_attack() for _ in range(10)]

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    Simple websocket which sends a new simulated attack every 2 seconds.
    Frontend can connect to ws://localhost:8000/ws
    """
    await websocket.accept()
    try:
        while True:
            await websocket.send_json(random_attack())
            await asyncio.sleep(2)
    except Exception as e:
        print("WebSocket disconnected:",e)