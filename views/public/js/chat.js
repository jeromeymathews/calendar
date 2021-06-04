const activeChat = document.getElementById('chatLink');
activeChat.classList.add('active');

const socket = io.connect();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages')

form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
})

socket.on('chat message', msg => {
    let item = document.createElement('li');
    item.classList.add('list-group-item');
    item.classList.add('list-group-item-dark');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});