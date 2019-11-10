import { ParticipantsList } from './../model/participants-list.model';
import { Injectable } from '@angular/core';

import { AngularFirestoreCollection,
         AngularFirestoreDocument,
         AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipationListService {
  productsRef: AngularFirestoreCollection<any>;
  paricipationList: Observable<ParticipantsList[]>;
  itemDoc: AngularFirestoreDocument<ParticipantsList>;
  constructor(private db: AngularFirestore) {
    this.productsRef = this.db.collection<ParticipantsList>('participantsList');
  }

  createParticipantsDocument() {
    const data = {
      participantsList: [],
      total: 0
    };
    return this.productsRef.add({...data});
  }
}
