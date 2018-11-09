import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { LoginError } from './error/login-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public showAuthenticationError = false;
  public errorMessage;
  constructor(private formBuilder: FormBuilder, private router: Router,
     private loginservice: LoginService) { }

  ngOnInit() {
    this.loginForm =  this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit()  {
    if  (this.loginForm.invalid) {
      return;
    }
    this.loginservice.login(this.f.login.value, this.f.password.value).subscribe(
      () => {
      //  this.router.navigate(['']);
      },
      error => {
         this.loginError(error);
      });
  }

  private loginError(error: LoginError): void {
    this.showAuthenticationError = true;
    switch (error) {
      case LoginError.AuthenticationError:
        this.errorMessage =   'mot de passe incorrect';
        break;
      case LoginError.ProxyError:
        this.errorMessage = 'Erreur proxy, veuillez repassez l\'authentification internet';
        break;
      case LoginError.Unknow:
      default:
        this.errorMessage = 'Une erreur inconnue est survenue';
    }
  }

}
