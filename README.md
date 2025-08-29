# 🚀 **Elevatr - Jorge Ferrari Ce's AI Assistant**

<div align="center">

## 🌟 **LIVE & READY TO USE** 🌟
### **Experience Elevatr now at:**
# 👉 **[https://resume-ai-web.onrender.com](https://resume-ai-web.onrender.com)** 👈

---

*Meet Jorge Ferrari Ce through his intelligent AI companion!*

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=for-the-badge&logo=css3)
![Deployed](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)

</div>

---

## 🎯 **What is Elevatr?**

**Elevatr** is an intelligent AI-powered chat assistant specifically designed to share information about **Jorge Ferrari Ce** - his skills, projects, experience, and professional journey. Built as a modern, responsive web application, Elevatr serves as an interactive resume and portfolio showcase.

### 🌟 **Key Features**
- 💬 **Conversational AI Interface** - Natural chat experience about Jorge's background
- 🌍 **Bilingual Support** - English and Portuguese (Você também pode perguntar em português!)
- 📱 **Responsive Design** - Perfect on desktop, tablet, and mobile
- 🎨 **Modern UI/UX** - Glassmorphism design with smooth animations
- 📝 **Markdown Support** - Rich text formatting for AI responses
- 🔄 **Real-time Chat** - Live API integration with error handling and retry functionality
- 🗂️ **Conversation Management** - Persistent chat history and session management

---

## 🛠️ **Technology Stack**

### **Frontend Framework**
- **React 19.1.1** - Modern functional components with hooks
- **JavaScript ES6+** - Latest language features and best practices
- **CSS3** - Advanced styling with gradients, animations, and responsive design

### **UI/UX Libraries**
- **react-markdown** - Markdown rendering for rich AI responses
- **remark-gfm** - GitHub Flavored Markdown support (tables, strikethrough, etc.)

### **Key Features Implemented**
- **Custom Hooks** - `useElevatrChat` for state management and API integration
- **API Integration** - RESTful communication with Resume AI backend
- **Error Boundaries** - Graceful error handling and recovery
- **Responsive Design** - Mobile-first approach with breakpoints
- **Performance Optimization** - Lazy loading and optimistic updates

### **Development Tools**
- **Create React App** - Bootstrapped with CRA for rapid development
- **ES6 Modules** - Modern import/export system
- **Environment Variables** - Configurable API endpoints and settings

---

## 🚀 **What's Implemented**

### **💬 Chat Interface**
- **Real-time Messaging** - Send and receive messages instantly
- **Typing Indicators** - Visual feedback during AI processing
- **Message History** - Persistent conversation tracking
- **Character Limits** - Input validation with visual feedback (4000 char limit)
- **Auto-scroll** - Automatic scrolling to latest messages

### **🤖 AI Features**
- **Jorge-focused AI** - Specialized knowledge about Jorge Ferrari Ce
- **Markdown Rendering** - Rich text responses with formatting
- **Bilingual Responses** - Supports both English and Portuguese
- **Context Awareness** - Maintains conversation context across messages

### **🎨 User Experience**
- **Modern Design** - Glassmorphism with gradient backgrounds
- **Responsive Layout** - Works perfectly on all device sizes
- **Loading States** - Beautiful loading animations and spinners
- **Error Handling** - User-friendly error messages with retry options
- **Accessibility** - Keyboard navigation and screen reader support

### **🔧 Technical Features**
- **API Integration** - RESTful API communication
- **State Management** - React hooks for local state
- **Error Recovery** - Automatic retry mechanisms
- **Performance** - Optimized rendering and API calls
- **Security** - Safe external link handling and input validation

---

## 🎭 **User Interface Highlights**

### **Design Elements**
- 🌈 **Gradient Backgrounds** - Beautiful purple-blue gradients
- 💎 **Glassmorphism Effects** - Frosted glass chat container
- 🎨 **Modern Typography** - Clean, readable font stack
- ✨ **Smooth Animations** - Slide-in messages and hover effects
- 📱 **Mobile-Optimized** - Touch-friendly interface on mobile devices

### **Chat Features**
- 💭 **Message Bubbles** - Distinct styling for user vs AI messages
- ⏰ **Timestamps** - Time display for each message
- 🔄 **Retry Functionality** - Easy retry for failed messages
- 🗑️ **Clear Conversations** - Fresh start with one click
- 📊 **Character Counter** - Visual feedback for message length

---

## 💻 **Development Setup**

### **Prerequisites**
- Node.js 16+ and npm
- Modern web browser
- Text editor (VS Code recommended)

### **Quick Start**
```bash
# Clone the repository
git clone [repository-url]
cd resume-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API configuration

# Start development server
npm start
```

### **Environment Variables**
Create a `.env` file with:
```env
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_MAX_MESSAGE_LENGTH=4000
REACT_APP_DEFAULT_TEMPERATURE=0.7
REACT_APP_DEFAULT_MAX_TOKENS=1000
REACT_APP_APP_NAME=Elevatr
REACT_APP_PERSON_NAME=Jorge Ferrari Ce
```

---

## 📁 **Project Structure**

```
resume-ai/
├── public/
│   ├── index.html          # Main HTML template
│   ├── favicon.png         # Jorge's pixel art avatar
│   └── manifest.json       # PWA configuration
├── src/
│   ├── components/         # Reusable React components
│   ├── hooks/
│   │   └── useElevatrChat.js    # Main chat functionality hook
│   ├── types/
│   │   └── api.js          # API types and utilities
│   ├── App.js              # Main application component
│   ├── App.css             # Global styles and animations
│   └── index.js            # Application entry point
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

---

## 🌐 **API Integration**

### **Supported Endpoints**
- `POST /api/chat` - Send messages to Elevatr
- `GET /api/chat/{id}` - Load conversation history
- `DELETE /api/chat/{id}` - Delete conversations

### **Features**
- **Request Validation** - Input sanitization and length checks
- **Error Handling** - Comprehensive error messages and recovery
- **Rate Limiting** - Respectful API usage with user feedback
- **Conversation Management** - Automatic session handling

---

## 🎯 **Usage**

### **For Visitors**
1. **Visit** [https://resume-ai-web.onrender.com](https://resume-ai-web.onrender.com)
2. **Start chatting** with Elevatr about Jorge Ferrari Ce
3. **Ask anything** - skills, projects, experience, background
4. **Switch languages** - Ask in English or Portuguese
5. **Explore** - Let Elevatr guide you through Jorge's journey

### **Sample Questions**
- "What are Jorge's technical skills?"
- "Tell me about Jorge's projects"
- "What's Jorge's experience?"
- "Quais são as habilidades do Jorge?" (Portuguese)

---

## 🚀 **Deployment**

This application is deployed and live at **[https://resume-ai-web.onrender.com](https://resume-ai-web.onrender.com)**.

### **Build for Production**
```bash
npm run build
```

### **Deployment Platforms**
- ✅ **Render** - Current deployment platform
- ✅ **Vercel** - Alternative deployment option
- ✅ **Netlify** - Static deployment option

---

## 🤝 **Contributing**

This is a personal portfolio project for Jorge Ferrari Ce. While not open for external contributions, the code serves as a reference for building AI-powered chat interfaces.

---

## 📞 **Contact**

**Jorge Ferrari Ce**
- 🌐 Portfolio: Available through Elevatr chat
- 💬 Try Elevatr: [https://resume-ai-web.onrender.com](https://resume-ai-web.onrender.com)

---

## 📄 **License**

This project is a personal portfolio and demo application.

---

<div align="center">

### 🌟 **Experience the future of interactive resumes!** 🌟
# 👉 **[Chat with Elevatr Now!](https://resume-ai-web.onrender.com)** 👈

*Built with ❤️ using React, modern web technologies, and AI*

</div>