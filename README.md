# EcoSort AI ♻️

An autonomous waste classification system powered by deep learning and multispectral imaging. EcoSort AI bridges the gap between software engineering and physical hardware, acting as the intelligence layer for robotic sorting arms in waste management facilities.

## 🚀 Features

* **Deep Learning Inference:** Custom-trained PyTorch ResNet18 model for high-accuracy waste classification (Biodegradable vs. Non-biodegradable).
* **Real-time Analytics:** In-memory tracking of system throughput, material distribution, and average confidence scores.
* **Hardware Simulation:** Dedicated alerts dashboard simulating mechanical diagnostics (e.g., robotic arm latency, multispectral camera contamination).
* **Decoupled Architecture:** Clean separation of concerns using a Next.js (React) presentation tier and a FastAPI (Python) application tier.
* **Secure Access Node:** Simulated authentication portal for authorized facility operators.

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** FastAPI, Python, Uvicorn
* **Machine Learning:** PyTorch, Torchvision
* **Database:** In-Memory Python Data Structures (MVP phase)

---

## 💻 Local Installation & Setup

**Note:** This repository is entirely self-contained. The pre-trained PyTorch model weights (`.pth`) and the image dataset are included directly in the source code. No external downloads are required.

To run EcoSort AI locally, you need to run both the backend server and the frontend client simultaneously.

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [Conda](https://docs.conda.io/en/latest/) (Miniconda or Anaconda recommended for ML dependencies)
* Git

### 1. Clone the Repository
```bash
git clone [https://github.com/dev-by-abhyansh/ecosort_waste_management.git](https://github.com/dev-by-abhyansh/ecosort_waste_management.git)
cd ecosort_waste_management




### Backend Setup

# Navigate to the backend directory
cd ecosort-backend

# Create a local Conda environment
conda create -p ./ecosort-test-env python=3.11 -y

# Activate the environment
conda activate ./ecosort-test-env

# Install required Python packages (with PyTorch CUDA support)
pip install -r requirements.txt --extra-index-url [https://download.pytorch.org/whl/cu121](https://download.pytorch.org/whl/cu121)

# Start the FastAPI server
uvicorn main:app --reload


### Frontend Setup(Next.js)

#Firstly open a new terminal and then do these steps the frontend and the backend should run in separate terminals
# Navigate to the frontend directory from the root project folder
cd ecosort-ai

# Install Node modules (Crucial step)
npm install

# Start the Next.js development server
npm run dev



### Usage Instruction
# 1. Open your browser and navigate to http://localhost:3000. You will see the EcoSort AI Landing Page.

# 2. Click Get Started or Access System to reach the login portal.

# 3. Enter any simulated credentials (e.g., admin@ecosort.com) and click Initialize System.

# 4. Once on the Live Feed dashboard, use the upload button to submit an image of waste (JPG/PNG).

# 5. The image will be sent to the Python backend, classified by the local PyTorch model, and the bounding box results will map onto the UI.

# 6. Navigate to the History and Analytics tabs to view dynamically updated logs and metrics based on your session.