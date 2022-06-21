import { Module } from '@nestjs/common';
import { ChatsGateway } from 'src/chats.gateway';

@Module({
    providers: [ChatsGateway]
})
export class ChatsModule {}
