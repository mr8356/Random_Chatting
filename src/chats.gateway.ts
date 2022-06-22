import { Logger } from '@nestjs/common';
import {  ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io' /// 중요!!!!!!!!!!!!!!!!!!!!!!!!!!

@WebSocketGateway({namespace : "chattings"})
export class ChatsGateway implements OnGatewayConnection , OnGatewayDisconnect{

  private logger = new Logger('chat');
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id}`)
  }
  
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id}`)
  }

  @SubscribeMessage('new_user')
  handleMessage(@MessageBody() username:string , @ConnectedSocket() socket: Socket) {
    socket.emit("hello_user" , "hello " + username);
    socket.broadcast.emit('user_connected' , username);
  }

  @SubscribeMessage('submit_chat')
  submitChat(@MessageBody() message : string , @ConnectedSocket() socket:Socket){
    socket.broadcast.emit("new_chat" , {
      'chat' : message,
      'username' : socket.id
    });
  }
}
