const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const currentTime = `${day}-${month}-${year} ${hours}:${minutes}`;

let nickname;

function enterNickname() {
    nickname = document.getElementById('nickname').value;
    if (nickname) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('forum').style.display = 'block';
        loadMessages();
    } else {
        alert('Por favor, insira um nickname.');
    }
};

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (message) {
        const messageContainer = document.createElement('div');
        messageContainer.textContent = `${nickname} (${currentTime}): ${message}`;
        document.getElementById('messages').appendChild(messageContainer);
        messageInput.value = '';
        saveMessage(nickname, message);
    } else {
        alert('Por favor, escreva uma mensagem.');
    }
};

function loadMessages() {

}

function saveMessage(nickname, message) {

}