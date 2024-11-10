import { Module } from '@nestjs/common';
import { SocketGateway } from './gateways/socket.gateway';
import { ConferenceService } from './services/conference.service';

@Module({
  providers: [SocketGateway, ConferenceService],
})
export class AppModule {}
