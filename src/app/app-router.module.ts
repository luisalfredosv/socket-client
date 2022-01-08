import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { UserGuard } from './guards/user-guard.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [UserGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
