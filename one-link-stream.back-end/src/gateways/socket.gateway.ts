import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ConferenceService } from '../services/conference.service';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('WebSocket')
  @WebSocketGateway({
    cors: {
      origin: '*', // любой источник
      methods: ['GET', 'POST'],
    },
  })
  export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    constructor(private conferenceService: ConferenceService) {}
  
    handleConnection(socket: Socket) {
      console.log('Новое подключение:', socket.id);
    }
  
    handleDisconnect(socket: Socket) {
      console.log('Пользователь отключился:', socket.id);
      this.conferenceService.handleUserDisconnect(socket.id, this.server);
    }
  
    @SubscribeMessage('joinConference')
    @ApiOperation({ summary: 'Join a conference' })
    @ApiResponse({ status: 200, description: 'User successfully joined the conference.' })
    @ApiResponse({ status: 400, description: 'Invalid conference code or user name.' })
    handleJoinConference(socket: Socket, data: { conferenceCode: string; userName: string }) {
      return this.conferenceService.joinConference(socket, data, this.server);
    }
  
    @SubscribeMessage('offer')
    @ApiOperation({ summary: 'Send an offer' })
    @ApiResponse({ status: 200, description: 'Offer sent to the room.' })
    handleOffer(socket: Socket, data: { room: string; offer: string }) {
      this.conferenceService.handleOffer(socket, data);
    }
  
    @SubscribeMessage('answer')
    @ApiOperation({ summary: 'Send an answer' })
    @ApiResponse({ status: 200, description: 'Answer sent to the room.' })
    handleAnswer(socket: Socket, data: { room: string; answer: string }) {
      this.conferenceService.handleAnswer(socket, data);
    }
  
    @SubscribeMessage('micToggle')
    @ApiOperation({ summary: 'Toggle microphone' })
    @ApiResponse({ status: 200, description: 'Microphone status changed.' })
    handleMicToggle(socket: Socket, data: { conferenceCode: string; isMuted: boolean }) {
      this.conferenceService.handleMicToggle(socket, data, this.server);
    }
  
    @SubscribeMessage('videoToggle')
    @ApiOperation({ summary: 'Toggle video' })
    @ApiResponse({ status: 200, description: 'Video status changed.' })
    handleVideoToggle(socket: Socket, data: { conferenceCode: string; isMuted: boolean }) {
      this.conferenceService.handleVideoToggle(socket, data, this.server);
    }
  
    @SubscribeMessage('sendMessage')
    @ApiOperation({ summary: 'Send a message' })
    @ApiResponse({ status: 200, description: 'Message sent to the conference.' })
    handleSendMessage(socket: Socket, data: { conferenceCode: string; message: string }) {
      this.conferenceService.handleSendMessage(socket, data, this.server);
    }
  
    @SubscribeMessage('candidate')
    @ApiOperation({ summary: 'Send a candidate' })
    @ApiResponse({ status: 200, description: 'Candidate sent to the room.' })
    handleCandidate(socket: Socket, data: { room: string; candidate: string }) {
      this.conferenceService.handleCandidate(socket, data);
    }
  }
  