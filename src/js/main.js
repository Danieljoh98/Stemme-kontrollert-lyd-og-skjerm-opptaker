// Voice & Screen Recorder JavaScript

class VoiceScreenRecorder {
    constructor() {
        this.recognition = null;
        this.audioRecorder = null;
        this.screenRecorder = null;
        this.audioStream = null;
        this.screenStream = null;
        this.previewStream = null;
        this.audioChunks = [];
        this.screenChunks = [];
        this.isVoiceEnabled = false;
        this.isRecording = false;
        this.recordingMode = null; // 'audio', 'screen'
        this.screenSelected = false;
        this.microphoneEnabled = false; // For microphone (shared between audio and screen)
        this.subtitlesEnabled = false; // For subtitle generation
        this.subtitleData = []; // Store subtitle timestamps and text
        this.recordingTimer = null; // For recording time display
        this.subtitleOverlay = null; // For on-screen subtitle display
        this.currentSubtitleText = ''; // Current subtitle text
        this.videoCanvas = null; // For subtitle embedding
        this.videoContext = null; // Canvas context for drawing
        this.recordings = [];
        this.isDarkTheme = false;
        this.microphonePermissionGranted = false;
        this.microphoneStream = null; // Keep persistent mic stream
        this.detailedLog = null; // For logging
        
        this.initElements();
        this.initLog();
        this.initMicrophone(); // Initialize mic with persistent permission
        this.initSpeechRecognition();
        this.bindEvents();
        this.initTheme();
    }
    
    initElements() {
        // Main controls
        this.startRecordingBtn = document.getElementById('startRecordingBtn');
        this.stopRecordingBtn = document.getElementById('stopRecordingBtn');
        this.voiceActivationBtn = document.getElementById('voiceActivationBtn');
        
        // Selection buttons
        this.selectAudioBtn = document.getElementById('selectAudioBtn');
        this.selectScreenBtn = document.getElementById('selectScreenBtn');
        this.toggleMicBtn = document.getElementById('toggleMicBtn');
        this.audioMicBtn = document.getElementById('audioMicBtn');
        
        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');
        
        // Status displays
        this.audioStatus = document.getElementById('audioStatus');
        this.screenStatus = document.getElementById('screenStatus');
        this.transcriptLive = document.getElementById('transcriptLive');
        
        // Screen preview
        this.screenPreview = document.getElementById('screenPreview');
        this.screenPlaceholder = document.getElementById('screenPlaceholder');
        this.previewVideo = document.getElementById('previewVideo');
        
        // Recordings
        this.recordingsListEl = document.getElementById('recordingsList');
        
        // Detailed Log
        this.detailedLog = document.getElementById('detailedLog');
    }
    
    initLog() {
        this.addLog('🚀 Voice & Screen Recorder initialized', 'info');
    }
    
    addLog(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.style.marginBottom = '0.5rem';
        logEntry.style.padding = '0.25rem';
        logEntry.style.borderRadius = '4px';
        
        // Color coding based on type
        switch(type) {
            case 'error':
                logEntry.style.background = 'rgba(239, 68, 68, 0.1)';
                logEntry.style.color = '#dc2626';
                break;
            case 'success':
                logEntry.style.background = 'rgba(16, 185, 129, 0.1)';
                logEntry.style.color = '#059669';
                break;
            case 'warning':
                logEntry.style.background = 'rgba(245, 158, 11, 0.1)';
                logEntry.style.color = '#d97706';
                break;
            default:
                logEntry.style.background = 'rgba(59, 130, 246, 0.1)';
                logEntry.style.color = '#2563eb';
        }
        
        logEntry.innerHTML = `<span style="opacity: 0.7;">[${timestamp}]</span> ${message}`;
        
        // Clear initial message if it exists
        const initialMessage = this.detailedLog.querySelector('[style*="text-align: center"]');
        if (initialMessage) {
            initialMessage.remove();
        }
        
        this.detailedLog.appendChild(logEntry);
        
        // Auto-scroll to bottom
        this.detailedLog.scrollTop = this.detailedLog.scrollHeight;
        
        // Also log to console
        console.log(`[${timestamp}] ${message}`);
    }
    
    async initMicrophone() {
        try {
            console.log('🎤 Requesting microphone permission at startup for all features...');
            this.addLog('🎤 Requesting microphone permission...', 'info');
            this.microphoneStream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });
            
            this.microphonePermissionGranted = true;
            console.log('✅ Microphone permission granted! All features now available.');
            this.addLog('✅ Microphone permission granted! All features available.', 'success');
            
            // Update UI immediately
            this.transcriptLive.textContent = '✅ Microphone ready! Voice commands are enabled by default.';
            
            // Auto-enable voice activation after permission is granted
            setTimeout(() => {
                this.enableVoiceActivation();
            }, 1000);
            
        } catch (error) {
            console.error('❌ Microphone access denied or not available:', error);
            this.addLog('❌ Microphone access denied: ' + error.message, 'error');
            this.microphonePermissionGranted = false;
            this.transcriptLive.textContent = '❌ Microphone access needed for all features. Please refresh and allow microphone access.';
        }
    }
    
    initSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.transcriptLive.textContent = 'Speech recognition not supported in this browser';
            return;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        
        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            
            // Clean up the text
            finalTranscript = finalTranscript.replace(/\.\s*$/, '').trim();
            interimTranscript = interimTranscript.replace(/\.\s*$/, '').trim();
            
            // Always display what's being heard
            if (finalTranscript || interimTranscript) {
                const displayText = finalTranscript + (interimTranscript ? ' [' + interimTranscript + ']' : '');
                this.transcriptLive.textContent = displayText;
            } else if (this.isVoiceEnabled) {
                this.transcriptLive.textContent = '🎤 Listening for voice commands...';
            }
            
            // Process voice commands if enabled
            if (finalTranscript && this.isVoiceEnabled) {
                this.processVoiceCommand(finalTranscript.toLowerCase().trim());
            }
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.transcriptLive.textContent = `Error: ${event.error}`;
        };
        
        this.recognition.onend = () => {
            if (this.isVoiceEnabled) {
                setTimeout(() => {
                    if (this.isVoiceEnabled) {
                        this.recognition.start();
                    }
                }, 100);
            }
        };
    }
    
    bindEvents() {
        this.startRecordingBtn.addEventListener('click', () => this.startRecording());
        this.stopRecordingBtn.addEventListener('click', () => this.stopRecording());
        this.voiceActivationBtn.addEventListener('click', () => this.toggleVoiceActivation());
        this.selectAudioBtn.addEventListener('click', () => this.selectAudioMode());
        this.selectScreenBtn.addEventListener('click', () => this.selectScreenMode());
        this.toggleMicBtn.addEventListener('click', () => this.toggleMicrophone());
        this.audioMicBtn.addEventListener('click', () => this.toggleAudioMicrophone());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
}

// Initialize the recorder when the page loads
let recorder;
window.addEventListener('load', () => {
    recorder = new VoiceScreenRecorder();
});

// Note: This is a simplified JavaScript structure.
// The complete functionality is temporarily in the original voice-recorder.html file.
// To complete the separation, all methods from the original file need to be copied here.
// Key methods that need to be added:
// - processVoiceCommand()
// - toggleMicrophone()
// - selectAudioMode()
// - selectScreenMode()
// - startRecording()
// - stopRecording()
// - startAudioRecording()
// - startScreenRecording()
// - downloadRecording()
// - playLastRecording()
// - pauseLastRecording()
// - And all other methods from the original VoiceScreenRecorder class

// For now, use the original voice-recorder.html file for full functionality
// This structure provides the foundation for proper separation