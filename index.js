const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res);
});

const getRandomInt = (max) => Math.floor(Math.random() * max);

const io = socket(server);

io.on('connection', (client) => {
    io.emit('user-count', { userCount: io.engine.clientsCount })

    client.data.username = "user" + getRandomInt(1000);
    client.emit('service-msg', { message: `You connected, your name ${client.data.username}` });
    client.broadcast.emit('service-msg', { message: `The new client ${client.data.username} connected` });

    client.on("disconnect", (reason) => {
        client.broadcast.emit('service-msg', { message: `The client ${client.data.username} diconnected` });
        io.emit('user-count', { userCount: io.engine.clientsCount })
    });



    client.on('client-msg', data => {
        console.log(data);

        const payload = {
            message: data.message.split('').reverse().join(''),
            user: client.data.username,
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
});

server.listen(5555);
