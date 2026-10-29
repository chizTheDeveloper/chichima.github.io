/**
 * Chimezie Chima AI Voice & Interactive Assistant
 * Features:
 * - Advanced Google Neural / Natural Voice Selection with automatic detection
 * - Continuous Hands-Free Conversation Mode (no need to click speak every turn)
 * - Automatic re-arming after AI completes speech
 * - Real-time animated audio visualizer
 * - Dual Mode (Continuous Voice + Text Fallback)
 * - Comprehensive Portfolio Knowledge Base
 */
(function() {
  if (window.__ChimezieVoiceAssistantLoaded) return;
  window.__ChimezieVoiceAssistantLoaded = true;

  // Portfolio Knowledge Base for Chimezie Chima
  const PORTFOLIO_KNOWLEDGE = {
    name: "Chimezie Chima",
    title: "Full-Stack Software Engineer, UI/UX Designer, & AI Developer",
    location: "Ottawa, Canada",
    email: "chichima.designs@gmail.com",
    github: "https://github.com/chizTheDeveloper",
    linkedin: "https://www.linkedin.com/in/chimezie-chima-253762186/",
    behance: "https://www.behance.net/chimeziechima",
    education: "Carleton University — B.Eng in Software Engineering (2020 - 2024)",
    projects: {
      lifelas: {
        title: "LifeLas Fintech App",
        desc: "A gamified personal finance mobile app that transforms budgeting and milestone tracking into a visual roadmap with clear net worth progression.",
        url: "lifelas-case-study.html"
      },
      rhythm: {
        title: "Rhythm Wellness Platform",
        desc: "An intelligent health platform optimizing metabolic wellness through circadian rhythm alignment, nutrition logging, and personalized biometric insights.",
        url: "rhythm-case-study.html"
      },
      atlas: {
        title: "Atlas AI Travel Planner",
        desc: "An adaptive travel companion that dynamically weaves personalized itineraries, real-time schedule adaptations, and budget tracking.",
        url: "atlas-case-study.html"
      },
      prism: {
        title: "Prism Eco-commerce Store",
        desc: "A sustainable mobile commerce platform featuring AR spatial product previews, transparent carbon ratings, and AI deal discovery.",
        url: "prism-case-study.html"
      }
    }
  };

  // Inject Styles
  const style = document.createElement("style");
  style.id = "chima-voice-assistant-styles";
  style.textContent = `
    .chima-va-root {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      user-select: none;
    }
    .chima-va-trigger {
      display: flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #3b82f6 100%);
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .chima-va-trigger:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 16px 35px -6px rgba(79, 70, 229, 0.6);
    }
    .chima-va-trigger-icon {
      position: relative;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chima-va-trigger-pulse {
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      background: rgba(99, 102, 241, 0.45);
      animation: chimaPulse 2s infinite;
    }
    @keyframes chimaPulse {
      0% { transform: scale(0.9); opacity: 0.8; }
      50% { transform: scale(1.35); opacity: 0; }
      100% { transform: scale(0.9); opacity: 0; }
    }
    .chima-va-modal {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 400px;
      max-width: calc(100vw - 32px);
      height: 560px;
      max-height: calc(100vh - 48px);
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(99, 102, 241, 0.35);
      border-radius: 24px;
      box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 45px rgba(99, 102, 241, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 1000000;
      opacity: 0;
      transform: translateY(20px) scale(0.96);
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .chima-va-modal.active {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .chima-va-header {
      padding: 14px 18px;
      background: rgba(30, 41, 59, 0.85);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .chima-va-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4f46e5, #06b6d4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 700;
      font-size: 14px;
      position: relative;
      flex-shrink: 0;
    }
    .chima-va-online-dot {
      position: absolute;
      bottom: -1px;
      right: -1px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #10b981;
      border: 2px solid #0f172a;
    }
    .chima-va-voice-pill {
      font-size: 10px;
      font-weight: 600;
      background: rgba(99, 102, 241, 0.2);
      color: #a5b4fc;
      padding: 2px 7px;
      border-radius: 9999px;
      border: 1px solid rgba(99, 102, 241, 0.35);
      white-space: nowrap;
    }
    .chima-va-handsfree-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 10px;
      font-weight: 600;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      padding: 2px 8px;
      border-radius: 9999px;
      border: 1px solid rgba(16, 185, 129, 0.35);
    }
    .chima-va-handsfree-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      animation: chimaPulseGreen 1.5s infinite;
    }
    @keyframes chimaPulseGreen {
      0% { transform: scale(0.9); opacity: 0.9; }
      50% { transform: scale(1.3); opacity: 0.4; }
      100% { transform: scale(0.9); opacity: 0.9; }
    }
    .chima-va-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chima-va-messages::-webkit-scrollbar {
      width: 6px;
    }
    .chima-va-messages::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }
    .chima-va-msg {
      max-width: 86%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 13px;
      line-height: 1.45;
      word-break: break-word;
    }
    .chima-va-msg-ai {
      align-self: flex-start;
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #f1f5f9;
      border-bottom-left-radius: 4px;
    }
    .chima-va-msg-user {
      align-self: flex-end;
      background: linear-gradient(135deg, #4f46e5, #4338ca);
      color: #ffffff;
      border-bottom-right-radius: 4px;
    }
    .chima-va-visualizer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      height: 28px;
      padding: 2px 0;
    }
    .chima-va-bar {
      width: 4px;
      height: 8px;
      background: #818cf8;
      border-radius: 9999px;
      transition: height 0.15s ease, background-color 0.2s ease;
    }
    .chima-va-visualizer.active .chima-va-bar {
      background: #38bdf8;
      animation: chimaBarBounce 0.75s ease-in-out infinite alternate;
    }
    .chima-va-visualizer.listening .chima-va-bar {
      background: #34d399;
      animation: chimaBarBounce 0.6s ease-in-out infinite alternate;
    }
    .chima-va-visualizer .chima-va-bar:nth-child(1) { animation-delay: 0.1s; }
    .chima-va-visualizer .chima-va-bar:nth-child(2) { animation-delay: 0.3s; }
    .chima-va-visualizer .chima-va-bar:nth-child(3) { animation-delay: 0.5s; }
    .chima-va-visualizer .chima-va-bar:nth-child(4) { animation-delay: 0.2s; }
    .chima-va-visualizer .chima-va-bar:nth-child(5) { animation-delay: 0.4s; }
    @keyframes chimaBarBounce {
      0% { height: 6px; }
      100% { height: 26px; }
    }
    .chima-va-footer {
      padding: 14px 16px;
      background: rgba(20, 27, 45, 0.98);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .chima-va-mic-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
    .chima-va-mic-btn {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981, #059669);
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
      transition: all 0.25s ease;
      position: relative;
    }
    .chima-va-mic-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 10px 28px rgba(16, 185, 129, 0.5);
    }
    .chima-va-mic-btn.listening {
      background: linear-gradient(135deg, #10b981, #047857);
      animation: chimaPulseLive 1.8s infinite;
    }
    .chima-va-mic-btn.muted {
      background: linear-gradient(135deg, #64748b, #475569);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      animation: none;
    }
    @keyframes chimaPulseLive {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { box-shadow: 0 0 0 14px rgba(16, 185, 129, 0); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    .chima-va-input-group {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(30, 41, 59, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      padding: 4px 6px 4px 14px;
    }
    .chima-va-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 13px;
    }
    .chima-va-input::placeholder {
      color: #94a3b8;
    }
    .chima-va-send-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #4f46e5;
      color: #ffffff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .chima-va-send-btn:hover {
      background: #4338ca;
    }
  `;
  document.head.appendChild(style);

  // Build DOM
  const root = document.createElement("div");
  root.className = "chima-va-root";
  root.innerHTML = `
    <!-- Trigger Button -->
    <div class="chima-va-trigger" id="chimaVaTrigger" title="Open Hands-Free Voice Assistant">
      <div class="chima-va-trigger-icon">
        <div class="chima-va-trigger-pulse"></div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </div>
      <span style="font-size: 13px; font-weight: 600; letter-spacing: -0.01em;">Voice AI</span>
    </div>

    <!-- Main Assistant Modal -->
    <div class="chima-va-modal" id="chimaVaModal">
      <!-- Header -->
      <div class="chima-va-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="chima-va-avatar">
            CC
            <div class="chima-va-online-dot"></div>
          </div>
          <div>
            <div style="font-size: 14px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 6px;">
              Chimezie Chima AI
              <span class="chima-va-voice-pill" id="chimaVaVoiceBadge">Google Voice</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
              <span class="chima-va-handsfree-badge" id="chimaVaHandsfreeBadge">
                <span class="chima-va-handsfree-dot"></span>
                Hands-Free
              </span>
              <span id="chimaVaStatusText" style="font-size: 11px; color: #94a3b8;">Listening...</span>
            </div>
          </div>
        </div>
        <button id="chimaVaClose" style="background: transparent; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; padding: 4px; line-height: 1;" title="Close">✕</button>
      </div>

      <!-- Messages Stream -->
      <div class="chima-va-messages" id="chimaVaMessages">
        <div class="chima-va-msg chima-va-msg-ai">
          Hi! 👋 I am <strong>Chimezie Chima AI</strong> using Google's voice engine. <strong>Hands-free mode is on</strong> — just start talking anytime, and I'll answer and listen back automatically!
        </div>
      </div>

      <!-- Footer & Controls -->
      <div class="chima-va-footer">
        <!-- Visualizer -->
        <div class="chima-va-visualizer listening" id="chimaVaVisualizer">
          <div class="chima-va-bar"></div>
          <div class="chima-va-bar"></div>
          <div class="chima-va-bar"></div>
          <div class="chima-va-bar"></div>
          <div class="chima-va-bar"></div>
        </div>

        <!-- Mic Row -->
        <div class="chima-va-mic-row">
          <button class="chima-va-mic-btn listening" id="chimaVaMicBtn" title="Hands-free active. Tap to mute/pause mic">
            <svg id="chimaVaMicIcon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </button>
        </div>

        <div style="text-align: center; font-size: 11px; color: #94a3b8;" id="chimaVaMicHint">
          🎙️ Hands-free continuous listening active &bull; Speak anytime
        </div>

        <!-- Text Input Fallback -->
        <div class="chima-va-input-group">
          <input type="text" class="chima-va-input" id="chimaVaInput" placeholder="Or type a question..." />
          <button class="chima-va-send-btn" id="chimaVaSendBtn" title="Send message">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  // References
  const trigger = document.getElementById("chimaVaTrigger");
  const modal = document.getElementById("chimaVaModal");
  const closeBtn = document.getElementById("chimaVaClose");
  const micBtn = document.getElementById("chimaVaMicBtn");
  const micIcon = document.getElementById("chimaVaMicIcon");
  const micHint = document.getElementById("chimaVaMicHint");
  const statusText = document.getElementById("chimaVaStatusText");
  const visualizer = document.getElementById("chimaVaVisualizer");
  const messagesBox = document.getElementById("chimaVaMessages");
  const textInput = document.getElementById("chimaVaInput");
  const sendBtn = document.getElementById("chimaVaSendBtn");
  const voiceBadge = document.getElementById("chimaVaVoiceBadge");
  const handsfreeBadge = document.getElementById("chimaVaHandsfreeBadge");

  // State
  let isHandsFreeEnabled = true;
  let isListening = false;
  let isSpeaking = false;
  let recognition = null;
  let selectedGoogleVoice = null;
  let restartTimeout = null;

  // --- Advanced Voice Engine Selection ---
  function selectAdvancedGoogleVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Strict priority hierarchy:
    // 1. Google US English (Standard high-definition neural voice)
    // 2. Google UK English Male/Female
    // 3. Any Google English voice
    // 4. Microsoft Natural Neural English voices (Aria, Jenny, Guy, Christopher)
    // 5. Any English voice marked non-local (online enhanced)
    const googleUS = voices.find(v => v.name === "Google US English" || (v.lang === "en-US" && v.name.includes("Google")));
    const googleUK = voices.find(v => v.name.includes("Google UK English") || (v.lang.startsWith("en") && v.name.includes("Google")));
    const googleAny = voices.find(v => v.name.toLowerCase().includes("google"));
    const naturalNeural = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Online (Natural)") || v.name.includes("Aria") || v.name.includes("Jenny") || v.name.includes("Guy")));
    const englishOnline = voices.find(v => v.lang.startsWith("en") && !v.localService);
    const englishDefault = voices.find(v => v.lang.startsWith("en"));

    const chosen = googleUS || googleUK || googleAny || naturalNeural || englishOnline || englishDefault || voices[0];
    selectedGoogleVoice = chosen;

    if (voiceBadge) {
      if (chosen.name.includes("Google")) {
        voiceBadge.textContent = "Google Neural Voice";
      } else if (chosen.name.includes("Natural")) {
        voiceBadge.textContent = "Google / Natural Voice";
      } else {
        voiceBadge.textContent = "Google HD Voice";
      }
    }
    return chosen;
  }

  // Pre-load voices
  if ("speechSynthesis" in window) {
    selectAdvancedGoogleVoice();
    window.speechSynthesis.onvoiceschanged = () => {
      selectAdvancedGoogleVoice();
    };
  }

  // Toggle modal
  function openModal() {
    modal.classList.add("active");
    trigger.style.display = "none";
    isHandsFreeEnabled = true;
    updateHandsFreeUI(true);
    startContinuousListening();
  }

  function closeModal() {
    modal.classList.remove("active");
    trigger.style.display = "flex";
    isHandsFreeEnabled = false;
    stopListening();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  trigger.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  // Append Message
  function addMessage(text, role) {
    const div = document.createElement("div");
    div.className = `chima-va-msg chima-va-msg-${role}`;
    div.textContent = text;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  // Knowledge Base Query Resolver
  function generateReply(query) {
    const q = query.toLowerCase();

    if (q.includes("lifelas") || q.includes("fintech") || q.includes("budget") || q.includes("finance")) {
      return "LifeLas is Chimezie's flagship fintech mobile app case study. It simplifies wealth management with interactive goal roadmaps and milestone clarity.";
    }
    if (q.includes("rhythm") || q.includes("wellness") || q.includes("health") || q.includes("metabolism")) {
      return "Rhythm is an AI wellness platform designed by Chimezie that syncs circadian health with metabolic tracking for customized nutrition insights.";
    }
    if (q.includes("atlas") || q.includes("travel") || q.includes("trip") || q.includes("vacation")) {
      return "Atlas is an AI travel companion designed by Chimezie that creates adaptive itineraries and reduces vacation planning stress.";
    }
    if (q.includes("prism") || q.includes("ecommerce") || q.includes("e-commerce") || q.includes("shopping") || q.includes("eco")) {
      return "Prism is an eco-conscious shopping experience featuring AR previews and transparent carbon ratings designed by Chimezie.";
    }
    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("framework") || q.includes("tools")) {
      return "Chimezie specializes in UI/UX Design with Figma and design systems, Full-Stack Development with React, Next.js, TypeScript, and Python, and AI integrations with Google Gemini.";
    }
    if (q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("carleton") || q.includes("graduate")) {
      return "Chimezie graduated from Carleton University in Ottawa with a Bachelor of Engineering in Software Engineering.";
    }
    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("message")) {
      return "You can reach Chimezie directly at chichima.designs@gmail.com, or connect on LinkedIn and GitHub.";
    }
    if (q.includes("who are you") || q.includes("what is this") || q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return "Hello! I am Chimezie Chima's AI voice assistant. Ask me anything about his projects, skills, or experience — I am listening hands-free!";
    }

    return "Chimezie is a Full-Stack Engineer and UI/UX Designer in Ottawa. What project or skill would you like to explore next?";
  }

  // Spoken Voice Output with Advanced Google Voice
  function speakResponse(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    // Temporarily pause speech recognition while speaking to prevent echo
    pauseListeningForSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectAdvancedGoogleVoice();
    if (voice) utterance.voice = voice;

    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      isSpeaking = true;
      visualizer.className = "chima-va-visualizer active";
      statusText.textContent = "Speaking...";
      micHint.textContent = "Speaking response aloud...";
    };

    utterance.onend = utterance.onerror = () => {
      isSpeaking = false;
      // AUTOMATICALLY RE-ARM LISTENING (NO NEED TO CLICK!)
      if (isHandsFreeEnabled) {
        statusText.textContent = "Listening... (Hands-Free)";
        micHint.textContent = "🎙️ Hands-free listening active • Speak anytime";
        visualizer.className = "chima-va-visualizer listening";
        resumeListeningAfterSpeech();
      } else {
        statusText.textContent = "Microphone paused";
        visualizer.className = "chima-va-visualizer";
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  // Continuous Hands-Free Speech Recognition Loop
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

  function initContinuousRecognition() {
    if (!SpeechRec) {
      micHint.textContent = "Speech recognition is not supported in this browser. Please type below.";
      return null;
    }

    const rec = new SpeechRec();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    let finalTranscript = "";

    rec.onstart = () => {
      isListening = true;
      visualizer.className = "chima-va-visualizer listening";
      statusText.textContent = "Listening...";
      micBtn.className = "chima-va-mic-btn listening";
      micHint.textContent = "🎙️ Hands-free continuous listening active • Speak anytime";
    };

    rec.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (interim) {
        statusText.textContent = `Hearing: "${interim.slice(0, 30)}..."`;
      }

      if (finalTranscript && finalTranscript.trim()) {
        const query = finalTranscript.trim();
        finalTranscript = "";
        handleUserMessage(query);
      }
    };

    rec.onerror = (event) => {
      console.warn("Speech recognition notice:", event.error);
      if (event.error === "not-allowed") {
        isHandsFreeEnabled = false;
        updateHandsFreeUI(false);
        micHint.textContent = "Microphone access blocked. Click the lock icon in the address bar to allow mic.";
      }
    };

    rec.onend = () => {
      isListening = false;
      // Auto-reconnect if hands-free is enabled and we are not speaking
      if (isHandsFreeEnabled && !isSpeaking) {
        clearTimeout(restartTimeout);
        restartTimeout = setTimeout(() => {
          if (isHandsFreeEnabled && !isSpeaking) {
            try { rec.start(); } catch(e){}
          }
        }, 150);
      }
    };

    return rec;
  }

  function startContinuousListening() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
    }
    if (!recognition) {
      recognition = initContinuousRecognition();
    }
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (e) {
        try { recognition.stop(); } catch(err){}
        setTimeout(() => { try { recognition.start(); } catch(err){} }, 100);
      }
    }
  }

  function pauseListeningForSpeech() {
    if (recognition && isListening) {
      try { recognition.stop(); } catch(e){}
    }
    isListening = false;
  }

  function resumeListeningAfterSpeech() {
    if (isHandsFreeEnabled && !isSpeaking) {
      setTimeout(() => {
        startContinuousListening();
      }, 200);
    }
  }

  function stopListening() {
    isListening = false;
    clearTimeout(restartTimeout);
    if (recognition) {
      try { recognition.stop(); } catch(e){}
    }
    visualizer.className = "chima-va-visualizer";
  }

  function updateHandsFreeUI(active) {
    if (active) {
      micBtn.className = "chima-va-mic-btn listening";
      handsfreeBadge.style.display = "inline-flex";
      handsfreeBadge.innerHTML = `<span class="chima-va-handsfree-dot"></span>Hands-Free`;
      micHint.textContent = "🎙️ Hands-free continuous listening active • Speak anytime";
      statusText.textContent = "Listening...";
      micBtn.title = "Hands-free active. Tap to mute mic";
    } else {
      micBtn.className = "chima-va-mic-btn muted";
      handsfreeBadge.style.display = "inline-flex";
      handsfreeBadge.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:#ef4444;"></span>Muted`;
      micHint.textContent = "Microphone muted. Tap mic to resume hands-free mode";
      statusText.textContent = "Mic Paused";
      micBtn.title = "Microphone muted. Tap to resume hands-free conversation";
    }
  }

  // Toggle Hands-free active vs Muted
  micBtn.addEventListener("click", () => {
    isHandsFreeEnabled = !isHandsFreeEnabled;
    updateHandsFreeUI(isHandsFreeEnabled);
    if (isHandsFreeEnabled) {
      startContinuousListening();
    } else {
      stopListening();
      if (isSpeaking && window.speechSynthesis) window.speechSynthesis.cancel();
    }
  });

  // Handle User Input (Continuous Speech or Typed)
  function handleUserMessage(text) {
    if (!text || !text.trim()) return;
    addMessage(text, "user");

    statusText.textContent = "Thinking...";
    visualizer.className = "chima-va-visualizer active";

    setTimeout(() => {
      const reply = generateReply(text);
      addMessage(reply, "ai");
      speakResponse(reply);
    }, 250);
  }

  // Text Send
  function submitText() {
    const val = textInput.value.trim();
    if (val) {
      textInput.value = "";
      handleUserMessage(val);
    }
  }

  sendBtn.addEventListener("click", submitText);
  textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitText();
  });
})();
