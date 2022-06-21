import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway({namespace : "log"})
export class ChatsGateway implements OnGatewayConnection , OnGatewayDisconnect{

  private logger = new Logger('chat');
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.address}`)
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.address}`)
  }

  @SubscribeMessage('new_user')
  handleMessage(@MessageBody() body , @ConnectedSocket() socket: Socket) {
    const username = body.username;
    console.log(username);
    socket.emit("hello_user" , "hello " + username);
  }
}
