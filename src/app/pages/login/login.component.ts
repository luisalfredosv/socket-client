import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name: string = '';

  constructor(
    public wsServ: WebsocketService,
    private router: Router
    ) {}

  login() {
    this.wsServ.loginWs(this.name).then(() => {
      this.router.navigateByUrl('/messages')
    });
  }
}
