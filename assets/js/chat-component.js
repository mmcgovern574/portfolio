// Create the Chat component
const Chat = () => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [loading, setLoading] = React.useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!input.trim()) return;
  
      const newMessage = { role: 'user', content: input };
      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setLoading(true);
  
      try {
        // Replace YOUR_SPACE_NAME with your actual HuggingFace space name
        const response = await fetch('https://YOUR_SPACE_NAME.hf.space/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });
        
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      } finally {
        setLoading(false);
      }
    };
  
    return React.createElement('div', { 
      className: 'max-w-2xl mx-auto p-4 border rounded-lg shadow-sm bg-white' 
    }, [
      React.createElement('div', {
        key: 'messages',
        className: 'h-96 overflow-y-auto mb-4 p-4 space-y-4'
      }, [
        ...messages.map((msg, idx) => 
          React.createElement('div', {
            key: idx,
            className: `p-3 rounded-lg max-w-[80%] ${
              msg.role === 'user' 
                ? 'ml-auto bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`
          }, msg.content)
        ),
        loading && React.createElement('div', {
          key: 'loading',
          className: 'text-center text-gray-500'
        }, 'Thinking...')
      ]),
      React.createElement('form', {
        key: 'form',
        onSubmit: handleSubmit,
        className: 'flex gap-2'
      }, [
        React.createElement('input', {
          key: 'input',
          type: 'text',
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder: 'Type your message...',
          className: 'flex-1 p-2 border rounded',
          disabled: loading
        }),
        React.createElement('button', {
          key: 'button',
          type: 'submit',
          disabled: loading,
          className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300'
        }, 'Send')
      ])
    ]);
  };