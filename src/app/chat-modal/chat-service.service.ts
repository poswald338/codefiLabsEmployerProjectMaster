import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(
    private http: HttpClient
  ) { }

  messages: Message[] = []
  apiUrl = 'https://codelabs-slack-chat.herokuapp.com/api/v1/messages/'

  createSession() {
    const value = 'HALUAH08houahs08208hodnoun08n08n08n02naufnaofuna08'
    return this.http.post(this.apiUrl + 'new_session?token='+value, {
      name: 'John',
      message: 'Hello'
    }).subscribe(payload => {
      console.log(payload);
    })
  }

  getMessages() {
    //session_id to be replaced with key set in storage
    const id = localStorage.getItem('session_id');
    const value = 'HALUAH08houahs08208hodnoun08n08n08n02naufnaofuna08'

    return this.http.get(this.apiUrl+'retrieve_messages?token='+value)
    .subscribe(response => {
      console.log(response);
    })
}

  endSession() {

  }

}
