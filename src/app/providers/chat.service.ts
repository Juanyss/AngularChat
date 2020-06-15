import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public user: any = {};

  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {
                this.auth.authState.subscribe(user => {

                  if(!user){
                    return;
                  }

                  this.user.name = user.displayName;
                  this.user.uid = user.uid;
                  this.user.profilePic = user.photoURL;                  


                })
  }

  login(account:string) {
    if(account == 'google'){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }else{
      this.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }

  }


  logout() {
    this.user = {};
    this.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));

    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      console.log(mensajes);
      this.chats = [];
      for (let mensaje of mensajes) {
        this.chats.unshift(mensaje);
      }

      return this.chats
    }));
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: this.user.name,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.user.uid
    }

    return this.itemsCollection.add(mensaje);
  }
}
