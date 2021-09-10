
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ChatServiceService } from './chat-service.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef
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
  timer;
  error: string = null;

  ngOnInit(): void {
    if(localStorage.getItem('session_id')) {
      this.id = +localStorage.getItem('session_id');
      this.session = true
      this.onGetMessages(this.id)
    }
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
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
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {this.sessionExpire()}, 600000);
    this.messageSub = this.chatService.getMessages(data)
    .subscribe((messages: any) => {
        this.chatMessages = messages.payload;  
          // if this.messageCount < messages.payload.length 
          // this.messageCount = message.payload.length
          // run scroll to bottom
          // else do nothihng
      })
    if(this.polling === false){
      this.startPolling()
    }
  }

  onCloseModal() {
    // good place to start a timer to archive session
    console.log('closed')
  }

  onSubmitSessionForm(sForm: NgForm) {
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
    if(this.session) {
      this.timer = setTimeout(() => {this.sessionExpire()}, 600000);
    }
    sForm.reset();
  }

  onSubmitMessageForm(mForm: NgForm) {
    console.log(mForm)
    const message = mForm.value.message
    this.session=true
    this.chatService.newMessage(message, this.id);
  }

  sessionExpire() {
    this.session = false;
    this.chatService.endSession(this.chatService.id);
    localStorage.removeItem('session_id');
    this.activeModal.close();
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  ngOnDestroy() {
    clearInterval(this.interval)
    this.polling = false
    this.subs.unsubscribe();
    if(this.messageSub) {
      this.messageSub.unsubscribe();
    }
  }
}
