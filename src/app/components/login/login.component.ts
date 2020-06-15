import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public _chatService: ChatService) { }

  ngOnInit(): void {
  }

  logIn(account: string){
    console.log(account);
    this._chatService.login(account);
  }

}
