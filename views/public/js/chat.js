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
    messages.appendChild(createMessageElement(msg));
    // scrollTo(0, document.body.scrollHeight); //Will add this back when functionality permits
});

// Refactored code for creating message elements
function createMessageElement(msg) {
    const elements = {
        itemBodyText: createElementWithClasses('p', ['card-text', 'text-start']),
        itemBodyTitle: createElementWithClasses('h6', ['card-title']),
        itemTitleRow: createElementWithClasses('div', ['row']),
        itemTitleRowName: createElementWithClasses('div', ['col-6', 'text-start']),
        itemTitleRowTime: createElementWithClasses('div', ['col-6', 'text-end']),
        itemBody: createElementWithClasses('div', ['card-body', 'col-md-8']),
        itemImage: createElementWithClasses('img', ['img-fluid', 'rounded-start']),
        itemImageContainer: createElementWithClasses('div', ['col-md-4']),
        itemRow: createElementWithClasses('div', ['row', 'g-0']),
        itemCard: createElementWithClasses('div', ['card', 'mb-3']),
        item: createElementWithClasses('li', ['list-group-item', 'list-group-item-dark'])
    };

    elements.itemBodyText.textContent = msg.message;
    elements.itemTitleRowTime.textContent = msg.stamp;
    elements.itemTitleRowName.textContent = msg.username;
    elements.itemImage.src = 'https://picsum.photos/200';
    elements.itemImage.alt = 'profile picture';

    elements.itemTitleRow.append(elements.itemTitleRowName, elements.itemTitleRowTime);
    elements.itemBodyTitle.appendChild(elements.itemTitleRow);
    elements.itemBody.append(elements.itemBodyTitle, elements.itemBodyText);
    elements.itemImageContainer.appendChild(elements.itemImage);
    elements.itemRow.append(elements.itemImageContainer, elements.itemBody);
    elements.itemCard.appendChild(elements.itemRow);
    elements.item.appendChild(elements.itemCard);

    return elements.item;
}

function createElementWithClasses(tagName, classes) {
    const element = document.createElement(tagName);
    element.classList.add(...classes);
    return element;
}
