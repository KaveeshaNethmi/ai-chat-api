# 🚀 AI Chat API (Backend)

A production-style AI-powered chat backend built with **Node.js, Express, MongoDB, Redis, and OpenAI**.

This project simulates how real-world AI chat systems (like ChatGPT-style applications) are designed, including authentication, conversation memory, streaming responses, caching, and token tracking.

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- Protected routes middleware

### 💬 Conversations
- Create conversations
- Fetch user conversations
- Get single conversation with messages
- Delete conversations
- Auto-generated conversation titles using AI

### 🤖 AI Chat System
- OpenAI integration (GPT models)
- Multi-turn conversation memory
- Context-aware responses
- System prompt handling

### ⚡ Streaming (SSE)
- Real-time AI response streaming
- Token-by-token response delivery
- ChatGPT-like experience

### 🚀 Performance
- Redis caching for conversation messages
- Reduced MongoDB reads
- Faster chat response retrieval

### 📊 Tracking
- Token usage tracking (prompt, completion, total tokens)
- Message history persistence

### 🛡️ Security & Reliability
- Rate limiting (anti-spam protection)
- Request validation
- Secure JWT authentication

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Redis (ioredis)
- OpenAI API
- JWT Authentication
- Server-Sent Events (SSE)
- Docker (for Redis)

---

## 🏗️ Architecture

Client
↓
Express API Server
↓
Authentication Middleware
↓
Chat / Conversation Services
↓
Redis Cache (fast access)
↓
MongoDB (persistent storage)
↓
OpenAI API (AI responses)


---

## 📂 Project Structure

src/
│
├── config/
│ ├── db.js
│ ├── redis.js
│ └── prompts.js
│
├── controllers/
│ ├── auth.controller.js
│ ├── conversation.controller.js
│ └── chat.controller.js
│
├── services/
│ ├── auth.service.js
│ ├── conversation.service.js
│ ├── chat.service.js
│ └── openai.service.js
│
├── models/
│ ├── User.js
│ ├── Conversation.js
│ └── Message.js
│
├── routes/
│ ├── auth.routes.js
│ ├── conversation.routes.js
│ └── chat.routes.js
│
├── middleware/
│ ├── auth.middleware.js
│ ├── rateLimit.middleware.js
│ └── validateObjectId.js
│
├── utils/
│ ├── generateToken.js
│
├── app.js
└── index.js

---

## 🔄 Chat Flow

User Message
   ↓
Save Message to DB
   ↓
Load Conversation History (Redis / MongoDB)
   ↓
Send Context to OpenAI
   ↓
Receive AI Response
   ↓
Save Response
   ↓
Return Result / Stream Response

---

## ⚡ Streaming Flow (SSE)

Frontend
   ↓
POST /api/chat/stream
   ↓
OpenAI Streaming API
   ↓
Server sends chunks via SSE
   ↓
Frontend updates UI in real-time

---

## ⚙️ Setup Instructions

### 1. Clone repo
git clone https://github.com/KaveeshaNethmi/ai-chat-api.git
cd ai-chat-api

### 2. Install dependencies
npm install

### 3. Create .env file
PORT=5000
MONGO_URI=your_mongo_uri
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your_key
JWT_SECRET=your_secret

### 4. Run Redis (Docker)
docker run -d --name redis -p 6379:6379 redis

### 5. Start server
npm run dev

---

## 👨‍💻 Author
Built by Kaveesha Abeynayake
Backend Developer | AI Engineering Enthusiast