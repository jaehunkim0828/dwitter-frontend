import socket from "socket.io-client";

export default class Socket {
    constructor(baseURL) {
        this.io = socket(baseURL)

        this.io.on('connect_error', err => {
            console.log('socket error1', err.message);
        })

    }

    onSync(event, callback) {
        if (!this.io.connected) {
            this.io.connect();
        }
        
        this.io.on(event, info => callback(info))
        return () => {
            this.io.off(event);
        }
    }
}








/* 
const socketIO = socket(baseURL);
socketIO.on('connect_error', (err) => {
    console.log('socket err', err);
})

socketIO.on('dwitter', (msg) => {
    console.log(msg);
})
*/