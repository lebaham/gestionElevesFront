import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../guards/intercepteurJwt/jwtInterceptor';
import { ErrorInterceptor } from '../guards/intercepteur/ErrorInterceptor';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [LoginComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
// tslint:disable-next-line:eofline
export class LoginModule {}