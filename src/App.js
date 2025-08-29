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
