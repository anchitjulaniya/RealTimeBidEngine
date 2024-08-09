## Frontend Link - [https://real-time-bid-engine.vercel.app/](https://real-time-bid-engine.vercel.app/)
## Backend Link - [https://realtimebidengine.onrender.com](https://realtimebidengine.onrender.com)


# 🎉 Real-Time Bidding Engine 🚀

Welcome to the **Real-Time Bidding Engine**! This project is a full-stack application that allows users to create, participate, and monitor real-time auctions for various items. 🎯

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [⚙️ Installation](#%EF%B8%8F-installation)
- [🚦 Usage](#-usage)
- [📂 Project Structure](#-project-structure)
- [🌐 API Endpoints](#-api-endpoints)
- [🎨 Frontend Components](#-frontend-components)
- [📜 License](#-license)

## 🚀 Features

- **Real-Time Auctions**: Bid creators can host live auctions with real-time updates for all participants. 🕒
- **Bidder Participation**: Bidders can place and update their bids in real-time, viewing their ranking dynamically. 📊
- **User Authentication**: Secure sign-in and sign-up functionality using JWT. 🔒
- **Real-Time Leaderboard**: Stay ahead of the competition with a live leaderboard showing the top bidders. 🥇

## 🛠 Tech Stack

### Backend 🖥️
- **Node.js** with Express.js
- **MongoDB** with Mongoose for data modeling
- **Socket.io** for real-time bid updates
- **JWT** for authentication
- **bcrypt** for password encryption

### Frontend 🌐
- **React.js** with functional components and hooks
- **Tailwind CSS** for modern and responsive UI
- **Socket.io-client** for real-time communication

## ⚙️ Installation

### 1. Clone the Repository 📦
 ```bash
    git clone https://github.com/yourusername/RealTimeBiddingEngine.git
    cd RealTimeBiddingEngine  
```
    
    
### 2. Install Dependencies 📥

#### Backend

```bash
cd Backend
npm install
```

#### Frontend
```cd ../Frontend
npm install
```

#### 3. Environment Variables 🛠️

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### 4. Start the Application 🚀
```cd Backend
npm run dev
```


Navigate to the `Backend` directory and install the necessary dependencies:

```bash
cd Backend
npm install
```

#### Frontend

```bash
cd ../Frontend
npm install
```

## 🚦 Usage

- **Create a Bid**: As a bid creator, navigate to the Bid Creation page, fill out the bid details, and publish the bid. 📅
- **Participate in a Bid**: As a bidder, accept the bid invitation and start bidding in real-time! 💸
- **Monitor Bids**: Track the live leaderboard to see how you rank against other bidders. 🏆

## 📂 Project Structure

```bash
RealTimeBiddingEngine/
├── Backend/
|   ├── middleware        # Middlewares
│   ├── controllers/      # API logic
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   └── .env              # Environment variables
├── Frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Application pages
|   │   ├── Main.jsx      # Main component
│   │   ├── App.jsx       # Main app component
│   │   └── index.js      # Entry point
└── README.md             # This file
```

## 🌐 API Endpoints

### Bid Management 🎯

- **POST** `/api/bids` - Create a new bid.
- **GET** `/api/bids` - Retrieve all bids.
- **GET** `/api/bids/:id` - Get details of a specific bid by its ID.
- **PUT** `/api/bids/:id` - Update a bid with new information.
- **POST** `/api/bids/:id/publish` - Publish a bid, making it available for participants.
- **POST** `/api/bids/:id/close` - Close a bid, ending the bidding process.

### Bid Participation 🏅

- **POST** `/api/bidParticipation/:id/accept` - Accept a bid invitation. The bidder confirms their participation in the auction.
- **POST** `/api/bidParticipation/:id/reject` - Reject a bid invitation. The bidder declines to participate in the auction.
- **POST** `/api/bidParticipation/:id/bid` - Place or update a bid. Participants can submit their bid amounts on items within a bid.
- **GET** `/api/bidParticipation/:id/leaderboard` - Get the real-time leaderboard for a specific bid. This provides a dynamic ranking of participants based on their current bids.

### Bid Invitation ✉️

- **POST** `/api/bids/:id/invite` - Send invitations to bidders to participate in a specific bid. The bid creator can invite selected users to join the auction.

### Real-Time Updates ⏱️

- **GET** `/api/bids/:id/leaderboard` - Fetch the real-time leaderboard for a specific bid. This is crucial for bidders to track their position in the auction as bids are placed.

---

### Explanation of Routes

1. **Bid Management Routes**:
    - These routes are focused on managing bids from the perspective of the bid creator. They allow for creating, retrieving, updating, publishing, and closing bids. The routes provide the essential CRUD operations and additional functionalities like publishing and closing bids.

2. **Bid Participation Routes**:
    - These routes handle the actions of the bidders, including accepting or rejecting bid invitations, placing bids, and tracking their rank on the leaderboard. The ability to update bids ensures that participants can remain competitive throughout the auction.

3. **Bid Invitation Route**:
    - This route is used by bid creators to invite specific users to participate in a bid. It enables controlled participation by sending invites only to selected users.

4. **Real-Time Updates Route**:
    - This route provides real-time information to participants about their standing in the auction via the leaderboard. It's a critical feature for maintaining the competitive edge of a real-time bidding engine.


### User Authentication 🔐

- **POST** `/api/auth/signup` - Create a new account
- **POST** `/api/auth/signin` - Log in to your account
