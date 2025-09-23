// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated counters for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Dashboard metrics animation
function animateDashboardMetrics() {
    const emailSent = document.getElementById('email-sent');
    const socialPosts = document.getElementById('social-posts');
    const leadsGenerated = document.getElementById('leads-generated');
    
    // Simulate real-time updates
    setInterval(() => {
        const currentEmail = parseInt(emailSent.textContent.replace(',', ''));
        const currentSocial = parseInt(socialPosts.textContent);
        const currentLeads = parseInt(leadsGenerated.textContent);
        
        emailSent.textContent = (currentEmail + Math.floor(Math.random() * 5) + 1).toLocaleString();
        socialPosts.textContent = currentSocial + Math.floor(Math.random() * 3);
        leadsGenerated.textContent = currentLeads + Math.floor(Math.random() * 2);
    }, 5000);
}

// AI Chat Simulation
const aiResponses = [
    "I can help you optimize your email open rates by analyzing the best send times for your audience.",
    "Based on your current data, I recommend A/B testing your subject lines to improve engagement.",
    "Your social media posts perform best on Tuesdays and Thursdays between 2-4 PM.",
    "I've identified 3 high-potential leads that are ready for follow-up based on their engagement patterns.",
    "Your email campaigns would benefit from more personalized content. I can help segment your audience.",
    "Consider increasing your social media posting frequency - your audience is highly engaged.",
    "I've detected a 15% increase in click-through rates when you use videos in your campaigns.",
    "Your best performing content includes industry insights and behind-the-scenes content."
];

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = userInput.value.trim();
    
    if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `
            <span class="message-author">You</span>
            <p>${message}</p>
        `;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        userInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            aiMessage.innerHTML = `
                <span class="message-author">AvaSkye</span>
                <p>${response}</p>
            `;
            chatMessages.appendChild(aiMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Allow Enter key to send message
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! Our team will get back to you within 24 hours.');
        this.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// CTA Button Actions
function startFreeTrial() {
    alert('Welcome to DigiMark101! Your free trial is starting. Please check your email for setup instructions.');
}

function scheduleDemo() {
    alert('Demo scheduled! Our team will contact you within 2 business hours to confirm your preferred time.');
}

function openClientPortal() {
    // Simulate opening client portal
    window.open('https://app.allinonemarketing.com/DigiMark101', '_blank');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, observerOptions);

// Observe all service cards and pricing cards
document.addEventListener('DOMContentLoaded', () => {
    // Animate counters when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = document.querySelectorAll('.stat-number');
                stats[0].textContent = '0';
                stats[1].textContent = '0%';
                stats[2].textContent = '0%';
                
                setTimeout(() => animateCounter(stats[0], 10000), 500);
                setTimeout(() => animateCounter(stats[1], 98), 700);
                setTimeout(() => animateCounter(stats[2], 500), 900);
                
                heroObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        observer.observe(card);
    });
    
    // Start dashboard metrics animation
    animateDashboardMetrics();
});

// Advanced Features
class MarketingAnalytics {
    constructor() {
        this.data = {
            emailStats: {
                sent: 2847,
                opened: 1423,
                clicked: 287,
                converted: 45
            },
            socialMedia: {
                posts: 156,
                engagement: 8542,
                followers: 12456,
                reach: 45789
            },
            leads: {
                generated: 89,
                qualified: 34,
                converted: 12,
                revenue: 15420
            }
        };
    }
    
    getEmailOpenRate() {
        return ((this.data.emailStats.opened / this.data.emailStats.sent) * 100).toFixed(1);
    }
    
    getClickThroughRate() {
        return ((this.data.emailStats.clicked / this.data.emailStats.opened) * 100).toFixed(1);
    }
    
    getConversionRate() {
        return ((this.data.emailStats.converted / this.data.emailStats.clicked) * 100).toFixed(1);
    }
    
    getSocialEngagementRate() {
        return ((this.data.socialMedia.engagement / this.data.socialMedia.reach) * 100).toFixed(1);
    }
    
    getLeadConversionRate() {
        return ((this.data.leads.converted / this.data.leads.qualified) * 100).toFixed(1);
    }
    
    getAverageRevenuePerLead() {
        return (this.data.leads.revenue / this.data.leads.converted).toFixed(0);
    }
}

// Initialize analytics
const analytics = new MarketingAnalytics();

// AI Assistant Enhanced Responses
const enhancedAIResponses = [
    {
        trigger: ['email', 'open rate', 'deliverability'],
        response: `Your current email open rate is ${analytics.getEmailOpenRate()}%. I recommend optimizing subject lines and send times to improve this metric.`
    },
    {
        trigger: ['social', 'engagement', 'posts'],
        response: `Your social media engagement rate is ${analytics.getSocialEngagementRate()}%. Consider posting more visual content and engaging with your audience directly.`
    },
    {
        trigger: ['leads', 'conversion', 'sales'],
        response: `Your lead conversion rate is ${analytics.getLeadConversionRate()}% with an average revenue of $${analytics.getAverageRevenuePerLead()} per converted lead.`
    },
    {
        trigger: ['roi', 'return', 'investment'],
        response: 'Based on your current metrics, I estimate a 347% ROI improvement with our AI optimization recommendations.'
    },
    {
        trigger: ['automation', 'workflow', 'process'],
        response: 'I can help you set up automated workflows that typically reduce manual work by 75% while increasing campaign effectiveness.'
    }
];

// Enhanced AI response function
function getEnhancedAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    for (const responseData of enhancedAIResponses) {
        if (responseData.trigger.some(trigger => message.includes(trigger))) {
            return responseData.response;
        }
    }
    
    // Fallback to random response
    return aiResponses[Math.floor(Math.random() * aiResponses.length)];
}

// Update the sendMessage function to use enhanced responses
const originalSendMessage = sendMessage;
sendMessage = function() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = userInput.value.trim();
    
    if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `
            <span class="message-author">You</span>
            <p>${message}</p>
        `;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        userInput.value = '';
        
        // Simulate AI response with enhanced logic
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            const response = getEnhancedAIResponse(message);
            aiMessage.innerHTML = `
                <span class="message-author">AvaSkye</span>
                <p>${response}</p>
            `;
            chatMessages.appendChild(aiMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
};

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Easter egg - Konami code for advanced features
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientShift 4s ease infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        
        alert('🎉 DigiMark101 Advanced Mode Activated! 🎉');
        konamiCode = [];
    }
});