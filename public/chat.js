const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const agent = urlSearch.get("select_agent");

socket.emit("select_agent", {
    username,
    agent
})

document.getElementById("message_input").addEventListener("keypress",(event) =>{
if(event.key === 'Enter'){
    const message = event.target.value

    const data = {
        agent,
        message,
        username 
    }

    socket.emit("message", data);
    event.target.value = ""
}})

socket.on("message", (data) => { 
    const messageDiv = document.getElementById("messages");

    if(messageDiv)
    messageDiv.innerHTML += `                   
    <div class="new_messages">
        <label class="form-label">
            <strong>${data.username}</strong> <span>${data.text} - ${data.createdAt}</span>
        </label>
    </div>`
})

