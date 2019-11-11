import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserModel} from '../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnInit {
  user: UserModel;
  selectedImage: any = null;
  editForm: FormGroup;
  imageUrl: string;

  constructor(private auth: AuthService) {
    this.resetForm();
  }

  ngOnInit() {
    this.auth.getCurrentUserDetails().subscribe(result => {
      this.user = result;
    });
    this.editForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      rollNumber: new FormControl(this.user.rollNumber, Validators.required),
      year: new FormControl(this.user.year, Validators.required),
      email: new FormControl(this.user.email),
      mobile: new FormControl(this.user.mobile, Validators.required),
      department: new FormControl(this.user.department, Validators.required),
      role: new FormControl(this.user.role, Validators.required),
      imgSrc: new FormControl(this.user.imageSrc),
    });
  }
  editUser() {
    if (this.editForm.valid) {
      this.auth.updateUser(this.editForm.value);
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
}
