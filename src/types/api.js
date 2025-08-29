/**
 * API Types and Interfaces for Resume AI
 * Adapted for JavaScript from TypeScript definitions
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
  MAX_MESSAGE_LENGTH: parseInt(process.env.REACT_APP_MAX_MESSAGE_LENGTH) || 4000,
  DEFAULT_TEMPERATURE: parseFloat(process.env.REACT_APP_DEFAULT_TEMPERATURE) || 0.7,
  DEFAULT_MAX_TOKENS: parseInt(process.env.REACT_APP_DEFAULT_MAX_TOKENS) || 1000
};

// Message roles
export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant'
};

// API Response structure validator
export const validateApiResponse = (response) => {
  return response && typeof response === 'object' && 'success' in response;
};

// Chat message factory
export const createChatMessage = (content, role = MESSAGE_ROLES.USER, id = null) => ({
  id: id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
  role,
  content,
  timestamp: new Date().toISOString()
});

// API request factory
export const createChatRequest = (message, conversationId = null, options = {}) => {
  const request = {
    message,
    temperature: options.temperature || API_CONFIG.DEFAULT_TEMPERATURE,
    maxTokens: options.maxTokens || API_CONFIG.DEFAULT_MAX_TOKENS
  };
  
  // Only include conversationId if it's a valid string
  if (conversationId && typeof conversationId === 'string' && conversationId.trim().length > 0) {
    request.conversationId = conversationId;
  }
  
  return request;
};

// Error message formatter
export const formatApiError = (error, response = null) => {
  if (response?.status === 429) {
    return "Too many requests. Please wait a moment and try again. ⏳";
  }
  
  if (response?.status === 400) {
    return error?.error || "Invalid request. Please check your input. ❌";
  }
  
  if (response?.status === 404) {
    return "Resource not found. 🔍";
  }
  
  if (response?.status >= 500) {
    return "Server error. Please try again later. 🔧";
  }
  
  return error?.error || error?.message || "Something went wrong. Please try again. 🔄";
};

// Validation helpers
export const validateMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message must be a non-empty string' };
  }
  
  if (message.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  
  if (message.length > API_CONFIG.MAX_MESSAGE_LENGTH) {
    return { 
      valid: false, 
      error: `Message too long. Maximum ${API_CONFIG.MAX_MESSAGE_LENGTH} characters allowed.` 
    };
  }
  
  return { valid: true };
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};
