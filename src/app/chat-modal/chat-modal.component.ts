
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs';
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
    private subs = new Subscription;
    chatMessages: Message[] = []
    session = false
    sessiontest = true
    activeName = 'Patrick';
    data;
    id;

  ngOnInit(): void {
    this.subs.add(
      this.chatService.messagesChanged.subscribe((messages: Message[]) => {debugger
        this.chatMessages = messages;
        this.startPolling()
      })
    )
  }

  // onSubmit(name, message) {
  //   this.chatService.createSession(name, message)
  // }

  ngOnChanges() {
    this.startPolling();
  }
  
  startPolling() {
    if (this.sessiontest) {debugger
      // setInterval(() => { this.messageSub.unsubscribe(), this.onGetMessages }, 5000)
      setInterval(() => { console.log('hi'), this.messageSub.unsubscribe(), this.onGetMessages() }, 5000)
    }
  }

  onGet() {
    this.onGetMessages()
  }

  onGetMessages() {
   this.messageSub = this.chatService.getMessages();
  }

  onCloseModal() {
    // this.chatService.endSession();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.messageSub.unsubscribe();
  }

  onSubmitSessionForm(sForm: NgForm) {debugger
    const name = sForm.value.name
    const message = sForm.value.message
    this.chatService.createSession(name, message).subscribe(res => {
      console.log(res)
      })
    this.session = true
    this.onGetMessages();
  }

  onSubmitMessageForm(mForm: NgForm) {
    console.log(mForm)
    const message = mForm.value.message
    this.session=true
  }
}
