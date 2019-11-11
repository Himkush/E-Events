import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable()
export class RegisterService {
  usersCollection: AngularFirestoreCollection<UserModel>;
  users: Observable<UserModel[]>;
  constructor(public afs: AngularFirestore,
              private storage: AngularFireStorage) {
    // this.users = this.afs.collection('users').valueChanges();
    this.usersCollection = this.afs.collection('users');
    // this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data();
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // }));
  }
  uploadUserImage(filePath: string, image: any) {
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, image)
      .then(result => {
        fileRef.getDownloadURL().subscribe(url => {
        });
      })
      .catch(error => {
        alert('Error occured while uploading Image');
      });
  }
}
