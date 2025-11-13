# MetricPulse Backend API

A robust Node.js + Express + TypeScript + MongoDB backend for the MetricPulse SaaS metrics analytics platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# GEMINI_API_KEY=your_gemini_api_key
```

### Development

```bash
# Start dev server with hot reload
npm run dev

# Server runs on http://localhost:5000
```

### Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── types/              # TypeScript interfaces
├── models/             # MongoDB schemas
├── controllers/        # Route handlers
├── routes/             # API routes
├── middleware/         # Express middleware
├── utilities/          # Helper functions
├── app.ts              # Express app setup
└── server.ts           # Server entry point
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Metrics
- `GET /api/metrics` - Get all metrics (requires auth)
- `POST /api/metrics/upload` - Upload CSV file (requires auth)
- `DELETE /api/metrics` - Delete all metrics (requires auth)

### Insights
- `GET /api/insights` - Get latest insights (requires auth)
- `POST /api/insights/regenerate` - Regenerate insights (requires auth)

### Health
- `GET /health` - Health check

## 📊 CSV Format

Your metrics CSV should have this format:

```csv
date,mrr,users,churn,new_users,revenue
2024-01-01,5000,120,5,15,5500
2024-02-01,5500,135,3,18,6000
2024-03-01,6200,152,4,22,6800
```

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🚀 Deploy to Render

1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect your GitHub repo
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add environment variables in Render dashboard
7. Deploy!

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Bcrypt
- **AI**: Google Gemini API
- **File Upload**: Multer
- **CSV Parsing**: PapaParse

## 📝 License

MIT
