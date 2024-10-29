import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://openchat-db-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "mensagens")

const now = new Date()
const year = formatTime(now.getFullYear())
const month = formatTime(now.getMonth())
const day = formatTime(now.getDay())
const hours = formatTime(now.getHours())
const minutes = formatTime(now.getMinutes())
const currentTime = `${hours}:${minutes}/${day}-${month}-${year}`

const enterBtn = document.getElementById('enter-btn')
const sendBtn = document.getElementById('send-btn')
const deleteBtn = document.getElementById('delete-btn')
const alertComponent = document.getElementById('alert')
const chat = document.getElementById('messages')
const messageInput = document.getElementById('message-input')

let nickname;

function formatTime(number) {
    return number < 10 ? '0' + number : number;
}

enterBtn.addEventListener('click', function () {
    nickname = document.getElementById('nickname').value
    if (nickname) {
        document.getElementById('login').style.display = 'none'
        document.getElementById('forum').style.display = 'block'
        loadMessages()
    } else {
        alertComponent.textContent = 'Por favor, insira um nickname.'
    }
})

sendBtn.addEventListener('click', function () {
    const message = messageInput.value
    if (message) {
        saveMessage(message)
    } else {
        alert('Por favor, escreva uma mensagem.')
    }

})

deleteBtn.addEventListener('click', function () {
    if (messageInput.value === 'johnchatopen') {
        remove(referenceInDB)
        chat.innerHTML = ''
    } else {
        alert('Comando para admin!')
    }

})

function loadMessages(messageLoad) {
    let listChat = ""
    for (let i = 0; i < messageLoad.length; i++) {
        listChat += `
            <div>
                ${messageLoad[i]}
            </div>
        `
    }
    chat.innerHTML = listChat
}


function saveMessage(messageSave) {
    let messageBuild = `${nickname} - ${currentTime}: ${messageSave}`
    push(referenceInDB, messageBuild)
    messageInput.value = ''
}

onValue(referenceInDB, function (snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const messagesInDB = Object.values(snapshotValues)
        loadMessages(messagesInDB)
    }
})