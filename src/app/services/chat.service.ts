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
      from: 'Luis',
      body: message,
    };

    this.wsService.emit('MESSAGE', payload);
  }

  getMessages(): Observable<unknown> {
    return this.wsService.listen('NEW_MESSAGE');
  }
}
