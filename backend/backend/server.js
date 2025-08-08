// import dotenv from 'dotenv'
// dotenv.config()


// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';
// import { v4 as uuidv4 } from 'uuid';

// const app = express();
// const server = createServer(app);
// // Update CORS configuration
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CORS_ORIGIN || "http://localhost:5173",
//     methods: ["GET", "POST"]
//   }
// });

// app.use(cors());
// app.use(express.json());


import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);

// Comprehensive CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://quiz-polling.vercel.app",
    "https://quiz-polling-api.vercel.app",
    process.env.CORS_ORIGIN
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// Apply CORS to Express
app.use(cors(corsOptions));
app.use(express.json());

// Apply the same CORS to Socket.IO
const io = new Server(server, {
  cors: corsOptions,
  allowEIO3: true,
  transports: ["polling", "websocket"],
  pingTimeout: 60000,
  pingInterval: 25000
});

// In-memory storage for polls and students 
let currentPoll = null;
let students = new Map();
let pollHistory = [];
let pollTimer = null;
let chatMessages = [];

// Utility functions
const generatePollId = () => uuidv4();

const resetCurrentPoll = () => {
  if (pollTimer) {
    clearTimeout(pollTimer);
    pollTimer = null;
  }
  currentPoll = null;
};

const calculateResults = () => {
  if (!currentPoll) return null;
  
  const totalVotes = currentPoll.responses.length;
  const results = currentPoll.options.map(option => {
    const votes = currentPoll.responses.filter(r => r.selectedOption === option).length;
    return {
      option,
      votes,
      percentage: totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
    };
  });
  
  return {
    ...currentPoll,
    results,
    totalVotes,
    totalStudents: students.size
  };
};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Teacher joins
  socket.on('teacher-join', () => {
    socket.join('teachers');
    console.log('Teacher joined');
    
    // Send current poll state if exists
    if (currentPoll) {
      socket.emit('poll-update', calculateResults());
    }
    
    // Send students list
    socket.emit('students-update', Array.from(students.values()));
    
    // Send poll history
    socket.emit('poll-history', pollHistory);
  });

  // Student joins
  socket.on('student-join', (data) => {
    const { name } = data;
    
    // Check if name already exists
    const existingStudent = Array.from(students.values()).find(s => s.name === name);
    if (existingStudent) {
      socket.emit('name-taken');
      return;
    }
    
    const student = {
      id: socket.id,
      name,
      socketId: socket.id,
      joinedAt: new Date()
    };
    
    students.set(socket.id, student);
    socket.join('students');
    
    console.log(`Student ${name} joined`);
    
    // Notify all teachers about new student
    io.to('teachers').emit('students-update', Array.from(students.values()));
    
    // Send current poll if active
    if (currentPoll && currentPoll.status === 'active') {
      const studentResponse = currentPoll.responses.find(r => r.studentId === socket.id);
      if (!studentResponse) {
        socket.emit('poll-update', {
          ...currentPoll,
          hasResponded: false
        });
      } else {
        socket.emit('poll-update', {
          ...calculateResults(),
          hasResponded: true
        });
      }
    }
  });

  // Teacher creates a new poll
  socket.on('create-poll', (data) => {
    const { question, options, timeLimit } = data;
    
    // Reset any existing poll
    resetCurrentPoll();
    
    const pollId = generatePollId();
    currentPoll = {
      id: pollId,
      question,
      options,
      timeLimit: timeLimit || 60,
      createdAt: new Date(),
      status: 'active',
      responses: []
    };
    
    console.log('New poll created:', question);
    
    // Notify all connected users
    io.emit('poll-update', calculateResults());
    
    // Set timer for poll expiry
    pollTimer = setTimeout(() => {
      if (currentPoll && currentPoll.id === pollId) {
        currentPoll.status = 'completed';
        pollHistory.unshift({
          ...currentPoll,
          completedAt: new Date(),
          results: calculateResults().results
        });
        
        // Notify all users that poll has ended
        io.emit('poll-ended', calculateResults());
        resetCurrentPoll();
      }
    }, (timeLimit || 60) * 1000);
  });

  // Student submits response
  socket.on('submit-response', (data) => {
    const { selectedOption } = data;
    const student = students.get(socket.id);
    
    if (!student || !currentPoll || currentPoll.status !== 'active') {
      return;
    }
    
    // Check if student already responded
    const existingResponse = currentPoll.responses.find(r => r.studentId === socket.id);
    if (existingResponse) {
      return;
    }
    
    const response = {
      studentId: socket.id,
      studentName: student.name,
      selectedOption,
      timestamp: new Date()
    };
    
    currentPoll.responses.push(response);
    
    console.log(`${student.name} voted for: ${selectedOption}`);
    
    // Send updated results to everyone
    const results = calculateResults();
    io.emit('poll-update', results);
    
    // Check if all students have responded
    if (currentPoll.responses.length === students.size && students.size > 0) {
      currentPoll.status = 'completed';
      pollHistory.unshift({
        ...currentPoll,
        completedAt: new Date(),
        results: results.results
      });
      
      if (pollTimer) {
        clearTimeout(pollTimer);
        pollTimer = null;
      }
      
      io.emit('poll-ended', results);
      resetCurrentPoll();
    }
  });

  // Teacher removes a student
  socket.on('remove-student', (data) => {
    const { studentId } = data;
    const student = students.get(studentId);
    
    if (student) {
      students.delete(studentId);
      io.to(studentId).emit('kicked-out');
      io.to('teachers').emit('students-update', Array.from(students.values()));
      
      // Remove student's response from current poll if exists
      if (currentPoll) {
        currentPoll.responses = currentPoll.responses.filter(r => r.studentId !== studentId);
        io.emit('poll-update', calculateResults());
      }
      
      console.log(`Student ${student.name} was removed`);
    }
  });

  // Chat functionality
  socket.on('send-message', (data) => {
    const { message, senderType, senderName } = data;
    const chatMessage = {
      id: uuidv4(),
      message,
      senderType,
      senderName,
      timestamp: new Date()
    };
    
    chatMessages.push(chatMessage);
    io.emit('new-message', chatMessage);
  });

  socket.on('get-messages', () => {
    socket.emit('chat-history', chatMessages);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const student = students.get(socket.id);
    if (student) {
      students.delete(socket.id);
      console.log(`Student ${student.name} disconnected`);
      
      // Remove student's response from current poll if exists
      if (currentPoll) {
        currentPoll.responses = currentPoll.responses.filter(r => r.studentId !== socket.id);
        io.emit('poll-update', calculateResults());
      }
      
      // Notify teachers
      io.to('teachers').emit('students-update', Array.from(students.values()));
    }
    
    console.log('User disconnected:', socket.id);
  });
});

// API Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.get('/api/current-poll', (req, res) => {
  res.json(currentPoll ? calculateResults() : null);
});

app.get('/api/students', (req, res) => {
  res.json(Array.from(students.values()));
});

app.get('/api/poll-history', (req, res) => {
  res.json(pollHistory);
});

app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Quiz Polling Server is running',
    socketIO: 'Socket.IO server active'
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});