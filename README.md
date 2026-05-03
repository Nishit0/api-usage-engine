# API Usage Engine

A backend platform for API usage tracking, API key management, rate limiting, and usage-based billing simulation.

---

## 🚀 Features

- API Key Generation
- API Key Authentication
- Protected API Routes
- Usage Tracking
- Request Logging
- Rate Limiting
- Modular Backend Architecture

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Frontend
- React
- Vite

---

## 📂 Project Structure

backend/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/

frontend/
├── src/
│ ├── pages/
│ ├── services/

---

## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone YOUR_GITHUB_REPO
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
APP_NAME=API Engine
```

### Start Backend

```bash
npm run dev
```

---

## 🔑 API Endpoints

### Generate API Key

POST `/api/keys`

Example Request:

```json
{
  "name": "demo-key"
}
```

---

### Protected Test Endpoint

GET `/api/test`

Headers:

```bash
x-api-key: YOUR_API_KEY
```

---

## 🔄 Request Flow

Client Request
↓
API Key Validation
↓
Rate Limiting
↓
Business Logic
↓
Usage Logging
↓
Response

---

## 🧠 Design Decisions

- MongoDB was used for flexible request log storage
- Middleware architecture was prioritized for scalability
- In-memory rate limiting was used for MVP simplicity
- Focus was kept on backend gateway logic over UI complexity

---

## ⚠️ Challenges Faced

- MongoDB Atlas authentication and URI configuration
- Middleware structuring and request flow handling
- Backend/frontend integration

---

## 📈 Future Improvements

- Redis-based distributed rate limiting
- Usage-based billing dashboard
- Stripe integration
- Multi-tenant architecture
- Real-time analytics

---

## 👨‍💻 Author

Nishit Nagar