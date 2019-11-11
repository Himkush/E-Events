import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  resetForm: FormGroup;
  showModal = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
    this.resetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }
  showResetPasswordModal() {
    this.showModal = !this.showModal;
  }
  login() {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
  }
  resetPassword() {
    if (this.resetForm.valid) {
      this.auth.resetPassword(this.resetForm.value.email);
    } else {
      alert('enter valid email id');
    }
  }

}
