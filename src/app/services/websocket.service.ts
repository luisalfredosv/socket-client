import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Socket } from 'ngx-socket-io';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus: boolean = false;
  public user: User = {
    name: '',
  };
  constructor(
    private socket: Socket,
    private router: Router
    ) {
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al socket');
      this.socketStatus = true;
      this.loadStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del socket');
      this.socketStatus = false;
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  loginWs(name: string) {
    return new Promise<void>((resolve, reject) => {
      this.emit('CONFIG_USER', { name }, (resp: any) => {
        this.user = new User(name);
        this.saveStorage();
        resolve();
      });
    });
  }

  saveStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') ?? '{}');
      this.loginWs(this.user?.name);
    }
  }

  logoutWs() {
    this.user = {
      name: '',
    };
    localStorage.removeItem('user');

    const payload = {
      name: 'not-name',

    }

    this.emit('CONFIG_USER', payload, () => {});
    this.router.navigateByUrl('');
  }

  getUser() {
    return this.user.name != '' ? this.user : null;
  }
}
