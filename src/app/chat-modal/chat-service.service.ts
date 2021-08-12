import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators'
import { Subject } from 'rxjs';


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
  messagesChanged = new Subject<Message[]>()
  url = `${environment.apiUrl}`
  key = `${environment.apiKey}`
  name = 'John'
  id;

// 'data' will be the information from form
  createSession() {
    return this.http.post<any>(this.url+'new_session?token='+this.key, {
      //data.name and data.message will carry over from form
      name: "John",
      message: "hi"
    }).pipe(tap(response => {
      this.id = response.payload[0].session_id
      localStorage.setItem('session_id', response.payload[0].session_id);
    }
    )).subscribe(response => {
      console.log(response);
    })
  }

  getMessages(id) {
    //session_id to be replaced with key set in storage
    // let id = localStorage.getItem('session_id');

    return this.http.get<any>(this.url+'retrieve_messages?token='+this.key, {
      params: {
        token: this.key,
        session_id: id
      }
    }).pipe(tap(response => {debugger
      if(response.payload[0][0].user === 'web') {
        response.payload[0][0].user = this.name
      } else if(response.payload[0][0].user === 'slack') {
        response.payload[0][0].user = 'Patrick'
      }
    }
    )).subscribe((messages: any) => {debugger
      if (messages.payload.length === this.messages.length) {
        return this.messages
      } else {
        this.messages = messages.payload;
        this.messagesChanged.next(this.messages.slice())        
      }
        console.log(this.messages);    
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
