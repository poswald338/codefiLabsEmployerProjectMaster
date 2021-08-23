
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ChatServiceService } from './chat-service.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit, OnDestroy, OnChanges {

  constructor(
    public activeModal: NgbActiveModal,
    public chatService: ChatServiceService) { }
    private messageSub: Subscription
    private messageChangedSub: Subscription;
    private subs = new Subscription;
    chatMessages: Message[] = []
    session = false
    polling = false
    id;
    interval;

  ngOnInit(): void {debugger
    if(localStorage.getItem('session_id')) {
      this.id = localStorage.getItem('session_id');
      this.session = true
      this.onGetMessages(this.id)
    } else {
      return
    }
    this.messageChangedSub = this.chatService.messagesChanged.subscribe((messages: Message[]) => {
        this.chatMessages = messages;
        // this.startPolling()
      })
    this.chatMessages = this.chatService.retrieveMessages()
    if (this.polling === false) {
      // this.startPolling();
    }
  }

  ngOnChanges() {

  }
  
  startPolling() {
    if (this.session) {
      // setInterval(() => { console.log('hi'), this.messageSub.unsubscribe(), this.onGetMessages(this.id) }, 5000)
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
    this.messageSub = this.chatService.getMessages(data);
    this.startPolling()
  }

  onCloseModal() {
    // this.chatService.endSession();
  }

  onSubmitSessionForm(sForm: NgForm) {debugger
    const name = sForm.value.name
    const message = sForm.value.message
    this.subs.add(this.chatService.createSession(name, message).subscribe((res: any) => {
      console.log(res);
      this.id = res.payload[0].session_id;
      this.onGetMessages(res.payload[0].session_id)
      })
    )
    this.session = true
  }

  onSubmitMessageForm(mForm: NgForm) {
    console.log(mForm)
    const message = mForm.value.message
    this.session=true
  }

  ngOnDestroy() {
    clearInterval(this.interval)
    this.polling = false
    this.subs.unsubscribe();
    this.messageSub.unsubscribe();
    this.messageChangedSub.unsubscribe();
  }
}
