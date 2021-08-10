import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators'


export interface SessionResponse {
  channel_id: number,
  channel_name: string,
  is_active: boolean,
  name: string,
  session_id: number,
  message?: string
}

@Injectable({providedIn: 'root'})
export class ChatServiceService {

  constructor(
    private http: HttpClient
  ) {}

  messages: Message[] = []
  url = `${environment.apiUrl}`
  key = `${environment.apiKey}`
  id;

// 'data' will be the information from form
  createSession() {
    return this.http.post<any>(this.url+'new_session?token='+this.key, {
      //data.name and data.message will carry over from form
      name: "john",
      message: "hi"
    }).pipe(tap(response => {
      response.payload[0].session_id
      localStorage.setItem('session_id', response.payload[0].session_id)
      debugger;
    }
    )).subscribe(response => {
      console.log(response);
      console.log(response.session_id)
      // this.id = response.session_id;
    })
  }

  getMessages() {
    //session_id to be replaced with key set in storage
    let id = localStorage.getItem('session_id');

    return this.http.get(this.url+'retrieve_messages?token='+this.key, {
      params: {
        token: this.key,
        session_id: id
      }
    })
    .subscribe(response => {                
      console.log(response);
    })
  }

  newMessage() {
    return this.http.post(this.url+'new_message?token='+this.key, {
      message: 'Hello, this is John.'
    }, {
      params: {
        token: this.key,
        session_id: '12'
      }
    }).subscribe(response => {
      console.log(response);
    })
  }

  endSession() {
    localStorage.removeItem('session_id');
    return this.http.delete(this.url+'end_session', {
      params: {
        token: this.key,
        session_id: this.id
      }
    }).subscribe(response => {
      console.log(response)
    })
  }

}
