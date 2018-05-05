
import * as socketio from 'socket.io';
import { Server } from 'http';
import { User } from './User';
import { Message } from './Message';
import * as _ from 'lodash';

export class WebSocket {

    private server: Server;
    private messages: Message[];
    private users: User[];

    constructor(server: Server) {
        this.server = server;
        this.messages = [];
        this.users = [];
    }

    createWSServer() {

        const io = socketio(this.server);

        io.on('connection', (socket) => {
            socket.emit('user list', _.map(this.users, 'name'));
            socket.emit('chat history', this.messages);

            socket.on('user join', (name: string) => {
                this.users.push(new User(socket.id, name));
                io.emit('user join', name);
            });

            socket.on('disconnect', () => {
                io.emit('user left', _.find(this.users, (user) =>
                    user.id === socket.id));
                this.users = _.filter(this.users, (user) => user.id !== socket.id);
            });

            socket.on('chat message', (message) => {
                const authorUser = _.find(this.users, (user) =>
                    user.id === socket.id);
                let author;
                if (authorUser) {
                    message.author = authorUser.name;
                }
                io.emit('chat message', message);
                this.messages.push(new Message(message.type, message.text, message.author));
            });

        });

    }


}

