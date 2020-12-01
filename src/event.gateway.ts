import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';

@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log('websocket - Init');

  }

  handleConnection(client: any, ...args: any[]) {
    console.log('websocket - Connect');

  }

  handleDisconnect(client: any) {
    console.log('websocket - Disconnect');

  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): WsResponse<string> {
    console.log(payload);

    client.emit('msgToClient', 'test message from server');
    return { event: 'msgToClient', data: 'done' };
  }
}
