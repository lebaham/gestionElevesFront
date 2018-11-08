import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';


const appRoutes:  Routes =  [
{ path: '',  redirectTo: '/login', pathMatch:  'full'},
{ path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  exports:  [
    RouterModule
  ]
})
export class AppRoutingModule { }
