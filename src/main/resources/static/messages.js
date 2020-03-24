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
    if(name != message.name) {
        // start notifier
        document.querySelector("audio").play();
    }

    // Create new message
    let newMessage = document.createElement('div');
    newMessage.innerHTML = `<p>${message.name}</p><p>${message.value}</p>`;

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

    if (name.length != 0) {
        document.querySelector(".nameForm").remove();
    }
}