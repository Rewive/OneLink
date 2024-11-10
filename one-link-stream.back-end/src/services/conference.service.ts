import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class ConferenceService {
  private conferences: {
    [conferenceCode: string]: {
      users: { [socketId: string]: string };
      messages: { userName: string; message: string; timestamp: number }[];
    };
  } = {};

  handleUserDisconnect(socketId: string, server: Server) {
    for (const room in this.conferences) {
      if (this.conferences[room].users[socketId]) {
        delete this.conferences[room].users[socketId];
        server.to(room).emit('userDisconnected', socketId);
        server.to(room).emit('usersUpdate', Object.keys(this.conferences[room].users));
        server.to(room).emit('participantsCount', Object.keys(this.conferences[room].users).length);
        break;
      }
    }
  }

  joinConference(socket: Socket, data: { conferenceCode: string; userName: string }, server: Server) {
    const { conferenceCode, userName } = data;

    if (!this.conferences[conferenceCode]) {
      this.conferences[conferenceCode] = {
        users: {},
        messages: [],
      };
    }

    this.conferences[conferenceCode].users[socket.id] = userName;

    socket.join(conferenceCode);
    server.to(conferenceCode).emit('userJoined', { userId: socket.id, userName });

    socket.emit('usersUpdate', Object.keys(this.conferences[conferenceCode].users));
    const messageHistory = this.conferences[conferenceCode].messages;
    socket.emit('messageHistory', messageHistory);
    server.to(conferenceCode).emit('participantsCount', Object.keys(this.conferences[conferenceCode].users).length);
  }

  handleOffer(socket: Socket, data: { room: string; offer: string }) {
    const { room, offer } = data;
    socket.to(room).emit('offer', { id: socket.id, offer });
  }

  handleAnswer(socket: Socket, data: { room: string; answer: string }) {
    const { room, answer } = data;
    socket.to(room).emit('answer', { id: socket.id, answer });
  }

  handleMicToggle(socket: Socket, data: { conferenceCode: string; isMuted: boolean }, server: Server) {
    const { conferenceCode, isMuted } = data;
    server.to(conferenceCode).emit('micStatusChanged', { userId: socket.id, isMuted });
  }

  handleVideoToggle(socket: Socket, data: { conferenceCode: string; isMuted: boolean }, server: Server) {
    const { conferenceCode, isMuted } = data;
    server.to(conferenceCode).emit('videoStatusChanged', { userId: socket.id, isMuted });
  }

  handleSendMessage(socket: Socket, data: { conferenceCode: string; message: string }, server: Server) {
    const { conferenceCode, message } = data;
    const timestamp = Date.now();
    const userName = this.conferences[conferenceCode].users[socket.id];
    const userId = socket.id;

    // Сохраняем сообщение в истории
    this.conferences[conferenceCode].messages.push({ userName, message, timestamp });

    server.to(conferenceCode).emit('receiveMessage', {
      userId,
      userName,
      message,
      timestamp,
    });
  }

  handleCandidate(socket: Socket, data: { room: string; candidate: string }) {
    const { room, candidate } = data;
    socket.to(room).emit('candidate', { id: socket.id, candidate });
  }
}
