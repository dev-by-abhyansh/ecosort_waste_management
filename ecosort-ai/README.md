# EcoSort AI: Frontend Prototype

**Project:** AI-Powered Tiny Object Detection and Classification of Biodegradable Waste Using Multispectral Imaging in Robotic Recycling Systems  
**Course:** Software Engineering and Project Management (SEPM)

## 📌 Overview
EcoSort AI is a Next.js-based web application designed to serve as the control center for an industrial robotic recycling system. This repository contains the Minimum Viable Product (MVP) for the frontend user interface, demonstrating the Software Development Life Cycle (SDLC) from design to implementation.

The dashboard simulates real-time data ingestion from multispectral imaging cameras, rendering AI bounding boxes, classification confidence scores, and historical efficiency analytics.

## 🛠️ Technology Stack
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Language:** JavaScript (ES6+)
* **Data Visualization:** Custom CSS Grid/Flexbox simulators (Zero external chart dependencies for maximum performance and stability).

## 📂 Project Architecture
This application utilizes modern Next.js file-based routing to ensure modularity and scalability:
* `/src/app/page.js` - The public-facing marketing and landing page.
* `/src/app/login/page.js` - Secure operator authentication portal.
* `/src/app/dashboard/layout.js` - Global dashboard shell (Sidebar and Top Navigation).
* `/src/app/dashboard/page.js` - Main system overview and high-level metrics.
* `/src/app/dashboard/live-feed/page.js` - Simulated multispectral camera feed with AI bounding boxes.
* `/src/app/dashboard/analytics/page.js` - Comprehensive data reporting and export interface.

## 🚀 How to Run Locally

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation & Setup
1. Open your terminal (e.g., Alacritty or Kitty in your Hyprland environment) and navigate to the project directory:
   ```bash
   cd ecosort-ai