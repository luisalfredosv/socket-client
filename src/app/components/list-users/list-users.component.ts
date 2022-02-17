import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { ChatService } from 'src/app/services/chat.service'

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  usersActivesObs$: Observable<any> = new Observable();

  constructor(public chatServ: ChatService) { }

  ngOnInit(): void {
    this.usersActivesObs$ = this.chatServ.getUsersActives();

    this.chatServ.emitUsersActive();
  }

}
