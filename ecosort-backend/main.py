from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import torch
import torchvision.transforms as transforms
from torchvision import models
import torch.nn as nn
from PIL import Image
import io
import random

app = FastAPI(title="EcoSort AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# 1. Load the PyTorch Model
# ============================================================
CLASS_NAMES = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_trained_model():
    model = models.resnet18(weights=None)
    in_features = model.fc.in_features
    model.fc = nn.Sequential(
        nn.Dropout(p=0.3),
        nn.Linear(in_features, 256),
        nn.ReLU(),
        nn.Dropout(p=0.2),
        nn.Linear(256, 6)
    )
    checkpoint = torch.load("saved_models/ecosort_model.pth", map_location=DEVICE)
    model.load_state_dict(checkpoint['model_state_dict'])
    model.to(DEVICE)
    model.eval()
    return model

model = load_trained_model()
print(f"✅ Real PyTorch model successfully loaded on {DEVICE}")

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# ============================================================
# 2. In-Memory Database (For Analytics)
# ============================================================
# We pre-fill it with 120 items so the dashboard isn't empty on startup
detection_history = []
for _ in range(120):
    detection_history.append({
        "class": random.choice(CLASS_NAMES),
        "confidence": random.uniform(0.85, 0.99)
    })

# ============================================================
# 3. API Endpoints
# ============================================================

@app.get("/api/system-status")
def get_system_status():
    return {
        "active_nodes": 12,
        "gpu_temp": "42°C",
        "throughput": "124 items/m",
        "alerts": 0
    }

@app.post("/api/detect")
async def detect_waste_object(file: UploadFile = File(...)):
    # Run the image through PyTorch
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    tensor = transform(img).unsqueeze(0).to(DEVICE)
    
    with torch.no_grad():
        outputs = model(tensor)
        probabilities = torch.softmax(outputs, dim=1)[0]
        confidence, predicted_idx = probabilities.max(0)
        
    predicted_class = CLASS_NAMES[predicted_idx.item()]
    conf_score = confidence.item()

    # --- SAVE TO DATABASE ---
    detection_history.append({
        "class": predicted_class,
        "confidence": conf_score
    })
        
    return {
        "filename": file.filename,
        "classification": predicted_class,
        "confidence": round(conf_score, 3),
        "bounding_box": {"x": 150, "y": 200, "width": 100, "height": 120},
        "status": "success"
    }

@app.get("/api/analytics")
def get_analytics_data():
    """Calculates live analytics directly from the detection history."""
    total_items = len(detection_history)
    
    # Calculate Average Confidence
    avg_conf = sum(item["confidence"] for item in detection_history) / total_items
    
    # Count how many of each category we have seen
    counts = {"PLASTIC": 0, "PAPER": 0, "GLASS": 0, "METAL": 0, "ORGANIC": 0, "OTHER": 0}
    for item in detection_history:
        c = item["class"]
        if c == "plastic": counts["PLASTIC"] += 1
        elif c in ["paper", "cardboard"]: counts["PAPER"] += 1
        elif c == "glass": counts["GLASS"] += 1
        elif c == "metal": counts["METAL"] += 1
        else: counts["OTHER"] += 1 # Treating 'trash' as OTHER

    # Convert counts to percentages for the Frontend Bar Chart
    composition = []
    for label, count in counts.items():
        pct = int((count / total_items) * 100) if total_items > 0 else 0
        composition.append({"label": label, "height": f"{pct}%"})

    return {
        "metrics": {
            "total_volume": str(total_items), # This will go up by 1 every scan!
            "volume_trend": "LIVE",
            "avg_confidence": f"{(avg_conf * 100):.1f}",
            "confidence_trend": "LIVE",
            "contamination_rate": f"{int((counts['OTHER'] / total_items) * 100)}", 
            "contamination_trend": "LIVE"
        },
        "composition": composition
    }

@app.get("/api/history")
def get_history():
    """Returns the most recent 50 scans for the History data table."""
    # Reverse the list so the newest scans show up first, and grab the last 50
    recent_history = list(reversed(detection_history))[:50]
    return {"data": recent_history}

@app.get("/api/alerts")
def get_alerts():
    """Simulates physical hardware and system alerts."""
    return {"alerts": [
        {"id": 1, "level": "CRITICAL", "message": "Contamination (Metal) detected in Biodegradable Zone 2.", "time": "Just now", "status": "ACTION REQUIRED"},
        {"id": 2, "level": "WARNING", "message": "Sorting Arm #4 experiencing high latency (120ms).", "time": "15 mins ago", "status": "INVESTIGATING"},
        {"id": 3, "level": "INFO", "message": "Scheduled neural network weight recalibration complete.", "time": "2 hours ago", "status": "RESOLVED"},
        {"id": 4, "level": "INFO", "message": "System booted and connected to Next.js Client.", "time": "4 hours ago", "status": "RESOLVED"}
    ]}