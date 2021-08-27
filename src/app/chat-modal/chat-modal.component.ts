import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ChatServiceService } from './chat-service.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})

export class ChatModalComponent implements OnInit, OnDestroy {
  constructor(
    public activeModal: NgbActiveModal,
    public chatService: ChatServiceService) { }
    private messageSub: Subscription
    private subs = new Subscription;
    chatMessages: Message[] = []
    session: boolean = false
    polling: boolean = false
    id: number;
    interval;
    error: string = null;

  ngOnInit(): void {
    if(localStorage.getItem('session_id')) {
      this.id = +localStorage.getItem('session_id');
      this.session = true
      this.onGetMessages(this.id)
    }
  }
  
  startPolling() {
    if (this.session) {
      this.interval = setInterval(() => { 
      console.log('hi')
      this.polling = true
      if (this.messageSub) {
        this.messageSub.unsubscribe();
        this.onGetMessages(this.id);
      } else {
        this.onGetMessages(this.id);
      }
      }, 5000)
    }
  }

  onGetMessages(data) {
    console.log('gets hit')
    this.messageSub = this.chatService.getMessages(data)
    .subscribe((messages: any) => {
        this.chatMessages = messages.payload;    
      })
    if(this.polling === false){
      this.startPolling()
    }
  }

  onCloseModal() {
    // good place to start a timer to archive session
    console.log('closed')
  }

  onSubmitSessionForm(sForm: NgForm) {debugger
    const name = sForm.value.name
    const message = sForm.value.message
    this.subs.add(this.chatService.createSession(name, message).subscribe((res: any) => {
      console.log(res);
      this.id = res.payload[0].session_id;
      this.onGetMessages(res.payload[0].session_id)
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage
      } 
    ))
    this.session = true
    this.chatService.createSession(name, message);
    if(this.session) {
      setTimeout(() => {this.sessionExpire()}, 600000);
    }
  }

  onSubmitMessageForm(mForm: NgForm) {
    console.log(mForm)
    const message = mForm.value.message
    this.session = true
    this.chatService.newMessage(message, localStorage.getItem('session_id'));
    this.chatService.getMessages(localStorage.getItem('session_id'));
  }

  sessionExpire() {
    this.session = false;
    this.chatService.endSession(this.chatService.id);
    localStorage.removeItem('session_id');
    this.activeModal.close();
  }

  ngOnDestroy() {
    clearInterval(this.interval)
    this.polling = false
    this.subs.unsubscribe();
    this.messageSub.unsubscribe();
  }
}
