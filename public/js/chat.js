const socket = io.connect("http://localhost:3000")

const senderName = document.getElementById('name')
const senderMsg = document.getElementById('message')

const sendBtn = document.getElementById('send')

const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

let users = JSON.parse(localStorage.getItem('users')) || {};
function addUser(name,msg){
    if(users[name]){
        users[name].push([msg])
    }else{
        users[name] = [msg]
    }

    localStorage.setItem('users',JSON.stringify(users))

}

const storedUsers = JSON.parse(localStorage.getItem('users'))

if(storedUsers){
    for(sender in storedUsers){
        storedUsers[sender].forEach(msg => {
            output.innerHTML += `<p><strong class="text-info">${sender} : </strong>${msg}</p>`
        });
    }
}


sendBtn.addEventListener('click',()=>{
    socket.emit('chat',{
        sender: senderName.value,
        msg: senderMsg.value
    })
})

socket.on('chat',data => {
    feedback.innerHTML = ''
    output.innerHTML += `<p><strong class="text-info">${data.sender} : </strong>${data.msg}</p>`
    localStorage.setItem('message',{sender: data.sender,msg:data.msg})
    addUser(data.sender,data.msg)
    senderMsg.value = ''
})

senderMsg.addEventListener('keypress',()=>{
    socket.emit('typing',senderName.value)
})

socket.on('typing',data=>{
    feedback.innerHTML = `${data} Typing...`
})