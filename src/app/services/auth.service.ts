import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {UserModel} from '../models/user.model';
import {BehaviorSubject} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable()
export class AuthService {

  // private eventAuthError = new BehaviorSubject<string>('');
  // eventAuthError$ = this.eventAuthError.asObservable();
  newUser: UserModel;
  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router) { }

  createUser(user: UserModel) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
        });
        this.insertUSerData(userCredential)
          .then(() => {
            alert('Registration Successful!!!');
            this.router.navigate(['/event-form']);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
  insertUSerData(userCredential: firebase.auth.UserCredential) {
    if (this.newUser.imageSrc === undefined) {
      this.newUser.imageSrc = 'gs://e-events-3964d.appspot.com/userImages/aavatar2.png';
    }
    const today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return this.db.doc( `Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: this.newUser.role,
      mobile: this.newUser.mobile,
      year: this.newUser.year,
      department: this.newUser.department,
      imageSrc: this.newUser.imageSrc,
      signupDate: dateTime
    });
  }
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('Login Successful!!!');
        this.router.navigate(['event-form']);
      })
    .catch( (error) => {
      alert(error);
    });
  }
  getUserState() {
    return this.afAuth.authState;
  }
  getCurrentUserDetails() {

  }
  logout() {
    return this.afAuth.auth.signOut();
  }
  resetPassword(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then( () => {
        alert('Reset Password Email Sent!!');
      })
      .catch( error => alert(error));
  }
}

