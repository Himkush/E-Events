import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {CoordinatorModel} from '../models/coordinator.model';

@Injectable()
export class RegisterService {
  usersCollection: AngularFirestoreCollection<CoordinatorModel>;
  users: Observable<CoordinatorModel[]>;
  constructor(public afs: AngularFirestore) {
    this.users = this.afs.collection('users').valueChanges();
  }
  getItems() {
    return this.users;
  }
}
