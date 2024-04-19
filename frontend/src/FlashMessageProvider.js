import React, { useState, useEffect } from 'react';

export const FlashMessageContext = React.createContext();

export const FlashMessageProvider = ({ children, message = "Check your inbox to confirm your follow request.", duration = 2000 }) => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showMessage = () => {
    console.log('showMessage');
    setIsMessageVisible(true);
    const id = setTimeout(() => setIsMessageVisible(false), duration);
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <FlashMessageContext.Provider value={showMessage}>
      {children}
      {isMessageVisible && (
        <div
          className={`my-flash-message ${isMessageVisible ? 'flash-message-visible' : ''}`}
          role="alert"
          status="success"
          style={{ pointerEvents: 'auto' }}
        >
          {message}
        </div>
      )}
    </FlashMessageContext.Provider>
  );
};