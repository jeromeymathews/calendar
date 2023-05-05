const activeChat = document.getElementById('chatLink');
activeChat.classList.add('active');

const socket = io.connect();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

if (!localStorage.username) {
    location.replace('/');
}

form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value) {
        const timestamp = Date.now();
        const dateTime = new Date(timestamp);
        socket.emit('chat message', { message: input.value, username: localStorage.username, stamp: dateTime.toLocaleString() });
        input.value = '';
    }
});

socket.on('chat message', msg => {
    let itemBodyText = document.createElement('p');
    let itemBodyTitle = document.createElement('h6');
    let itemTitleRow = document.createElement('div');
    let itemTitleRowName = document.createElement('div');
    let itemTitleRowTime = document.createElement('div');
    let itemBody = document.createElement('div');
    let itemContent = document.createElement('div');
    let itemImage = document.createElement('img');
    let itemImageContainer = document.createElement('div');
    let itemRow = document.createElement('div');
    let itemCard = document.createElement('div');
    let item = document.createElement('li');
    itemBodyText.classList.add('card-text');
    itemBodyText.classList.add('text-start');
    itemBodyText.textContent = msg.message;
    itemBodyTitle.classList.add('card-title');
    itemTitleRow.classList.add('row');
    itemTitleRowName.classList.add('col-6');
    itemTitleRowName.classList.add('text-start');
    itemTitleRowTime.classList.add('col-6');
    itemTitleRowTime.classList.add('text-end');
    //itemBodyTitle.textContent = `${msg.username} | ${msg.stamp}`;
    itemTitleRowTime.textContent = msg.stamp;
    itemTitleRowName.textContent = msg.username;
    itemTitleRow.appendChild(itemTitleRowName);
    itemTitleRow.appendChild(itemTitleRowTime);
    itemBodyTitle.appendChild(itemTitleRow);
    itemBody.classList.add('card-body');
    itemBody.classList.add('col-md-8');
    itemBody.appendChild(itemBodyTitle);
    itemBody.appendChild(itemBodyText)
    itemContent.classList.add('col-md-8');
    itemContent.appendChild(itemBody);
    itemImage.src = 'https://picsum.photos/200'; //Will change to user profile picture
    itemImage.alt = 'profile picture';
    itemImage.classList.add('img-fluid');
    itemImage.classList.add('rounded-start');
    itemImageContainer.classList.add('col-md-4');
    itemImageContainer.appendChild(itemImage);
    itemRow.classList.add('row');
    itemRow.classList.add('g-0');
    itemRow.appendChild(itemImageContainer);
    itemRow.appendChild(itemBody);
    itemCard.classList.add('card');
    itemCard.classList.add('mb-3');
    itemCard.appendChild(itemRow);
    item.classList.add('list-group-item');
    item.classList.add('list-group-item-dark');
    item.appendChild(itemCard);
    messages.appendChild(item);
    // scrollTo(0, document.body.scrollHeight); //Will add this back when functionality permits
});
