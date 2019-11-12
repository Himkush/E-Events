import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../services/register.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedImage: any = null;
  editState = false;
  registerForm: FormGroup;
  imageUrl: string;
  formSubmitted = false;
  // @ViewChild('')
  constructor(private registerService: RegisterService,
              private auth: AuthService) {
    this.resetForm();
  }
  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      rollNumber: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      imageSrc: new FormControl(''),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl(null, Validators.required)
    });
  }
  some = (url) => {
    this.registerForm.get('imageSrc').setValue(url);
    this.auth.createUser(this.registerForm.value);
  }
  addUser() {
    if (this.registerForm.valid) {
      // this.registerService.addUser(this.user);
      if (this.selectedImage) {
        const filePath = `userImages/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        this.registerService.uploadUserImage(filePath, this.selectedImage, this.some.bind(this));
      } else {
        this.auth.createUser(this.registerForm.value);
      }
    } else {
      this.formSubmitted = true;
      alert('asfasf');
    }
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => this.imageUrl = e.target.result;
      this.selectedImage = event.target.files[0];
    } else {
      this.imageUrl = '../../assets/img/avatar2.png';
      this.selectedImage = null;
    }
  }
  resetForm() {
    this.imageUrl = '../../assets/img/avatar2.png';
    this.selectedImage = null;
  }
  editUser() {
    this.editState = true;
  }

}
