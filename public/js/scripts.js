const socket = io('/log');

const hello_stranger = $("#hello_stranger");
const chatting_box = $("#chatting_box");
const form = $("#chat_form");

// global socket handler
socket.on('user_connected' , (username)=>{
    console.log(`user ${username} connected!`);
})

function drawhelloStranger(username){
    hello_stranger.text(`Hello ${username} Stranger`);
}

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