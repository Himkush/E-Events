import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {UserModel} from '../models/user.model';
import {BehaviorSubject} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  // private eventAuthError = new BehaviorSubject<string>('');
  // eventAuthError$ = this.eventAuthError.asObservable();
  currentUser: AngularFirestoreDocument<UserModel>;
  newUser: UserModel;
  token: string;
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
    if (this.newUser.imageSrc === null || this.newUser.imageSrc === '') {
      this.newUser.imageSrc = 'https://firebasestorage.googleapis.com/v0/b/e-events-3964d.appspot.com' +
        '/o/userImages%2Faavatar2.png?alt=media&token=9eafa8c5-2232-4f80-8eb2-b210cf747ff0';
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
        this.afAuth.auth.currentUser.getIdToken()
          .then((token: string) => {
            this.token = token;
            this.router.navigate(['event-form']);
          })
          .catch((error) => console.log(error));
      })
      .catch( (error) => {
        alert(error);
      });
  }
  getUserState() {
    return this.afAuth.authState;
  }
  isToken() {
    return this.token != null;
  }
  getCurrentUserUid() {
    return this.afAuth.auth.currentUser.uid;
  }
  getCurrentUserDetails() {
    const uid = this.getCurrentUserUid();
    this.currentUser = this.db.doc<UserModel>(`Users/${uid}`);
    console.log(uid);
    console.log(this.currentUser);
    return this.currentUser.valueChanges();
  }
  updateUser(userDetails: UserModel) {
    const uid = this.getCurrentUserUid();
    this.currentUser = this.db.doc<UserModel>(`Users/${uid}`);
    this.currentUser.update(userDetails)
      .then( () => alert('Edit Successful'))
      .catch((err) => alert(err));
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

