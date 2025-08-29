# 🌱 AgroBrain - AI-Powered Agricultural Platform
**AgroBrain** is a modern, responsive web application designed to provide farmers with advanced tools and data-driven insights for precision agriculture. By leveraging AI, real-time data, and a clean, intuitive user interface, AgroBrain aims to enhance crop management, improve yield, and promote sustainable farming practices.

## Application View
![home](/frontend//public/home.jpg.png)

## ✨ Key Features
- 🔐 **Secure Authentication**: User login and profile management powered by Auth0.

- 📊 **Interactive Dashboard**: A central hub providing a high-level overview of farm statistics, including fields owned, crops planted, yield progress, and recent weather reports.

- 🌦️ **Real-time Weather Details**: A dedicated weather dashboard with current conditions, a 7-day forecast, and agricultural recommendations like irrigation schedules, powered by the OpenWeatherMap API.

- 🌾 **Field Management**: A module for farmers to monitor and manage their agricultural fields, with details on crop type, field size, soil status, and projected yield.

- 🤖 **AI Crop Recommendation**: An intelligent tool that takes soil and climate parameters (N, P, K, temperature, pH, etc.) and recommends the most suitable crops for planting.

- 🔬 **Crop Disease Detection**: An advanced feature allowing users to upload images of plants to an AI model for real-time disease identification and recommended treatment steps.

- 🧪**Fertilizer Recommendation**: Provides tailored fertilizer suggestions for specific fields, detailing the required amounts of Urea, Potassium Nitrate, and other nutrients.

- 📰 **Agricultural Insights**: A curated news section that fetches the latest articles and trends in agriculture and sustainable farming from the NewsAPI.

- 📱 **Fully Responsive Design**: The entire application is built with a mobile-first approach, ensuring a seamless experience on any device.


## 🛠️ Tech Stack
- **Frontend**: React (with Vite)

- **Styling**: Tailwind CSS

- **Animations**: Framer Motion

- **Authentication**: Auth0

- **Charting**: Recharts

- **Icons**: Lucide React

- **API Calls**: Axios

## 🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)

- npm or yarn

- Accounts for the following services to get API keys:

     - Auth0

     - NewsAPI

     - OpenWeatherMap


### Installation

1. Clone the repository:
```sh
git clone https://github.com/your-username/agrobrain.git
cd agrobrain
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
Create a .env file in the root of your project and add your credentials.
```sh
VITE_API_KEY = 
VITE_OPENWEATHER_API_KEY =
VITE_EMAILJS_SERVICE_ID = 
EMAILJS_TEMPLATE_ID = 
VITE_EMAILJS_USER_ID =
VITE_NEWSAPI_API_KEY = 
VITE_NEWSAPI_URL = 
```

---
### Run the development server:
```sh
npm run dev
```
The application will now be running on `http://localhost:5173` (or another port if 5173 is in use).


## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.


## ✍️ Author
- Debjyoti Shit
    - LinkedIn: https://www.linkedin.com/in/debjyotishit/