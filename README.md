# Chat-App-Pro

Chat-App-Pro is a real-time chat application that lets authenticated users send private, instant messages. Instead of relying on database polling, it uses a persistent, bidirectional WebSocket connection to deliver messages with near-zero latency.

The app follows a decoupled architecture: network logic lives in custom React hooks, global state is managed with Zustand, and the backend runs on Express/Node.js with MongoDB for storage.

---

## Key Features

- **Real-time bidirectional messaging** — WebSocket-based delivery with no client-side polling.
- **Live presence tracking** — Online/offline status updates automatically across all connected clients.
- **JWT authentication** — Secure signup, login, and logout flows using JSON Web Tokens.
- **User discovery** — Sidebar search to find and start chats with other registered users.
- **Auto-generated avatars** — Profile pictures assigned automatically at registration via Dicebear.
- **Decoupled business logic** — All async/network operations are isolated into custom hooks and Zustand stores, keeping UI components clean.

---

## Tech Stack

### Frontend
- **React.js** (via Vite for fast builds and HMR)
- **Zustand** — global state for active chats, layout, and message caching
- **React Context API** — user identity and socket connection state
- **Tailwind CSS** — utility-first styling
- **Axios** — HTTP requests
- **react-hot-toast** — UI notifications

### Backend
- **Node.js** + **Express.js** — server and routing
- **MongoDB** + **Mongoose** — data modeling
- **Socket.io** — real-time WebSocket engine
- **jsonwebtoken** — JWT creation/verification
- **bcryptjs** — password hashing

---

## Project Structure

```
├── Backend/
│   ├── Controllers/    # Auth, message, and routing logic
│   ├── DB/             # MongoDB connection setup
│   ├── Middleware/     # JWT verification middleware
│   ├── Models/         # Mongoose schemas (User, Message, Conversation)
│   ├── Routes/         # API route definitions
│   ├── Socket/         # Socket.io config and connection registry
│   ├── util/           # Token and cookie helper utilities
│   └── server.js       # App entry point
└── Frontend/
    └── src/
        ├── assets/      # Static images/assets
        ├── Context/     # Auth & Socket context providers
        ├── hooks/       # Custom hooks (useLogin, useListenMessages, etc.)
        ├── Pages/       # Page-level components (Home, Login, SignUp)
        ├── store/       # Zustand stores
        ├── index.css    # Tailwind entry point
        └── main.jsx     # React DOM bootstrap
```

---

## Data Models (Mongoose Schemas)

**User**
```
fullName:    String   (required)
username:    String   (required, unique)
password:    String   (required, min length 6)
gender:      String   (required, enum: ["male", "female"])
profilePic:  String   (default: Dicebear avatar URL)
```

**Message**
```
senderId:    ObjectId → User (required)
receiverId:  ObjectId → User (required)
message:     String   (required)
```

**Conversation**
```
participants: [ObjectId] → User
messages:     [ObjectId] → Message (default: [])
```

---

## API Endpoints

### Auth — `/api/auth`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/signup` | Registers a new user, hashes the password, assigns a default avatar, and issues a JWT. |
| POST | `/login` | Verifies credentials and returns a session token + user profile. |
| POST | `/logout` | Clears the auth cookie. |

### Messages — `/api/messages`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/send/:id` | Sends a message to a conversation and emits it in real time via Socket.io if the recipient is online. |
| GET | `/:id` | Fetches the message history between the current user and the target user. |

### Users — `/api/users`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Returns all registered users except the currently logged-in user. |

---

## Getting Started

### Prerequisites
- Node.js v16.x or later
- A local or cloud MongoDB instance (e.g. MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd Chat-App-Pro
```

### 2. Configure the backend
```bash
cd Backend
touch .env
```

Add the following to `.env`:
```
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_long_cryptographic_random_string_here
NODE_ENV=development
```

### 3. Install and run the backend
```bash
npm install
npm run dev
```
The server will run at `http://localhost:5000`.

### 4. Install and run the frontend
Open a new terminal:
```bash
cd ../Frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## Code Quality Highlights

- **Custom data hooks** — Async logic, form handling, and API calls are abstracted into reusable hooks (`useLogin.js`, `useSignup.js`, `useSendMessage.js`, etc.), keeping components focused purely on rendering.
- **Clean state separation** — Transient, fast-changing state (active messages) lives in Zustand; persistent identity state lives in `AuthContext`, backed by `localStorage`.
- **Defensive error handling** — Forms validate input (password length, email format) before hitting the network, and surface errors via `react-hot-toast`.

---

## License

Add your license of choice here (e.g. MIT).
