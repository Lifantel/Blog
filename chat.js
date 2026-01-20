// chat.js

// Firebase kütüphanelerini CDN üzerinden çekiyoruz
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  push, 
  onChildAdded, 
  query, 
  limitToLast, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- SENİN MEVCUT CONFIG AYARLARIN BURADA KALSIN ---
const firebaseConfig = {
  apiKey: "AIzaSyBnBF0q_61MYjQZGRRGhXWzXO51o5c3NFs",
  authDomain: "blogsitem-1d304.firebaseapp.com",
  databaseURL: "https://blogsitem-1d304-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blogsitem-1d304",
  storageBucket: "blogsitem-1d304.firebasestorage.app",
  messagingSenderId: "967539925830",
  appId: "1:967539925830:web:b7318a715fc3085d643b47",
  measurementId: "G-2QL6VBEC2D"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elementleri
const msgListEl = document.getElementById('messages-list');
const usernameEl = document.getElementById('chat-username');
const textEl = document.getElementById('chat-text');
const sendBtn = document.getElementById('chat-btn');
const spamWarning = document.getElementById('spam-warning');

const DB_PATH = "messages";
const COOLDOWN_TIME = 5000; 

// --- SPAM KORUMASI ---
function checkSpam() {
  const lastSent = localStorage.getItem('lastSentMessageTime');
  if (!lastSent) return true;
  const diff = Date.now() - parseInt(lastSent, 10);
  return diff >= COOLDOWN_TIME;
}

function updateCooldownUI() {
  const lastSent = localStorage.getItem('lastSentMessageTime');
  if (!lastSent) return;
  const diff = Date.now() - parseInt(lastSent, 10);
  
  if (diff < COOLDOWN_TIME) {
    sendBtn.disabled = true;
    sendBtn.classList.add('disabled-btn'); // CSS ile stil vereceğiz
    if(spamWarning) spamWarning.style.display = "block";
    
    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.classList.remove('disabled-btn');
      if(spamWarning) spamWarning.style.display = "none";
    }, COOLDOWN_TIME - diff);
  }
}

// --- HTML OLUŞTURMA ---
function renderMessage(data) {
  const div = document.createElement('div');
  div.className = 'msg-card'; // CSS dosyasındaki .blog-card stiline benzeteceğiz
  
  let dateStr = "Az önce";
  if (data.timestamp) {
    dateStr = new Date(data.timestamp).toLocaleString('tr-TR');
  }

  const safeName = escapeHtml(data.user);
  const safeText = escapeHtml(data.text);

  div.innerHTML = `
    <div class="msg-header">
      <span class="msg-author">@${safeName}</span>
      <span class="msg-time">${dateStr}</span>
    </div>
    <p class="msg-text">${safeText}</p>
  `;
  
  // *** KRİTİK DEĞİŞİKLİK BURADA: ***
  // appendChild yerine prepend kullanıyoruz.
  // Böylece her gelen mesaj listenin EN BAŞINA ekleniyor.
  msgListEl.prepend(div); 
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// --- MESAJLARI DİNLEME ---
function listenMessages() {
  msgListEl.innerHTML = ""; 
  // limitToLast(50) son 50 mesajı getirir (eskiden yeniye doğru)
  // Biz renderMessage içinde 'prepend' kullandığımız için 
  // döngü bittiğinde en yeni mesaj en üstte kalacak.
  const commentsRef = query(ref(db, DB_PATH), limitToLast(50));
  
  onChildAdded(commentsRef, (snapshot) => {
    renderMessage(snapshot.val());
  });
}

// --- MESAJ GÖNDERME ---
function sendMessage() {
  const user = usernameEl.value.trim();
  const text = textEl.value.trim();

  if (!user || !text) {
    alert("Lütfen isim ve mesaj alanını doldurun.");
    return;
  }

  if (!checkSpam()) {
    updateCooldownUI();
    return;
  }

  const originalBtnText = sendBtn.innerText;
  sendBtn.innerText = "Yollanıyor...";
  sendBtn.disabled = true;

  const newMessageRef = push(ref(db, DB_PATH));
  const messageData = {
    user: user,
    text: text,
    timestamp: serverTimestamp()
  };

  import("https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js").then(module => {
     module.set(newMessageRef, messageData)
      .then(() => {
        textEl.value = ""; 
        localStorage.setItem('lastSentMessageTime', Date.now());
        updateCooldownUI();
      })
      .catch((err) => alert("Hata: " + err.message))
      .finally(() => {
        sendBtn.innerText = originalBtnText;
        if (checkSpam()) sendBtn.disabled = false;
      });
  });
}

// Olay Dinleyicileri
if(sendBtn) sendBtn.addEventListener('click', sendMessage);
if(textEl) {
  textEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  listenMessages();
  updateCooldownUI();
  const savedName = localStorage.getItem('chatUsername');
  if (savedName && usernameEl) usernameEl.value = savedName;
  if(usernameEl) usernameEl.addEventListener('change', () => localStorage.setItem('chatUsername', usernameEl.value));
});