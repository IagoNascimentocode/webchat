import { io } from"./http";

interface User{
    socket_id: string,
    username: string,
    agent: string;
}

interface Message{
    agent: string;
    text: string,
    username: string,
    createdAt: Date,
}

const users: User[] = [];

const messages: Message[] = []; 

io.on("connection", socket => {

    console.log(`new connection: ${socket.id}`)

    socket.on("select_agent", data => {
        socket.join(data.agent)
        const userInService = users.find(user => user.username === data.username && user.agent === data.agent);

        if(userInService){
            userInService.socket_id = socket.id
        }else{
            users.push({
            agent:data.agent,
            username:data.username,
            socket_id: socket.id
        })}

    })

    socket.on("message", data => {

        const message = {
            agent: data.agent,
            username: data.username,
            text: data.message,
            createdAt: new Date()
        }
        messages.push(message)
        io.to(data.agent).emit("message", message);
        console.log(message)

    })
    

})