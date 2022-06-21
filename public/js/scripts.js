const socket = io('/log');

const hello_stranger = $("#hello_stranger");
const chatting_box = $("#chatting_box");
const form = $("#chat_form");

function helloUser() {
    const username = prompt('What is your name?');
    socket.emit('new_user' , {
        "username" : username
    })
    socket.on('hello_user' , (data)=>{
        console.log(data);
    })
}

function init() {
    helloUser();
}

init();