import { Logger } from '@nestjs/common';
import {  ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io' /// 중요!!!!!!!!!!!!!!!!!!!!!!!!!!

@WebSocketGateway({namespace : "log"})
export class ChatsGateway implements OnGatewayConnection , OnGatewayDisconnect{

  private logger = new Logger('chat');
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id}`)
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id}`)
  }

  @SubscribeMessage('new_user')
  handleMessage(@MessageBody() body , @ConnectedSocket() socket: Socket) {
    const username = body.username;
    console.log(username);
    socket.emit("hello_user" , "hello " + username);
    socket.broadcast.emit('user_connected' , username);
  }
}
