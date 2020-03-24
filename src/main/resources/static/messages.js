var client = null;

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
    document.querySelector("audio").play();
    document.querySelector("#chat").append(`<p>${message}</p>`);
}

function sendMessage() {
    let message = document.querySelector("#message").value;
    client.send("/app/chat", {}, JSON.stringify({'value': message}) );
}

document.querySelector('#message').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});