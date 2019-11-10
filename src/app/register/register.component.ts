import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = FormGroup;
  imageUrl: string;
  constructor() {
    this.resetForm();
  }

  ngOnInit() {
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => this.imageUrl = e.target.result;
    } else {
      this.imageUrl = '../../assets/img/avatar2.jpg';
    }
  }
  resetForm() {
    this.imageUrl = '../../assets/img/avatar2.jpg';
  }

}
