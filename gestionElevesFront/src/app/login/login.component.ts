import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private loginservice: LoginService) { }

  ngOnInit() {
    this.loginForm =this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
  }

}
