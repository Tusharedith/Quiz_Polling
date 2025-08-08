# Live Polling System

A real-time polling system built with React, Redux, Express.js, and Socket.io that allows teachers to create polls and students to participate in live voting sessions.

## Features

### Teacher Features
- Create polls with multiple choice questions
- Set customizable time limits (10-300 seconds)
- View live polling results with real-time updates
- Manage connected students
- Remove students from sessions
- View poll history
- Real-time chat with students

### Student Features
- Join sessions with unique names
- Participate in live polls with countdown timers
- View live results after submitting answers
- Real-time chat with teachers and other students
- Responsive design for all devices

### Technical Features
- Real-time communication using Socket.io
- State management with Redux Toolkit
- Responsive design with Tailwind CSS
- Modular component architecture
- Clean separation between frontend and backend

## Project Structure

```
├── backend/
│   ├── server.js          # Express server with Socket.io
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/         # Redux store and slices
│   │   ├── context/       # Socket context
│   │   └── App.jsx        # Main application component
│   ├── package.json       # Frontend dependencies
│   └── index.html         # Main HTML file
└── README.md
```

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

### For Teachers

1. Open the application and select "I'm a Teacher"
2. Create a new poll by:
   - Adding a question
   - Setting up multiple choice options (2-6 options)
   - Configuring the time limit (10-300 seconds)
3. Start the poll and view live results
4. Manage connected students from the Students tab
5. View poll history in the History tab
6. Use the chat feature to communicate with students

### For Students

1. Open the application and select "I'm a Student"
2. Enter your unique name to join the session
3. Wait for the teacher to start a poll
4. Answer questions within the time limit
5. View live results after submitting
6. Use the chat feature to communicate

## API Endpoints

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

## Technologies Used

### Frontend
- React 18
- Redux Toolkit for state management
- React Router for navigation
- Socket.io-client for real-time communication
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Express.js web framework
- Socket.io for real-time communication
- UUID for generating unique identifiers
- CORS for cross-origin requests

## Design Features

- Clean, modern UI following the provided Figma design
- Purple and white color scheme
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Real-time progress indicators
- Interactive polling interface

## Future Enhancements

- Database integration for persistent data
- User authentication and authorization
- Advanced poll types (ranking, rating scales)
- Export poll results to CSV/PDF
- Mobile app development
- Advanced analytics and reporting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.