import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';
import { useElevatrChat } from './hooks/useElevatrChat';

function App() {
  const { 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearConversation,
    retryLastMessage,
    maxMessageLength
  } = useElevatrChat();
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText = null) => {
    const textToSend = messageText || inputValue.trim();
    if (textToSend === '' || isLoading) return;

    try {
      if (!messageText) {
        setInputValue(''); // Only clear input if not from suggestion click
      }
      
      await sendMessage(textToSend);
    } catch (err) {
      console.error('Failed to send message:', err);
      // Error is already handled by the hook
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Suggested questions for users to get started
  const suggestions = [
    "What are Jorge's main skills?",
    "What's he into? Hobbies... Movies...?",
    "What are some of Jorge's accomplishments?",
    "Tell me about Jorge's coolest projects",
    "What makes Jorge unique as a developer?"
  ];

  return (
    <div className="App">
      <div className="chat-container">
        <header className="chat-header">
          <h1>Elevatr</h1>
          <p>Ask me anything about Jorge Ferrari Ce! 🚀</p>
        </header>
        
        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-content">
                {message.role === 'assistant' ? (
                  <div className="markdown-content">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Customize rendering for specific elements
                        p: ({children}) => <p className="markdown-p">{children}</p>,
                        h1: ({children}) => <h1 className="markdown-h1">{children}</h1>,
                        h2: ({children}) => <h2 className="markdown-h2">{children}</h2>,
                        h3: ({children}) => <h3 className="markdown-h3">{children}</h3>,
                        code: ({node, inline, className, children, ...props}) => (
                          inline ? 
                          <code className="markdown-code-inline" {...props}>{children}</code> :
                          <code className="markdown-code-block" {...props}>{children}</code>
                        ),
                        pre: ({children}) => <pre className="markdown-pre">{children}</pre>,
                        ul: ({children}) => <ul className="markdown-ul">{children}</ul>,
                        ol: ({children}) => <ol className="markdown-ol">{children}</ol>,
                        li: ({children}) => <li className="markdown-li">{children}</li>,
                        blockquote: ({children}) => <blockquote className="markdown-blockquote">{children}</blockquote>,
                        a: ({children, href}) => (
                          <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
                            {children}
                          </a>
                        ),
                        table: ({children}) => <table className="markdown-table">{children}</table>,
                        thead: ({children}) => <thead className="markdown-thead">{children}</thead>,
                        tbody: ({children}) => <tbody className="markdown-tbody">{children}</tbody>,
                        tr: ({children}) => <tr className="markdown-tr">{children}</tr>,
                        td: ({children}) => <td className="markdown-td">{children}</td>,
                        th: ({children}) => <th className="markdown-th">{children}</th>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="user-message-text">{message.content}</p>
                )}
                <span className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message ai-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p className="typing-text">Elevatr is thinking...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="message error-message">
              <div className="message-content">
                <p className="error-text">⚠️ {error}</p>
                <button 
                  className="retry-button"
                  onClick={retryLastMessage}
                  disabled={isLoading}
                >
                  🔄 Retry
                </button>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion chips */}
        {messages.length <= 1 && !isLoading && (
          <div className="suggestions-container">
            <div className="suggestions-header">
              <span className="suggestions-title">💡 Try asking:</span>
            </div>
            <div className="suggestions-grid">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Jorge's skills, projects, experience, or anything else! 💬"
              className="message-input"
              rows="1"
              disabled={isLoading}
              maxLength={maxMessageLength}
            />
            <div className="input-footer">
              <div className="character-count">
                <span className={inputValue.length > maxMessageLength * 0.8 ? 'warning' : ''}>
                  {inputValue.length}/{maxMessageLength}
                </span>
              </div>
              
              <div className="github-links">
                <a
                  href="https://github.com/jorgeferrarice/resume-ai-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                  title="View Web Repository"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Web
                </a>
                <a
                  href="https://github.com/jorgeferrarice/resume-ai-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                  title="View API Repository"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  API
                </a>
              </div>
              
              <button 
                className="clear-button"
                onClick={clearConversation}
                title="Start new conversation"
                disabled={isLoading}
              >
                🗑️
              </button>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            className="send-button"
            disabled={isLoading || inputValue.trim() === ''}
            title="Send message"
          >
            {isLoading ? (
              <div className="loading-spinner">⏳</div>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
