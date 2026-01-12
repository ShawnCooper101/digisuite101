# DigiBot101 - AI Voice Assistant Widget

A floating AI voice assistant widget with dual personalities: **Ava Skye** and **Matt**. Designed for integration with app.allinonemarketing.com and optimized for Windows 11 Chrome browser.

![DigiBot101 Widget](https://github.com/user-attachments/assets/e128acd7-fdc1-46d4-9295-f1a2fcae88e9)

## ✨ Features

### 🎤 Voice Interaction
- **Speech Recognition**: Real-time voice input using Web Speech API
- **Text-to-Speech**: Natural voice responses with customized voice settings
- **Voice Activation**: Microphone button for hands-free interaction

### 👥 Dual AI Assistants
- **Ava Skye** 👩‍💼: Professional female voice with warm, engaging personality
  - Higher pitch (1.2), moderate rate (0.9)
  - Perfect for business communications
  - Purple gradient theme

- **Matt** 👨‍💼: Confident male voice with authoritative warm tone
  - Lower pitch (0.8), steady rate (0.85) 
  - Ideal for presentations and client interactions
  - Blue gradient theme

### 🎨 Modern UI/UX
- **Floating Widget**: Draggable bubble in bottom-right corner
- **Expandable Panel**: Full chat interface with conversation history
- **Animated Effects**: Pulsing glow when listening, status indicators
- **Gradient Design**: Professional rounded corners and modern styling
- **Mobile Responsive**: Adapts to different screen sizes

### 💾 Memory & Persistence
- **localStorage Integration**: Conversation history preservation
- **Assistant Preference**: Remembers last selected assistant
- **Settings Persistence**: Voice and UI preferences saved

### 🌐 Integration Ready
- **Embeddable**: HTML/JS module for easy integration
- **Cross-Platform**: Chrome browser, Android WebView, Windows desktop
- **API Ready**: Structured for backend integration with app.allinonemarketing.com

## 🚀 Quick Start

### Development Mode
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to see the widget in action.

### Production Build
```bash
npm run build
npm start
```

### Embed Integration
```html
<!-- Simple Embed -->
<iframe src="http://localhost:3000/embed" width="100%" height="100%" frameborder="0"></iframe>

<!-- Or include as script (future implementation) -->
<div id="digibot101-widget"></div>
<script src="http://localhost:3000/widget.js"></script>
```

## 📱 Screenshots

### Main Interface
![Main Page](https://github.com/user-attachments/assets/e128acd7-fdc1-46d4-9295-f1a2fcae88e9)

### Expanded Widget - Ava Skye
![Ava Assistant](https://github.com/user-attachments/assets/d6738f67-87ae-407c-ac55-8393e2c23862)

### Expanded Widget - Matt
![Matt Assistant](https://github.com/user-attachments/assets/962df152-5721-4b87-981f-64e584920901)

## 🛠 Technical Architecture

### Built With
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Voice**: Web Speech API (SpeechRecognition + SpeechSynthesis)
- **State**: React Hooks with localStorage persistence
- **Icons**: Emoji avatars for cross-platform compatibility

### Key Components
```
src/
├── components/
│   ├── DigiBot101Widget.tsx     # Main widget controller
│   ├── FloatingBubble.tsx       # Minimized floating bubble
│   └── AssistantPanel.tsx       # Expanded chat interface
├── hooks/
│   ├── useVoice.ts             # Voice recognition & synthesis
│   └── useMemory.ts            # localStorage persistence
├── utils/
│   └── voiceAssistants.ts      # Assistant configurations
└── types/
    └── index.ts                # TypeScript definitions
```

### Voice Settings
```typescript
// Ava Skye
{
  pitch: 1.2,      // Higher, more engaging
  rate: 0.9,       // Moderate speaking speed
  volume: 1.0      // Full volume
}

// Matt
{
  pitch: 0.8,      // Lower, more authoritative
  rate: 0.85,      // Slightly slower for clarity
  volume: 1.0      // Full volume
}
```

## 🎯 Usage Examples

### Text Interaction
1. Click the floating widget bubble
2. Type your message in the input field
3. Click send or press Enter
4. View AI response with timestamp

### Voice Interaction
1. Click the microphone button
2. Speak your message (widget glows during listening)
3. Voice is automatically converted to text
4. AI responds with both text and voice

### Assistant Switching
1. Click on "👩‍💼 Ava Skye" or "👨‍💼 Matt" buttons
2. Interface theme changes instantly
3. Voice settings update for selected assistant
4. Conversation history is preserved

### Widget Dragging
1. Click and hold the minimized widget bubble
2. Drag to any position on screen
3. Release to set new position
4. Position is maintained until refresh

## 🔧 Configuration

### Environment Variables
```env
# Optional: API endpoints for production
NEXT_PUBLIC_API_URL=https://app.allinonemarketing.com/api
NEXT_PUBLIC_WIDGET_KEY=your_widget_key
```

### Voice Configuration
Edit `src/utils/voiceAssistants.ts` to customize:
- Voice pitch, rate, and volume
- Assistant personalities
- Avatar emojis
- Color themes

## 🚀 Deployment Options

### 1. Standalone Web App
Deploy as a Next.js application on Vercel, Netlify, or your hosting provider.

### 2. Embeddable Widget
```html
<script>
(function() {
  var script = document.createElement('script');
  script.src = 'https://your-domain.com/widget.js';
  script.async = true;
  document.head.appendChild(script);
})();
</script>
```

### 3. Chrome Extension
The widget can be packaged as a Chrome extension for persistent availability.

### 4. Desktop Application
Use Electron to create a Windows desktop application.

## 📋 Browser Compatibility

### ✅ Supported
- **Chrome** 25+ (Windows, Mac, Linux)
- **Edge** 79+ (Chromium-based)
- **Safari** 14.1+ (macOS, iOS)
- **Firefox** 49+ (limited voice support)

### Voice API Requirements
- HTTPS required for production (microphone access)
- User gesture required for first voice interaction
- Internet connection for speech recognition

## 🔮 Future Enhancements

### Planned Features
- [ ] Real AI integration (OpenAI/Anthropic API)
- [ ] Multi-language support
- [ ] Custom voice training
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] Mobile app versions
- [ ] WordPress plugin
- [ ] Slack integration

### Integration Roadmap
- [ ] Backend API connection to app.allinonemarketing.com
- [ ] User authentication and profiles
- [ ] Conversation analytics and insights
- [ ] A/B testing for different assistant personalities
- [ ] White-label customization options

## 📄 License

MIT License - feel free to use in commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on Chrome Windows 11
5. Submit a pull request

## 📞 Support

For integration support with app.allinonemarketing.com or customization requests, please open an issue or contact the development team.

---

**Ready to enhance your digital marketing platform with AI voice assistance!** 🚀