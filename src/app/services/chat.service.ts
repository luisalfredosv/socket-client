import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public wsService: WebsocketService) {}

  sendMessage(message: string) {
    const payload = {
      from: this.wsService.getUser()?.name,
      body: message,
    };

    this.wsService.emit('MESSAGE', payload);
  }

  getMessages(): Observable<unknown> {
    return this.wsService.listen('NEW_MESSAGE');
  }

  getDirectMessages() {
    return this.wsService.listen('DIRECT_MESSAGES');
  }
}
