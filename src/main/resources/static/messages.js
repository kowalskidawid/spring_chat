var client = null;
var name = '';

function connect() {
    client = Stomp.client("ws://localhost:8080/chat");
    client.connect({}, (response) => {
        client.subscribe("/topic/messages", message => {
            showMessage(message.body);
        })
    }, error => {
        console.error(error);
    })
}

function showMessage(message) {
    message = JSON.parse(message);

    // Create new message
    let newMessage = document.createElement('div');
    if(name !== message.name) {
        // start notifier
        document.querySelector("audio").play();

        newMessage.classList.add("foreignDiv");

        // insert data
        newMessage.innerHTML = `<p class="name">${message.name}</p><p class = "message">${message.value}</p>`;
    }
    else {
        // insert data
        newMessage.innerHTML = `<p class="name">${message.name}</p><p class="yourMessage">${message.value}</p>`;
    }

    updateScroll();

    // display new message
    document.querySelector("#chat").appendChild(newMessage);
}

function sendMessage() {
    let message = document.querySelector("#message").value;
    document.querySelector("#message").value = '';
    client.send("/app/chat", {}, JSON.stringify({'value': message, 'name': name}) );
}

document.querySelector('#message').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function setName() {
    name = document.querySelector("#name").value;
    if (name.length !== 0) {
        document.querySelector(".nameForm").remove();
        saveNameToCookie(name);
    }
}

function saveNameToCookie(name) {
    document.cookie = `username=${name};`;
}
(function getNameFormCookie() {
    let cookieString = document.cookie;
    let cookies = cookieString.split(';');
    cookies.forEach((element) => {
       let cookieElem = element.split("=");
       cookieElem[0] = cookieElem[0].trim();
       if( cookieElem[0] === "username") {
            name = cookieElem[1];
            document.querySelector(".nameForm").remove();
       }
    });
})();

function updateScroll(){
    let element = document.querySelector("#chat");
    element.scrollTop = element.scrollHeight;
}