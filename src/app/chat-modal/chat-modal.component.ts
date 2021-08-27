import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs';
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
    session = false
    activeName = 'Patrick';
    data;
    id = localStorage.getItem('session_id');

  ngOnInit(): void {
    this.subs.add(
      this.chatService.messagesChanged.subscribe((messages: Message[]) => {debugger
        this.chatMessages = messages;
      })
    )
  }

  startPolling() {
    if (this.id) {
      setInterval(() => { this.messageSub.unsubscribe(), this.onGetMessages }, 5000)
    }
  }

  onGetMessages() {
   this.messageSub = this.chatService.getMessages(this.id)
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmitSessionForm(sForm: NgForm) {
    console.log(sForm)
    const name = sForm.value.name
    const message = sForm.value.message
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
}
