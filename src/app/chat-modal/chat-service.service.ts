import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'environments/environment';
import { catchError, map, tap } from 'rxjs/operators'
import { Subject, throwError } from 'rxjs';


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
  id;

  retrieveMessages() {
    return this.messages.slice()
  }

  createSession(name, message) {
    return this.http.post<any>(this.url+'new_session?token='+this.key, {
      name: name,
      message: message
    }).pipe(
      // catchError(this.handleError),
      tap((resData) => {
        this.id = resData.payload[0].session_id
        console.log(this.id)
        localStorage.setItem('session_id', resData.payload[0].session_id);
      })
    )
  }  

  getMessages(sessionId) {
    return this.http.get<any>(this.url+'retrieve_messages?token='+this.key, {
      params: {
        token: this.key,
        session_id: sessionId
      }
    }).pipe(
      catchError(this.handleError)
    )
  }

  newMessage(message: string, session_id: any) {
    return this.http.post(this.url + 'new_message?token=' + this.key, {
      message: message,
      session_id: session_id
      }
    ).subscribe(data => {
      console.log(data)
      this.getMessages(this.id)
    })
  }
  
  endSession(session_id: any) {
    this.http.delete(this.url + 'end_session?token=' + this.key, {
      params: {
      session_id: this.id
      }
    });
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
  }
}
