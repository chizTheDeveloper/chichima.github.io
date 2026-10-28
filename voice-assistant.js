/**
 * Chimezie Chima AI Voice & Interactive Assistant
 * A high-performance, resilient voice agent running directly in the browser.
 * Supports spoken voice interaction, speech recognition, speech synthesis, 
 * live audio visualizer, text chat, and deep portfolio knowledge.
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
    coreSkills: [
      "UI/UX Design (Figma, Design Systems, Wireframing, User Testing)",
      "Full-Stack Development (React, Next.js, TypeScript, TailwindCSS, Node.js, Python)",
      "AI & Machine Learning (Gemini API, Multimodal AI, Prompt Engineering, PyTorch, LangChain)",
      "Cloud & DevOps (Firebase, Google Cloud Platform, Cloud Run, Docker, Git)"
    ],
    projects: {
      lifelas: {
        title: "LifeLas Fintech App",
        desc: "A gamified, visual personal finance mobile app that helps users budget, visualize net worth milestones, and make confident financial decisions.",
        url: "lifelas-case-study.html"
      },
      rhythm: {
        title: "Rhythm Wellness Platform",
        desc: "A health and wellness platform that optimizes metabolic health through intelligent meal tracking, circadian rhythm alignment, and personalized nutrition insights.",
        url: "rhythm-case-study.html"
      },
      atlas: {
        title: "Atlas AI Travel Planner",
        desc: "An intelligent travel agent that turns stressful trip planning into an adaptive journey with hyper-personalized itineraries and budget management.",
        url: "atlas-case-study.html"
      },
      prism: {
        title: "Prism Eco-commerce Store",
        desc: "A futuristic sustainable e-commerce mobile experience featuring AR product previews, transparent carbon footprint ratings, and AI deal matching.",
        url: "prism-case-study.html"
      }
    }
  };

  // Inject styles
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
      padding: 12px 18px;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .chima-va-trigger:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 16px 32px -6px rgba(79, 70, 229, 0.6);
    }
    .chima-va-trigger-icon {
      position: relative;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chima-va-trigger-pulse {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: rgba(99, 102, 241, 0.4);
      animation: chimaPulse 2s infinite;
    }
    @keyframes chimaPulse {
      0% { transform: scale(0.9); opacity: 0.8; }
      50% { transform: scale(1.3); opacity: 0; }
      100% { transform: scale(0.9); opacity: 0; }
    }
    .chima-va-modal {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 540px;
      max-height: calc(100vh - 48px);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 24px;
      box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.15);
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
      padding: 16px 20px;
      background: rgba(30, 41, 59, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      max-width: 85%;
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
      gap: 4px;
      height: 28px;
      padding: 4px 0;
    }
    .chima-va-bar {
      width: 3.5px;
      height: 8px;
      background: #818cf8;
      border-radius: 9999px;
      transition: height 0.15s ease, background-color 0.2s ease;
    }
    .chima-va-visualizer.active .chima-va-bar {
      background: #38bdf8;
      animation: chimaBarBounce 0.8s ease-in-out infinite alternate;
    }
    .chima-va-visualizer.active .chima-va-bar:nth-child(1) { animation-delay: 0.1s; }
    .chima-va-visualizer.active .chima-va-bar:nth-child(2) { animation-delay: 0.3s; }
    .chima-va-visualizer.active .chima-va-bar:nth-child(3) { animation-delay: 0.5s; }
    .chima-va-visualizer.active .chima-va-bar:nth-child(4) { animation-delay: 0.2s; }
    .chima-va-visualizer.active .chima-va-bar:nth-child(5) { animation-delay: 0.4s; }
    @keyframes chimaBarBounce {
      0% { height: 6px; }
      100% { height: 26px; }
    }
    .chima-va-footer {
      padding: 14px 16px;
      background: rgba(20, 27, 45, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .chima-va-mic-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    .chima-va-mic-btn {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      border: 2px solid rgba(255, 255, 255, 0.25);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
      transition: all 0.25s ease;
      position: relative;
    }
    .chima-va-mic-btn:hover {
      transform: scale(1.08);
      background: linear-gradient(135deg, #4338ca, #4f46e5);
    }
    .chima-va-mic-btn.listening {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);
      animation: chimaPulseRed 1.5s infinite;
    }
    @keyframes chimaPulseRed {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { box-shadow: 0 0 0 14px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
    .chima-va-input-group {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(30, 41, 59, 0.7);
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
    <div class="chima-va-trigger" id="chimaVaTrigger" title="Speak with Chimezie AI">
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
              <span style="font-size: 10px; background: rgba(99,102,241,0.25); color: #a5b4fc; padding: 2px 6px; border-radius: 9999px; border: 1px solid rgba(99,102,241,0.3);">Voice</span>
            </div>
            <div id="chimaVaStatusText" style="font-size: 11px; color: #94a3b8;">Ready to converse</div>
          </div>
        </div>
        <button id="chimaVaClose" style="background: transparent; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; padding: 4px; line-height: 1;" title="Close">✕</button>
      </div>

      <!-- Messages Stream -->
      <div class="chima-va-messages" id="chimaVaMessages">
        <div class="chima-va-msg chima-va-msg-ai">
          Hi there! 👋 I am <strong>Chimezie Chima AI</strong>. Ask me anything about Chimezie's UI/UX case studies, full-stack software projects, AI work, or how to get in touch!
        </div>
      </div>

      <!-- Footer & Controls -->
      <div class="chima-va-footer">
        <!-- Visualizer -->
        <div class="chima-va-visualizer" id="chimaVaVisualizer">
          <div class="chima-va-bar"></div>
          <div class="chima-va-bar"></div>
          <div class="chima-va-bar"></div>
          <div class="chima-va-bar"></div>
          <div class="chima-va-bar"></div>
        </div>

        <!-- Mic Row -->
        <div class="chima-va-mic-row">
          <button class="chima-va-mic-btn" id="chimaVaMicBtn" title="Click to speak">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </button>
        </div>

        <div style="text-align: center; font-size: 11px; color: #64748b;" id="chimaVaMicHint">
          Tap microphone to speak &bull; or type below
        </div>

        <!-- Text Input Fallback -->
        <div class="chima-va-input-group">
          <input type="text" class="chima-va-input" id="chimaVaInput" placeholder="Type a question..." />
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
  const micHint = document.getElementById("chimaVaMicHint");
  const statusText = document.getElementById("chimaVaStatusText");
  const visualizer = document.getElementById("chimaVaVisualizer");
  const messagesBox = document.getElementById("chimaVaMessages");
  const textInput = document.getElementById("chimaVaInput");
  const sendBtn = document.getElementById("chimaVaSendBtn");

  // State
  let isListening = false;
  let isSpeaking = false;
  let recognition = null;

  // Toggle modal
  function openModal() {
    modal.classList.add("active");
    trigger.style.display = "none";
  }
  function closeModal() {
    modal.classList.remove("active");
    trigger.style.display = "flex";
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

  // Answer Generator Engine
  function generateReply(query) {
    const q = query.toLowerCase();

    if (q.includes("lifelas") || q.includes("fintech") || q.includes("budget") || q.includes("finance")) {
      return "LifeLas is Chimezie's flagship fintech mobile app case study. It transforms complex personal finances into a clear, visual roadmap with gamified milestone tracking. You can explore the full case study on the LifeLas page!";
    }
    if (q.includes("rhythm") || q.includes("wellness") || q.includes("health") || q.includes("metabolism")) {
      return "Rhythm is an AI-powered health and wellness platform designed by Chimezie. It optimizes metabolic health through circadian rhythm analysis and smart meal tracking.";
    }
    if (q.includes("atlas") || q.includes("travel") || q.includes("trip")) {
      return "Atlas is an AI travel companion designed by Chimezie. It weaves stress-free personalized travel itineraries and adapts plans on the fly.";
    }
    if (q.includes("prism") || q.includes("ecommerce") || q.includes("e-commerce") || q.includes("shopping") || q.includes("eco")) {
      return "Prism is an eco-commerce shopping experience featuring augmented reality product previews and transparent carbon scoring designed by Chimezie.";
    }
    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("framework") || q.includes("tools")) {
      return "Chimezie specializes in UI/UX Design (Figma, design systems), Full-Stack Engineering (React, Next.js, TypeScript, TailwindCSS, Python, Node.js), and AI solutions with Gemini and multimodal architectures.";
    }
    if (q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("carleton")) {
      return "Chimezie graduated from Carleton University with a Bachelor of Engineering in Software Engineering (2020 - 2024).";
    }
    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("message")) {
      return "You can reach Chimezie directly at chichima.designs@gmail.com, or connect on LinkedIn and GitHub!";
    }
    if (q.includes("who are you") || q.includes("what is this") || q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return "Hello! I am Chimezie Chima's official AI assistant. I can tell you all about his software engineering experience, UI/UX case studies, or design philosophy.";
    }

    return "Chimezie is a Software Engineer and UI/UX Designer based in Ottawa, passionate about building intuitive digital experiences and AI integrations. Would you like to hear about his case studies like LifeLas or his technical skills?";
  }

  // Voice Output (SpeechSynthesis)
  function speakResponse(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha")));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      isSpeaking = true;
      visualizer.classList.add("active");
      statusText.textContent = "Speaking...";
    };

    utterance.onend = utterance.onerror = () => {
      isSpeaking = false;
      visualizer.classList.remove("active");
      statusText.textContent = "Ready";
    };

    window.speechSynthesis.speak(utterance);
  }

  // Speech Recognition
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

  function initRecognition() {
    if (!SpeechRec) {
      micHint.textContent = "Speech recognition not supported in this browser. Please type below.";
      return null;
    }
    const rec = new SpeechRec();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onstart = () => {
      isListening = true;
      micBtn.classList.add("listening");
      visualizer.classList.add("active");
      statusText.textContent = "Listening...";
      micHint.textContent = "Listening to your voice...";
    };

    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && transcript.trim()) {
        handleUserMessage(transcript);
      }
    };

    rec.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      stopListening();
      if (event.error === "not-allowed") {
        micHint.textContent = "Microphone access blocked in browser settings. Please type below.";
      } else {
        micHint.textContent = "Couldn't hear clearly. Try again or type below.";
      }
    };

    rec.onend = () => {
      stopListening();
    };

    return rec;
  }

  function startListening() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
    }
    if (!recognition) {
      recognition = initRecognition();
    }
    if (recognition) {
      try {
        recognition.start();
      } catch (e) {
        recognition.stop();
        setTimeout(() => { try { recognition.start(); } catch(err){} }, 100);
      }
    }
  }

  function stopListening() {
    isListening = false;
    micBtn.classList.remove("listening");
    if (!isSpeaking) visualizer.classList.remove("active");
    statusText.textContent = "Ready";
    micHint.textContent = "Tap microphone to speak • or type below";
    if (recognition) {
      try { recognition.stop(); } catch(e){}
    }
  }

  micBtn.addEventListener("click", () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  });

  // Handle User Input (Speech or Text)
  function handleUserMessage(text) {
    if (!text || !text.trim()) return;
    addMessage(text, "user");
    stopListening();

    statusText.textContent = "Thinking...";
    setTimeout(() => {
      const reply = generateReply(text);
      addMessage(reply, "ai");
      speakResponse(reply);
    }, 300);
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
