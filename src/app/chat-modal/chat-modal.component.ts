
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormsModule } from '@angular/forms';
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
    id = 12

  session = false

  ngOnInit(): void {
    this.subs.add(
      this.chatService.messagesChanged.subscribe((messages: Message[]) => {debugger
        this.chatMessages = messages;
      })
    )
  }

  onSubmit(name, message) {
    this.chatService.createSession(name, message)
  }
//add method inside ngOnChanges
  startPolling() {
    if (this.id) {
      setInterval(() => { this.messageSub.unsubscribe(), this.onGetMessages }, 5000)
    }
  }

  

  onGetMessages() {
   this.messageSub = this.chatService.getMessages(this.id)
   debugger
  }

  onCloseModal() {
    // this.chatService.endSession();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmitSessionForm(sForm: NgForm) {
    console.log(sForm)
    const name = sForm.value.name
    const message = sForm.value.message
    this.session = true
  }

  onSubmitMessageForm(mForm: NgForm) {
    console.log(mForm)
    const message = mForm.value.message
    this.session=true
  }
}
