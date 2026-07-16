// ===== 花音故事 — 应用核心逻辑 =====

// ----- 全局状态 -----
const state = {
  currentStory: null,
  currentPage: 0,
  isAutoPlay: true,
  isSpeaking: false,
  currentQuiz: 0,
  correctCount: 0,
  quizAnswered: false,
  questionTimer: null,
};

// ----- 工具函数 -----
function $(id) { return document.getElementById(id); }
function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.length === 6) hex = 'FF' + hex;
  const r = parseInt(hex.slice(2,4), 16);
  const g = parseInt(hex.slice(4,6), 16);
  const b = parseInt(hex.slice(6,8), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ===== 页面切换 =====
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = $('page-' + name);
  if (page) page.classList.add('active');
}

// ===== TTS 语音 =====
const synth = window.speechSynthesis;
let currentUtterance = null;
let _voicesReady = false;
let _ttsAvailable = !!synth;

// 强制加载 voices（Chrome 异步加载）
if (synth) {
  const voices = synth.getVoices();
  if (voices && voices.length > 0) {
    _voicesReady = true;
  }
  synth.onvoiceschanged = () => {
    _voicesReady = true;
    _ttsAvailable = synth.getVoices().length > 0;
  };
  // 超时检测：3 秒后 voices 还没加载，标记为不可用
  setTimeout(() => {
    if (!_voicesReady) {
      _voicesReady = true;
      _ttsAvailable = synth.getVoices().length > 0;
    }
  }, 3000);
}

function speak(text, onEnd) {
  stopSpeak();
  if (!synth || !_ttsAvailable) {
    // TTS 不可用，静默完成
    state.isSpeaking = false;
    updateSpeakButton();
    if (onEnd) setTimeout(onEnd, 100);
    return;
  }

  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN';
  u.rate = 0.85;
  u.pitch = 1.15;
  u.volume = 1;

  // 优先选本地中文语音（离线可用），不指定则用浏览器默认
  if (_voicesReady) {
    const voices = synth.getVoices();
    // 优先本地语音（localService），其次远程
    const localZh = voices.find(v => v.lang.startsWith('zh') && v.localService);
    const anyZh = voices.find(v => v.lang.startsWith('zh'));
    const target = localZh || anyZh;
    if (target) u.voice = target;
  }

  u.onstart = () => {
    state.isSpeaking = true;
    updateSpeakButton();
  };
  u.onend = () => {
    currentUtterance = null;
    state.isSpeaking = false;
    updateSpeakButton();
    if (onEnd) onEnd();
  };
  u.onerror = (e) => {
    console.log('TTS error:', e.error);
    currentUtterance = null;
    state.isSpeaking = false;
    updateSpeakButton();
    // 如果是网络错误，标记不可用
    if (e.error === 'network' || e.error === 'not-allowed') {
      _ttsAvailable = false;
    }
    if (onEnd) setTimeout(onEnd, 100);
  };

  currentUtterance = u;
  state.isSpeaking = true;
  updateSpeakButton();
  synth.speak(u);
}

function stopSpeak() {
  if (synth) synth.cancel();
  currentUtterance = null;
  state.isSpeaking = false;
}

function updateSpeakButton() {
  const btn = $('btn-speak');
  if (!btn) return;
  if (!_ttsAvailable) {
    btn.style.display = 'none'; // TTS 不可用，隐藏朗读按钮
  } else if (state.isSpeaking) {
    btn.style.display = '';
    btn.textContent = '🔊 朗读中…';
  } else {
    btn.style.display = '';
    btn.textContent = '🔊 再读一次';
  }
}

// 确保 voices 加载（Chrome 异步）
if (synth) {
  synth.getVoices();
  synth.onvoiceschanged = () => synth.getVoices();
}

// ===== 首页 =====
function renderHome() {
  const list = $('story-list');
  list.innerHTML = SAMPLE_STORIES.map(story => `
    <div class="story-card" style="background: linear-gradient(135deg, ${hexToRgba(story.coverColor, 0.7)}, ${story.coverColor})"
         onclick="openStory('${story.id}')">
      <div class="story-card-cover">${story.coverEmoji}</div>
      <div class="story-card-body">
        <div class="story-card-title">${story.title}</div>
        <div class="story-card-desc">${story.description}</div>
        <div class="story-card-tags">
          ${story.tagTypes.map(t => `<span class="story-card-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="story-card-arrow">›</div>
    </div>
  `).join('');
}

function goHome() {
  stopSpeak();
  clearTimeout(state.questionTimer);
  state.currentStory = null;
  state.currentPage = 0;
  state.currentQuiz = 0;
  state.correctCount = 0;
  state.quizAnswered = false;
  showPage('home');
}

// ===== 引导问题页 =====
function openStory(storyId) {
  const story = SAMPLE_STORIES.find(s => s.id === storyId);
  if (!story) return;
  state.currentStory = story;

  $('q-story-emoji').textContent = story.coverEmoji;
  $('q-story-title').textContent = story.title;

  const card = $('q-card');
  const number = $('q-number');
  const text = $('q-text');
  const ready = $('q-ready');

  card.classList.remove('hidden');
  ready.classList.add('hidden');

  let qi = 0;
  showPage('questions');

  function showNext() {
    if (qi < story.guideQuestions.length) {
      card.style.opacity = '0';
      setTimeout(() => {
        number.textContent = `第 ${qi + 1} 个问题`;
        text.textContent = story.guideQuestions[qi].text;
        card.style.opacity = '1';
        qi++;
        state.questionTimer = setTimeout(showNext, 2200);
      }, 400);
    } else {
      card.classList.add('hidden');
      ready.classList.remove('hidden');
      ready.classList.add('fade-in');
      state.questionTimer = setTimeout(() => startStory(), 1800);
    }
  }
  showNext();
}

function skipToStory() {
  clearTimeout(state.questionTimer);
  startStory();
}

// ===== 故事播放页 =====
function startStory() {
  clearTimeout(state.questionTimer);
  state.currentPage = 0;
  stopSpeak();
  showPage('story');
  renderStoryPage();
  updateDots();
  updateAutoPlayBtn();

  // 显示覆盖层，等待用户点击后开始朗读（满足浏览器 TTS 用户手势要求）
  const overlay = $('story-overlay');
  const btn = $('btn-start-story');
  overlay.classList.remove('hidden');

  if (_ttsAvailable) {
    btn.innerHTML = '🔊<br><span>点击开始听故事</span>';
  } else {
    btn.innerHTML = '📖<br><span>点击开始阅读</span>';
  }

  btn.onclick = () => {
    overlay.classList.add('hidden');
    if (_ttsAvailable) {
      speakCurrentPage();
    } else {
      // 无 TTS：直接进入静音阅读模式
      state.isSpeaking = false;
      updateSpeakButton();
    }
  };
}

function renderStoryPage() {
  const story = state.currentStory;
  const page = story.pages[state.currentPage];
  const total = story.pages.length;

  // 插画
  const illust = $('story-illust');
  illust.style.background = `linear-gradient(180deg, ${hexToRgba(page.bgColor, 0.4)}, ${page.bgColor})`;

  const emoji = $('story-emoji');
  emoji.classList.add('pulse');
  emoji.textContent = page.emoji || '📖';
  setTimeout(() => emoji.classList.remove('pulse'), 600);

  // 文字
  $('story-text').textContent = page.text;

  // 按钮状态
  $('btn-prev').disabled = (state.currentPage === 0);
  const isLast = state.currentPage === total - 1;
  $('btn-next').textContent = isLast ? '答问题 ✨' : '下一页 ▶';
}

function speakCurrentPage() {
  if (!_ttsAvailable) {
    // 无 TTS：不触发自动翻页
    state.isSpeaking = false;
    updateSpeakButton();
    return;
  }
  const page = state.currentStory.pages[state.currentPage];
  speak(page.text, () => {
    if (state.isAutoPlay && state.currentPage < state.currentStory.pages.length - 1) {
      setTimeout(() => nextPage(), 700);
    }
  });
}

function replayPage() {
  stopSpeak();
  setTimeout(() => speakCurrentPage(), 150);
}

function nextPage() {
  stopSpeak();
  const total = state.currentStory.pages.length;
  if (state.currentPage < total - 1) {
    state.currentPage++;
    renderStoryPage();
    updateDots();
    updateSpeakButton();
    setTimeout(() => speakCurrentPage(), 300);
  } else {
    // 故事结束 → 问答
    startQuiz();
  }
}

function prevPage() {
  if (state.currentPage > 0) {
    stopSpeak();
    state.currentPage--;
    renderStoryPage();
    updateDots();
    updateSpeakButton();
    setTimeout(() => speakCurrentPage(), 300);
  }
}

function toggleAutoPlay() {
  state.isAutoPlay = !state.isAutoPlay;
  updateAutoPlayBtn();
}

function updateAutoPlayBtn() {
  const btn = $('btn-autoplay');
  if (!_ttsAvailable) {
    btn.style.display = 'none';
    state.isAutoPlay = false;
    return;
  }
  btn.style.display = '';
  if (state.isAutoPlay) {
    btn.textContent = '🔊 自动';
    btn.classList.remove('manual');
  } else {
    btn.textContent = '👆 手动';
    btn.classList.add('manual');
  }
}

function updateDots() {
  const total = state.currentStory.pages.length;
  const dots = $('story-dots');
  dots.innerHTML = Array.from({length: total}, (_, i) => {
    let cls = 'story-dot';
    if (i === state.currentPage) cls += ' active';
    else if (i < state.currentPage) cls += ' done';
    return `<div class="${cls}" style="width:${i === state.currentPage ? 24 : 8}px"></div>`;
  }).join('');
}

// ===== 互动问答页 =====
function startQuiz() {
  stopSpeak();
  state.currentQuiz = 0;
  state.correctCount = 0;
  state.quizAnswered = false;
  showPage('quiz');
  renderQuiz();
}

function renderQuiz() {
  const story = state.currentStory;
  const quiz = story.quizQuestions[state.currentQuiz];
  const total = story.quizQuestions.length;

  // 进度条
  $('quiz-bar').innerHTML = `<div class="quiz-bar-inner" style="width:${((state.currentQuiz + 1) / total) * 100}%"></div>`;

  // 题目
  $('quiz-number').textContent = `第 ${state.currentQuiz + 1} 题`;
  $('quiz-question').textContent = quiz.question;

  // 选项
  const letters = ['A', 'B', 'C', 'D'];
  $('quiz-options').innerHTML = quiz.options.map((opt, i) => `
    <div class="quiz-option" data-index="${i}" onclick="selectOption(${i})">
      <div class="quiz-option-letter">${letters[i]}</div>
      <span>${opt}</span>
    </div>
  `).join('');

  // 隐藏反馈和继续按钮
  $('quiz-feedback').classList.add('hidden');
  $('btn-quiz-next').classList.add('hidden');
  state.quizAnswered = false;
}

function selectOption(index) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;

  const story = state.currentStory;
  const quiz = story.quizQuestions[state.currentQuiz];
  const isCorrect = index === quiz.correct;

  if (isCorrect) state.correctCount++;

  // 高亮选项
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach((el, i) => {
    el.classList.add('disabled');
    if (i === quiz.correct) el.classList.add('correct');
    else if (i === index && !isCorrect) el.classList.add('wrong');
  });

  // 显示反馈
  const fb = $('quiz-feedback');
  fb.classList.remove('hidden', 'correct', 'wrong');
  fb.classList.add(isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = `
    <span class="quiz-fb-icon">${isCorrect ? '🎉' : '💛'}</span>
    <p>${isCorrect ? quiz.good : quiz.hint}</p>
    ${quiz.kp ? `<div class="quiz-fb-kp">📚 ${quiz.kp}</div>` : ''}
  `;
  fb.classList.add('fade-in');

  // 朗读反馈
  speak(isCorrect ? quiz.good : quiz.hint);

  // 显示继续按钮
  const btn = $('btn-quiz-next');
  btn.classList.remove('hidden');
  const isLast = state.currentQuiz === story.quizQuestions.length - 1;
  btn.textContent = isLast ? '看总结 🎉' : '下一题 →';
  btn.classList.add('fade-in');
}

function nextQuiz() {
  stopSpeak();
  const story = state.currentStory;
  if (state.currentQuiz < story.quizQuestions.length - 1) {
    state.currentQuiz++;
    state.quizAnswered = false;
    renderQuiz();
  } else {
    showSummary();
  }
}

// ===== 知识点小结 =====
function showSummary() {
  stopSpeak();
  showPage('summary');

  const story = state.currentStory;
  const total = story.quizQuestions.length;
  const correct = state.correctCount;
  const ratio = correct / total;

  // 星级
  let star, msg;
  if (ratio >= 1) {
    star = '🏆'; msg = '全部答对啦！你真是太厉害了！每个知识点都记住啦！';
  } else if (ratio >= 0.7) {
    star = '🎉'; msg = '答得真好！大部分题都做对了，继续加油哦！';
  } else {
    star = '🌟'; msg = '今天学得很认真呢！再来一次一定会做得更好～';
  }

  $('summary-star').innerHTML = `<span class="pulse">${star}</span>`;
  $('summary-msg').textContent = msg;
  $('summary-score').innerHTML = `答对了 <b style="font-size:26px;color:#7B1FA2;">${correct}</b> / ${total} 道题`;

  // 知识点卡片
  $('summary-kp-list').innerHTML = story.knowledgePoints.map(kp => `
    <div class="kp-card" style="border-left-color:${kp.typeColor}">
      <div class="kp-card-header">
        <span class="kp-card-type" style="background:${hexToRgba(kp.typeColor, 0.12)};color:${kp.typeColor}">${kp.type}</span>
        <span class="kp-card-title">${kp.title}</span>
      </div>
      <div class="kp-card-body">${kp.explanation}</div>
      ${kp.examples ? `<div class="kp-card-examples">${kp.examples.map(e => `<span class="kp-card-ex">✨ ${e}</span>`).join('')}</div>` : ''}
    </div>
  `).join('');

  // 朗读鼓励语
  setTimeout(() => speak(msg), 500);
}

// ===== 触摸滑动（故事页翻页） =====
let touchStartX = 0;
let touchStartY = 0;

function bindTouchEvents() {
  const stage = $('story-stage');
  if (!stage) return;
  stage.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, {passive: true});
  stage.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (dx < 0) nextPage();
      else prevPage();
    }
  });
}
// 确保 DOM 就绪后绑定触摸
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindTouchEvents);
} else {
  bindTouchEvents();
}

// ===== Service Worker 注册 =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// ===== 初始化 =====
function init() {
  renderHome();
  showPage('home');
  checkTtsCompatibility();
}

function checkTtsCompatibility() {
  const hint = $('tts-hint');
  if (!hint) return;

  // 检测浏览器
  const ua = navigator.userAgent;
  const isChrome = /Chrome/i.test(ua) && !/Edge|OPR|OPPO|UCBrowser|QQ/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  // 给 TTS 检测一个短暂延迟，等 voices 加载
  setTimeout(() => {
    let reason = '';
    if (!synth) {
      reason = '你的浏览器不支持语音朗读，试试用 <b>Chrome 浏览器</b> 打开吧～';
    } else if (!_ttsAvailable) {
      if (isAndroid && !isChrome) {
        reason = '此浏览器可能不支持语音朗读，推荐用 <b>Chrome 浏览器</b> 打开～ 📱';
      } else if (!isChrome) {
        reason = '当前浏览器语音兼容性有限，推荐用 <b>Chrome</b> 或 <b>Edge</b> 打开～';
      } else {
        reason = '未检测到中文语音，请检查系统 TTS 设置～';
      }
    }
    if (reason) {
      hint.innerHTML = `<span>🔇 ${reason}</span>
        <button onclick="this.parentElement.remove()" style="margin-left:10px;background:none;border:none;font-size:18px;cursor:pointer;color:#E65100;">✕</button>`;
      hint.classList.remove('hidden');
    }
  }, 2000);
}
// 确保即使 DOMContentLoaded 已触发也能正常初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
