const { inherits } = require("util");

const socket = io('/');

const hello_stranger = $("#hello_stranger");
const chatting_box = $("#chatting_box");
const form = $("#chat_form");

function helloUser() {
    const username = prompt('What is your name?');
}

function init() {
    helloUser();
}

init();