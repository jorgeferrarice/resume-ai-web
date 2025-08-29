import { useState, useCallback, useRef } from 'react';
import { 
  API_CONFIG, 
  MESSAGE_ROLES, 
  createChatMessage, 
  createChatRequest, 
  validateMessage, 
  formatApiError, 
  validateApiResponse 
} from '../types/api';

/**
 * Custom hook for Elevatr chat functionality
 * Handles API communication, state management, and error handling
 */
export const useElevatrChat = () => {
  const [messages, setMessages] = useState([
    createChatMessage(
      "Hey there! 👋 I'm Elevatr, Jorge Ferrari Ce's personal AI assistant! I'm here to tell you all about Jorge's amazing journey, skills, projects, and what makes him tick. What would you like to know about this incredible human? 🌟\n\n*(Você também pode perguntar em português)*",
      MESSAGE_ROLES.ASSISTANT,
      'welcome-message'
    )
  ]);
  
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  /**
   * Send a message to Elevatr
   */
  const sendMessage = useCallback(async (message, options = {}) => {
    // Validate the message
    const validation = validateMessage(message);
    if (!validation.valid) {
      setError(validation.error);
      return null;
    }

    setIsLoading(true);
    setError(null);

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      // Add user message immediately to UI (optimistic update)
      const userMessage = createChatMessage(message, MESSAGE_ROLES.USER);
      setMessages(prev => [...prev, userMessage]);

      // Prepare API request (only include conversationId if it exists)
      const requestBody = createChatRequest(message, conversationId, options);
      
      // Remove conversationId from request if it's null/undefined to avoid validation errors
      if (!conversationId) {
        delete requestBody.conversationId;
      }
      
      console.log('Sending message to Elevatr:', { message, conversationId });

      // Make API call
      const response = await fetch(`${API_CONFIG.BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: abortControllerRef.current.signal
      });

      const data = await response.json();

      // Validate response structure
      if (!validateApiResponse(data)) {
        throw new Error('Invalid response format from server');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to send message to Elevatr');
      }

      // Add assistant response to messages
      const assistantMessage = createChatMessage(
        data.data.message,
        MESSAGE_ROLES.ASSISTANT,
        data.data.messageId
      );

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update conversation ID if this is a new conversation
      if (data.data.isNewConversation && data.data.conversationId) {
        setConversationId(data.data.conversationId);
        console.log('New conversation started:', data.data.conversationId);
      }

      // Log usage stats if available
      if (data.usage) {
        console.log('API Usage:', data.usage);
      }

      return data.data;

    } catch (err) {
      // Don't show error if request was aborted (user started new request)
      if (err.name === 'AbortError') {
        return null;
      }

      const errorMessage = formatApiError(err, err.response);
      setError(errorMessage);
      
      console.error('Chat API Error:', err);
      
      // Remove the optimistic user message on error
      setMessages(prev => prev.slice(0, -1));
      
      throw new Error(errorMessage);

    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [conversationId]);

  /**
   * Load an existing conversation by ID
   */
  const loadConversation = useCallback(async (id) => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log('Loading conversation:', id);

      const response = await fetch(`${API_CONFIG.BASE_URL}/chat/${id}`);
      const data = await response.json();

      if (!validateApiResponse(data) || !data.success) {
        throw new Error(data.error || 'Failed to load conversation');
      }

      if (data.data && data.data.messages) {
        setMessages(data.data.messages);
        setConversationId(id);
        console.log(`Loaded ${data.data.messages.length} messages for conversation ${id}`);
      }

      return data.data;

    } catch (err) {
      const errorMessage = formatApiError(err, err.response);
      setError(errorMessage);
      console.error('Load Conversation Error:', err);
      throw new Error(errorMessage);

    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear current conversation and start fresh
   */
  const clearConversation = useCallback(() => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setMessages([
      createChatMessage(
        "Hey there! 👋 I'm Elevatr, Jorge Ferrari Ce's personal AI assistant! I'm here to tell you all about Jorge's amazing journey, skills, projects, and what makes him tick. What would you like to know about this incredible human? 🌟\n\n*(Você também pode perguntar em português)*",
        MESSAGE_ROLES.ASSISTANT,
        'welcome-message'
      )
    ]);
    setConversationId(null);
    setError(null);
    setIsLoading(false);
    
    console.log('Conversation cleared - ready for new chat');
  }, []);

  /**
   * Delete a conversation from the server
   */
  const deleteConversation = useCallback(async (id = null) => {
    const targetId = id || conversationId;
    if (!targetId) return;

    try {
      console.log('Deleting conversation:', targetId);

      const response = await fetch(`${API_CONFIG.BASE_URL}/chat/${targetId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!validateApiResponse(data) || !data.success) {
        throw new Error(data.error || 'Failed to delete conversation');
      }

      // Clear local state if we deleted the current conversation
      if (targetId === conversationId) {
        clearConversation();
      }

      console.log('Conversation deleted successfully');
      return true;

    } catch (err) {
      const errorMessage = formatApiError(err, err.response);
      setError(errorMessage);
      console.error('Delete Conversation Error:', err);
      throw new Error(errorMessage);
    }
  }, [conversationId, clearConversation]);

  /**
   * Retry the last failed message
   */
  const retryLastMessage = useCallback(async () => {
    if (messages.length === 0) return;

    // Find the last user message
    const lastUserMessage = [...messages].reverse().find(
      msg => msg.role === MESSAGE_ROLES.USER
    );

    if (lastUserMessage) {
      // Remove any error messages and retry
      setError(null);
      return await sendMessage(lastUserMessage.content);
    }
  }, [messages, sendMessage]);

  /**
   * Get conversation stats
   */
  const getConversationStats = useCallback(() => {
    const userMessages = messages.filter(msg => msg.role === MESSAGE_ROLES.USER);
    const assistantMessages = messages.filter(msg => msg.role === MESSAGE_ROLES.ASSISTANT);
    
    return {
      totalMessages: messages.length,
      userMessages: userMessages.length,
      assistantMessages: assistantMessages.length,
      hasConversationId: !!conversationId,
      isActive: !isLoading && !error
    };
  }, [messages, conversationId, isLoading, error]);

  return {
    // State
    messages,
    conversationId,
    isLoading,
    error,
    
    // Actions
    sendMessage,
    loadConversation,
    clearConversation,
    deleteConversation,
    retryLastMessage,
    
    // Utilities
    getConversationStats,
    
    // Config
    maxMessageLength: API_CONFIG.MAX_MESSAGE_LENGTH
  };
};
