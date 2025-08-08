# Live Polling System

A real-time polling system built with React, Redux, Express.js, and Socket.io that allows teachers to create polls and students to participate in live voting sessions.

## 🚀 Live Demo

- **Frontend:** [https://quiz-polling.vercel.app](https://quiz-polling.vercel.app)
- **Backend API:** [https://quiz-polling-api.vercel.app](https://quiz-polling-api.vercel.app)

## ✨ Features

### 👨🏫 Teacher Features
- Create polls with multiple choice questions
- Set customizable time limits (10-300 seconds)
- View live polling results with real-time updates
- Manage connected students
- Remove students from sessions
- View poll history
- Real-time chat with students

### 👨🎓 Student Features
- Join sessions with unique names
- Participate in live polls with countdown timers
- View live results after submitting answers
- Real-time chat with teachers and other students
- Responsive design for all devices

### 🔧 Technical Features
- Real-time communication using Socket.io
- State management with Redux Toolkit
- Responsive design with Tailwind CSS
- Modular component architecture
- Clean separation between frontend and backend

## 📱 Screenshots

Homepage
<img width="1912" height="992" alt="image" src="https://github.com/user-attachments/assets/1284b404-dc8e-4e6e-bd12-ae55d51d7953" />

Teacher Dashboard
### <img width="1919" height="1028" alt="Screenshot 2025-08-08 062013" src="https://github.com/user-attachments/assets/bda173ab-8c57-4c81-a708-e6d2494215df" />

### Student Interface
<img width="1913" height="1029" alt="Screenshot 2025-08-08 062031" src="https://github.com/user-attachments/assets/2f6ec0c1-9a97-4414-a866-476da7edd75f" />


### Live Polling Results
<img width="1913" height="1029" alt="Screenshot 2025-08-08 062031" src="https://github.com/user-attachments/assets/2f6ec0c1-9a97-4414-a866-476da7edd75f" />

### Real-time Chat
<img width="1917" height="1029" alt="Screenshot 2025-08-08 061842" src="https://github.com/user-attachments/assets/3e1a1f73-b30d-4867-a7a7-526b5cded9b0" />


## 📁 Project Structure
```
├── backend/
│ └── backend/
│ ├── server.js # Express server with Socket.io
│ ├── package.json # Backend dependencies
│ ├── vercel.json # Vercel deployment config
│ └── .env # Environment variables
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ │ ├── PollQuestion.jsx
│ │ │ ├── PollResults.jsx
│ │ │ ├── TeacherDashboard.jsx
│ │ │ └── StudentInterface.jsx
│ │ ├── store/ # Redux store and slices
│ │ │ ├── store.js
│ │ │ └── slices/
│ │ ├── context/ # Socket context
│ │ │ └── SocketContext.jsx
│ │ └── App.jsx # Main application component
│ ├── package.json # Frontend dependencies
│ ├── vite.config.js # Vite configuration
│ └── index.html # Main HTML file
└── README.md
```


## 🛠️ Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
cd backend

text

2. Install dependencies:
npm install

text

3. Create a `.env` file:
PORT=3001
CORS_ORIGIN=http://localhost:5173

text

4. Start the backend server:
npm run dev

text

The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
cd frontend

text

2. Install dependencies:
npm install

text

3. Create a `.env` file:
VITE_SERVER_URL=http://localhost:3001

text

4. Start the frontend development server:
npm run dev

text

The frontend will run on `http://localhost:5173`

## 📖 Usage

### For Teachers

1. Open the application and select **"I'm a Teacher"**
2. Create a new poll by:
   - Adding a question
   - Setting up multiple choice options (2-6 options)
   - Configuring the time limit (10-300 seconds)
3. Start the poll and view live results
4. Manage connected students from the Students tab
5. View poll history in the History tab
6. Use the chat feature to communicate with students

### For Students

1. Open the application and select **"I'm a Student"**
2. Enter your unique name to join the session
3. Wait for the teacher to start a poll
4. Answer questions within the time limit
5. View live results after submitting
6. Use the chat feature to communicate

## 🔌 API Endpoints

### REST Endpoints
- `GET /health` - Server health check
- `GET /api/current-poll` - Get current active poll
- `GET /api/students` - Get list of connected students  
- `GET /api/poll-history` - Get poll history

### Socket Events

#### Teacher Events
- `teacher-join` - Join as teacher
- `create-poll` - Create a new poll
- `remove-student` - Remove a student from session

#### Student Events  
- `student-join` - Join as student
- `submit-response` - Submit poll response

#### Shared Events
- `poll-update` - Live poll updates
- `poll-ended` - Poll completion notification
- `students-update` - Student list updates
- `send-message` - Send chat message
- `new-message` - Receive chat message

## 🚀 Deployment

This application is deployed on **Vercel** with the following configuration:

### Frontend Deployment
- Framework: Vite (React)
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: `VITE_SERVER_URL`

### Backend Deployment
- Runtime: Node.js
- Start Command: `npm start`
- Environment Variables: `PORT`, `CORS_ORIGIN`

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Socket.io-client** - Real-time communication
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **UUID** - Unique identifiers
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Deployment & Tools
- **Vercel** - Hosting platform
- **Git** - Version control
- **npm** - Package manager

## 🎨 Design Features

- Clean, modern UI following Material Design principles
- Purple and white color scheme
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Real-time progress indicators
- Interactive polling interface
- Accessible design with proper ARIA labels

## 🚀 Future Enhancements

- [ ] Database integration for persistent data
- [ ] User authentication and authorization
- [ ] Advanced poll types (ranking, rating scales)
- [ ] Export poll results to CSV/PDF
- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Poll scheduling
- [ ] Breakout rooms for students
- [ ] Video/audio integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Built with modern React and Node.js technologies
- Deployed successfully on Vercel platform
- Real-time functionality powered by Socket.io
- UI components designed for accessibility and usability

---

