import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  query,
  limitToLast,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnBF0q_61MYjQZGRRGhXWzXO51o5c3NFs",
  authDomain: "blogsitem-1d304.firebaseapp.com",
  databaseURL: "https://blogsitem-1d304-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blogsitem-1d304",
  storageBucket: "blogsitem-1d304.firebasestorage.app",
  messagingSenderId: "967539925830",
  appId: "1:967539925830:web:b7318a715fc3085d643b47"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const msgListEl = document.getElementById('messages-list');
const usernameEl = document.getElementById('chat-username');
const textEl = document.getElementById('chat-text');
const sendBtn = document.getElementById('chat-btn');
const spamWarning = document.getElementById('spam-warning');

// --- YENİ EKLENEN: Sayaç Elementi ---
// HTML'de bu ID ile bir element yoksa kod hata vermesin diye kontrol ediyoruz
const charCounterEl = document.getElementById('char-counter'); 

const DB_PATH = "messages";
const COOLDOWN_TIME = 5000;
const MAX_MSG_LENGTH = 250; // --- YENİ EKLENEN: Karakter Sınırı ---

// --- İMZA ---
function getMySignature() {
  let sig = localStorage.getItem('userSignature');
  if (!sig) {
    sig = '#' + Math.floor(Math.random() * 65535)
      .toString(16).toUpperCase().padStart(4, '0');
    localStorage.setItem('userSignature', sig);
  }
  return sig;
}

// --- SPAM ---
function checkSpam() {
  const last = localStorage.getItem('lastSentMessageTime');
  if (!last) return true;
  return Date.now() - parseInt(last, 10) >= COOLDOWN_TIME;
}

function updateCooldownUI() {
  const last = localStorage.getItem('lastSentMessageTime');
  if (!last) return;

  const diff = Date.now() - parseInt(last, 10);
  if (diff < COOLDOWN_TIME) {
    sendBtn.disabled = true;
    spamWarning.style.display = "block";
    setTimeout(() => {
      sendBtn.disabled = false;
      spamWarning.style.display = "none";
    }, COOLDOWN_TIME - diff);
  }
}

// --- RENDER ---
function renderMessage(data, key) {
  if (document.getElementById(`msg-${key}`)) return;

  const div = document.createElement('div');
  div.className = 'msg-card';
  div.id = `msg-${key}`;

  const dateStr = data.timestamp
    ? new Date(data.timestamp).toLocaleString('tr-TR')
    : "Az önce";

  div.innerHTML = `
    <div class="msg-header">
      <div>
        <span class="msg-author">@${escapeHtml(data.user)}</span>
        <span class="msg-signature">${escapeHtml(data.signature)}</span>
      </div>
      <span class="msg-time">${dateStr}</span>
    </div>
    <p class="msg-text">${escapeHtml(data.text)}</p>
  `;

  msgListEl.prepend(div);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// --- DİNLE ---
function listenMessages() {
  msgListEl.innerHTML = "";
  const q = query(ref(db, DB_PATH), limitToLast(50));
  onChildAdded(q, snap => renderMessage(snap.val(), snap.key));
}

// --- GÖNDER ---
function sendMessage() {
  const user = usernameEl.value.trim();
  const text = textEl.value.trim();

  if (!user || !text) {
    alert("İsim ve mesaj boş olamaz.");
    return;
  }

  // --- YENİ EKLENEN: Karakter Sınırı Kontrolü ---
  if (text.length > MAX_MSG_LENGTH) {
    alert(`Mesajınız çok uzun! Lütfen en fazla ${MAX_MSG_LENGTH} karakter kullanın.`);
    return;
  }

  if (!checkSpam()) {
    updateCooldownUI();
    return;
  }

  const msgRef = push(ref(db, DB_PATH));
  set(msgRef, {
    user,
    text,
    signature: getMySignature(),
    timestamp: serverTimestamp()
  }).then(() => {
    textEl.value = "";
    updateCharCounter(); // Gönderdikten sonra sayacı sıfırla
    localStorage.setItem('lastSentMessageTime', Date.now());
    updateCooldownUI();
  });
}

// --- YENİ EKLENEN: Karakter Sayacı Fonksiyonu ---
function updateCharCounter() {
  const currentLen = textEl.value.length;
  
  // Eğer sınır aşılmışsa metni kırp (Opsiyonel: Kırpmak istemezsen burayı sil)
  if (currentLen > MAX_MSG_LENGTH) {
    textEl.value = textEl.value.substring(0, MAX_MSG_LENGTH);
  }
  
  // UI Güncelleme
  if (charCounterEl) {
    charCounterEl.textContent = `${textEl.value.length} / ${MAX_MSG_LENGTH}`;
    
    // Sınıra yaklaştıysa rengi değiştir (Görsel İpucu)
    if (textEl.value.length >= MAX_MSG_LENGTH) {
        charCounterEl.style.color = "red";
    } else {
        charCounterEl.style.color = "#888";
    }
  }
}

sendBtn.addEventListener('click', sendMessage);
textEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// --- YENİ EKLENEN: Yazarken Sayacı Güncelle ---
textEl.addEventListener('input', updateCharCounter);

document.addEventListener('DOMContentLoaded', () => {
  listenMessages();
  updateCooldownUI();
  updateCharCounter(); // Başlangıçta sayacı ayarla

  const saved = localStorage.getItem('chatUsername');
  if (saved) usernameEl.value = saved;

  usernameEl.addEventListener('change', () =>
    localStorage.setItem('chatUsername', usernameEl.value)
  );
});