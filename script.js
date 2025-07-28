document.addEventListener('DOMContentLoaded', () => {
    // const loginBtn = document.getElementById('loginBtn'); // Removed login button reference
    const loginOverlay = document.getElementById('loginOverlay');
    const closeLoginBtn = document.getElementById('closeLogin');
    const loginForm = document.getElementById('loginForm');
    const chatContainer = document.querySelector('.chat-container');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    // Function to show login popup
    function showLoginPopup() {
        chatContainer.classList.add('blurred'); // Blur the chat
        loginOverlay.classList.add('active'); // Show the login overlay
    }

    // Function to hide login popup
    function hideLoginPopup() {
        loginOverlay.classList.remove('active'); // Hide the login overlay
        chatContainer.classList.remove('blurred'); // Unblur the chat
    }

    // Event listener for Cancel button in login popup
    closeLoginBtn.addEventListener('click', hideLoginPopup);

    // Event listener for login form submission (dummy for now)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login attempted! (This is a dummy login)');
        // In a real application, you'd send data to a server here
        hideLoginPopup(); // Hide after "login"
    });

    // Handle sending messages and typing "login"
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        // Add outgoing message to chat
        const outgoingMessageDiv = document.createElement('div');
        outgoingMessageDiv.classList.add('message', 'outgoing');
        outgoingMessageDiv.innerHTML = `<p>${messageText}</p>`;
        chatMessages.appendChild(outgoingMessageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Check for "login" keyword
        if (messageText.toLowerCase() === 'login') {
            // Apply typing animation effect before showing popup
            const headerTitle = chatContainer.querySelector('.chat-header h1');
            const originalTitle = headerTitle.textContent;

            // Temporarily replace header content with typing animation
            headerTitle.innerHTML = `<span class="typing-animation-container">login</span>`;
            
            // Wait for animation duration then show popup
            setTimeout(() => {
                showLoginPopup();
                headerTitle.textContent = originalTitle; // Revert title after animation/popup
            }, 1800); // Adjusted time for faster animation
        } else {
            // Simulate AI response (can be replaced with actual AI logic)
            setTimeout(() => {
                const incomingMessageDiv = document.createElement('div');
                incomingMessageDiv.classList.add('message', 'incoming');
                incomingMessageDiv.innerHTML = `<p>You said: "${messageText}". To login, please type "login".</p>`;
                chatMessages.appendChild(incomingMessageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 800);
        }

        messageInput.value = ''; // Clear input
    }
});