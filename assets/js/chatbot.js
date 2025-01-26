// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make sure React and ReactDOM are loaded
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
      console.error('React or ReactDOM not loaded');
      return;
    }
  
    // Make sure the Chat component is available
    if (typeof Chat === 'undefined') {
      console.error('Chat component not loaded');
      return;
    }
  
    try {
      // Get the container element
      const container = document.getElementById('chat-root');
      if (!container) {
        console.error('Chat root element not found');
        return;
      }
  
      // Create root and render the Chat component
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(Chat));
      
      console.log('Chat component successfully mounted');
    } catch (error) {
      console.error('Error mounting Chat component:', error);
    }
  });