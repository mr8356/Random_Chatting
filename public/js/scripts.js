const socket = io('/log');

const hello_stranger = $("#hello_stranger");
const chatting_box = $("#chatting_box");
const form = $("#chat_form");

// global socket handler
//* global socket handler
socket.on('user_connected', (username) => {
    drawNewChat(`${username} connected!`);
});

socket.on('new_chat', (data) => {
    const { chat, username } = data;
    drawNewChat(`${username}: ${chat}`);
});
socket.on('disconnect_user', (username) => drawNewChat(`${username}: bye...`));

//* event callback functions
const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements[0].value;
    if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 화면에다가 그리기
    drawNewChat(`me : ${inputValue}`, true);
    event.target.elements[0].value = '';
    }
};

const drawHelloStranger = (username) =>
    (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);
const drawNewChat = (message, isMe = false) => {
    const wrapperChatBox = document.createElement('div');
    wrapperChatBox.className = 'clearfix';
    let chatBox;
    if (!isMe)
        chatBox = `
        <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
        ${message}
        </div>
        `;
    else
        chatBox = `
        <div class='bg-white w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>
        ${message}
        </div>
        `;
    wrapperChatBox.innerHTML = chatBox;
    chattingBoxElement.append(wrapperChatBox);
};


function helloUser() {
    const username = prompt('What is your name?');
    socket.emit('new_user' , {
        "username" : username
    })
    socket.on('hello_user' , (data)=>{
        console.log(data);
    })
    drawhelloStranger(username);
}

function init() {
    helloUser();
}

init();