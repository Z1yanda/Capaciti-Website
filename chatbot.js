class PortfolioChatbot {
    constructor() {
        this.portfolioData = {
            name: "CAPACITI",
            projects: [
                {
                    name: "CAPACITI CHATBOT",
                    description: "An interactive chatbot project",
                    link: "https://landbot.online/v3/H-2887235-4OBEO6RDVQYT9AHU/index.html"
                },

            ],

        };

        this.responses = {
            greeting: [
                "Hello! I'm CAPACITI's portfolio assistant. How can I help you learn about their work?",
                "Hi there! I can tell you about CAPACITI. What would you like to know?",
                "Welcome! I'm here to help you explore CAPACITI. Ask me anything!"
            ],
            about: [
                "Capaciti is a work-readiness and digital skills development program aimed at equipping young South Africans with in-demand skills in tech, data, and business analysis, helping them transition into meaningful employment"
            ],
            application: [
                'You can apply on our website by filling out the online application form here: [https://capaciti.breezy.hr/]'

            ],
            free: [
                'Yes, CAPACITI programmes are fully sponsored for qualifying applicants. This includes training, mentorship, and sometimes stipends, depending on the programme.'
            ],
            programmes: [
               'There are many programms offered at CAPACITI, to name a few- AI, IT Support, Cloud Computing, etc' 

            ],
            apply: [
                'You can apply by visiting the CAPACITI website and navigating to the “Apply Now” or “Programmes” section. Follow the instructions, complete the online application form, and upload the required documents.'
            ],
            located: [
                'CAPACITI has campuses in Cape Town, Johannesburg, and Gqeberha. Some programmes may also be offered online or in hybrid formats.'
            ],
            location: [
                'You can usually find contact details at the bottom of the CAPACITI website or under the “Contact Us” page for further assistance. You can also call CAPACITI directly at **021 409 7000**.'
            ],
            campuses : [
                'CAPACITI has campuses in Cape Town, Johannesburg, and Gqeberha.'
            ],
            duration: [
                'Programme durations vary, typically ranging from 3 months to 12 months, depending on the course and level.'
            ],
            job :[
                'CAPACITI connects graduates with job opportunities through its partner network, although employment is not guaranteed. Many alumni go on to work in tech roles or continue learning.'
            ],
            contact: [
                ' You can usually find contact details at the bottom of the CAPACITI website or under the “Contact Us” page for further assistance.'
            ],
            documents: [
                ' You need your certified ID, academic transcripts, CV, and proof of residence'
            ],
            training: [
                'The training usually lasts between 12 and 18 months, depending on the track.'
            ],
            requirements: [
              'Applicants must usually be South African citizens aged 18–35, have a relevant IT qualification or background, and be passionate about technology. Specific requirements vary by programme.'  
            ],
            background: [
                'Yes! Some CAPACITI programmes are open to beginners and focus on foundational digital skills. Motivation and willingness to learn are often just as important as previous experience.'
            ],
            loaptop: [
                'Having your own device is helpful, but CAPACITI provides access to equipment at its campuses for those who need it. Specific requirements will be shared during onboarding.'
            ],
            support: [
                'You’ll receive academic support, mentorship, soft skills training, and access to a career coach or placement advisor to help you prepare for the job market.'
            ],
            mentorship: [
                'You’ll receive academic support, mentorship, soft skills training, and access to a career coach or placement advisor to help you prepare for the job market.'
            ],
            age: [
                'Most programmes are open to South African youth aged 18–35. Some exceptions may apply depending on the sponsor or programme focus.'
            ],
            limit: [
                'Most programmes are open to South African youth aged 18–35. Some exceptions may apply depending on the sponsor or programme focus.'       
            ],
            online: [  
                ' We offer a hybrid model – some sessions are in person, while others are virtual. It depends on your assigned track and location'
            ],
            placement: [
                `Yes! After completing the program, we connect you with partner companies for internships or job placements`
            ],
            women: [
                'Absolutely! CAPACITI actively encourages women to apply, especially in fields like AI, cloud, and software development where women are underrepresented.'
            ],
             courses: [
                ` We offer training in Data Science, Software Development, Business Analysis, Cloud Computing, Cybersecurity, and more.`
            ],
            certificate: [
                " Yes, upon successful completion of the program, you will receive a certificate and may be eligible for an industry-recognized credential as well"

            ],
            stipend: [
                " Yes, participants usually receive a monthly stipend to help cover basic costs like transport and data"

            ],
            troubleshooting: [
                " Please email our support team at support@capaciti.org.za"

            ],
            mentor: [
                " Yes, every participant is assigned a mentor to support your personal and professional development throughout the program"

            ],
            programend: [
                " You'll join our growing network of alumni and be supported in your journey to secure meaningful employment"

            ],
            default: [
                "I'm not sure about that, you can kindly contact CAPACITI on 021 409 7000.",
            ]
        };

        this.isOpen = false;
        this.initializeChatbot();
    }

    initializeChatbot() {
        this.createChatInterface();
        this.bindEvents();
    }

    createChatInterface() {
        const chatHTML = `
            <div id="portfolio-chatbot" class="chatbot-container" style="display: none;">
                <div class="chatbot-header">
                    <div class="header-content">
                        <h3>CAPACITI Assistant</h3>
                        <button id="chatbot-toggle">✕</button>
                    </div>
                </div>
                <div id="chatbot-messages" class="chatbot-messages"></div>
                <div class="chatbot-input">
                    <input type="text" id="chatbot-input" placeholder="Ask me about CAPACITI..." />
                    <button id="chatbot-send">Send</button>
                </div>
            </div>

            <style>
                .chatbot-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 320px;
                    height: 450px;
                    background: white;
                    border: 2px solid #FF6F61;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    z-index: 9999;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                }

                .chatbot-header {
                    background: #FF6F61;
                    color: white;
                    padding: 15px;
                    border-radius: 8px 8px 0 0;
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chatbot-header h3 {
                   margin: 0;
                    font-size: 16px;
                }

                #chatbot-toggle {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                #chatbot-toggle:hover {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                }

                .chatbot-messages {
                    flex: 1;
                    padding: 10px;
                    overflow-y: auto;
                    background: #f9f9f9;
                }

                .message {
                    margin: 10px 0;
                    padding: 8px 12px;
                    border-radius: 15px;
                    max-width: 80%;
                }

                .user-message {
                    background: #FF6F61;
                    color: white;
                    margin-left: auto;
                    text-align: right;
                }

                .bot-message {
                    background: white;
                    color: #333;
                    border: 1px solid #ddd;
                }

                .chatbot-input {
                    display: flex;
                    padding: 10px;
                    border-top: 1px solid #ddd;
                }

                #chatbot-input {
                    flex: 1;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    outline: none;
                }


                #chatbot-send {
                    margin-left: 10px;
                    padding: 8px 15px;
                    background: #FF6F61;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                }

                #chatbot-send:hover {
                    background: #e55a4f;
                }

                .chatbot-minimized {
                    height: 50px;
                }

                .chatbot-minimized .chatbot-messages,
                .chatbot-minimized .chatbot-input {
                    display: none;
                }

                /* Open Chatbot Button */
                .chatbot-open-btn {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background: #FF6F61;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(255, 111, 97, 0.3);
                    transition: all 0.3s ease;
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .chatbot-open-btn:hover {
                    background: #e55a4f;
                    transform: scale(1.1);
                    box-shadow: 0 6px 25px rgba(255, 111, 97, 0.4);
                }

                .chatbot-open-btn.hidden {
                    display: none;
                }

                /* Typing indicator */
                .typing-indicator {
                    display: flex;
                    align-items: center;
                    padding: 8px 12px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 15px;
                    max-width: 80%;
                    margin: 10px 0;
                }

                .typing-dots {
                    display: flex;
                    gap: 3px;
                }

                .typing-dot {
                    width: 6px;
                    height: 6px;
                    background: #FF6F61;
                    border-radius: 50%;
                    animation: typing 1.4s infinite;
                }

                .typing-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .typing-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.4;
                    }
                    30% {
                        transform: translateY(-10px);
                        opacity: 1;
                    }
                }
            </style>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);

        // Add welcome message
        setTimeout(() => {
            this.addMessage(this.getRandomResponse('greeting'), 'bot');
        }, 1000);
    }

    bindEvents() {
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotContainer = document.getElementById('portfolio-chatbot');
        const openBtn = document.getElementById('chatbot-open-btn');

        // Send message events
        chatbotSend.addEventListener('click', () => this.handleUserInput());
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        // Toggle chatbot (close)
        chatbotToggle.addEventListener('click', () => {
            this.closeChatbot();
        });

        // Open chatbot button
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                this.openChatbot();
            });
        }
    }

    openChatbot() {
        const chatbotContainer = document.getElementById('portfolio-chatbot');
        const openBtn = document.getElementById('chatbot-open-btn');

        if (chatbotContainer && openBtn) {
            chatbotContainer.style.display = 'flex';
            openBtn.classList.add('hidden');
            this.isOpen = true;

            // Focus on input
            setTimeout(() => {
                const input = document.getElementById('chatbot-input');
                if (input) input.focus();
            }, 100);
        }
    }

    closeChatbot() {
        const chatbotContainer = document.getElementById('portfolio-chatbot');
        const openBtn = document.getElementById('chatbot-open-btn');

        if (chatbotContainer && openBtn) {
            chatbotContainer.style.display = 'none';
            openBtn.classList.remove('hidden');
            this.isOpen = false;
        }
    }

    handleUserInput() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (message) {
            this.addMessage(message, 'user');
            input.value = '';

            // Show typing indicator
            this.showTypingIndicator();

            setTimeout(() => {
                this.hideTypingIndicator();
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, 1000 + Math.random() * 1000);
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

       if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
    return this.getRandomResponse('greeting');
}

if (this.containsKeywords(lowerMessage, ['application', 'apply', 'applying'])) {
    return this.getRandomResponse('application');
}

if (this.containsKeywords(lowerMessage, ['about', 'what is capaciti', 'info'])) {
    return this.getRandomResponse('about');
}

if (this.containsKeywords(lowerMessage, ['courses', 'programmes', 'programs', 'skills'])) {
    return this.getRandomResponse('courses');
}

if (this.containsKeywords(lowerMessage, ['documents', 'required documents', 'docs'])) {
    return this.getRandomResponse('documents');
}

if (this.containsKeywords(lowerMessage, ['training', 'duration', 'how long'])) {
    return this.getRandomResponse('training');
}

if (this.containsKeywords(lowerMessage, ['online', 'virtual', 'remote'])) {
    return this.getRandomResponse('online');
}

if (this.containsKeywords(lowerMessage, ['certificate', 'certification', 'credentials'])) {
    return this.getRandomResponse('certificate');
}

if (this.containsKeywords(lowerMessage, ['placement', 'internship', 'job'])) {
    return this.getRandomResponse('placement');
}

if (this.containsKeywords(lowerMessage, ['stipend', 'money', 'allowance', 'pay'])) {
    return this.getRandomResponse('stipend');
}

if (this.containsKeywords(lowerMessage, ['troubleshooting', 'problem', 'error', 'help'])) {
    return this.getRandomResponse('troubleshooting');
}

if (this.containsKeywords(lowerMessage, ['program end', 'after program', 'graduate'])) {
    return this.getRandomResponse('programend');
}

if (this.containsKeywords(lowerMessage, ['contact', 'reach', 'email', 'hire', 'connect'])) {
    return this.getRandomResponse('contact');
}

if (this.containsKeywords(lowerMessage, ['campus', 'location', 'where', 'based'])) {
    return this.getRandomResponse('location');
}

if (this.containsKeywords(lowerMessage, ['support', 'help', 'coach', 'mentorship'])) {
    return this.getRandomResponse('support');
}

if (this.containsKeywords(lowerMessage, ['mentor', 'mentors'])) {
    return this.getRandomResponse('mentor');
}

if (this.containsKeywords(lowerMessage, ['requirements', 'criteria', 'qualify'])) {
    return this.getRandomResponse('requirements');
}

if (this.containsKeywords(lowerMessage, ['background', 'beginner', 'experience'])) {
    return this.getRandomResponse('background');
}

if (this.containsKeywords(lowerMessage, ['laptop', 'device', 'equipment'])) {
    return this.getRandomResponse('loaptop');
}

if (this.containsKeywords(lowerMessage, ['age', 'limit'])) {
    return this.getRandomResponse('age');
}
if (this.containsKeywords(lowerMessage, ['free'])) {
    return this.getRandomResponse('free');
}

if (this.containsKeywords(lowerMessage, ['women', 'female'])) {
    return this.getRandomResponse('women');
}

// Default fallback response
return this.getRandomResponse('default');

    }

    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});