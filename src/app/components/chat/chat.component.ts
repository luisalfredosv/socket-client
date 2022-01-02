import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  text: string = '';
  messagesSubscription: Subscription = new Subscription();
  messages: any[] = [];
  // el: HTMLElement = new HTMLElement();

  constructor(public chatServ: ChatService) {}

  ngOnInit(): void {
    const el = document.getElementById('chatMessages');

    this.messagesSubscription = this.chatServ.getMessages().subscribe((msg) => {
      console.log(msg);
      this.messages.push(msg);
      setTimeout(() => {
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      }, 50);
    });
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
  }

  send() {

    if(this.text.trim().length === 0 ) return
    this.chatServ.sendMessage(this.text);
    this.text = '';
  }
}
