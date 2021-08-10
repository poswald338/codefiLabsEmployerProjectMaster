import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatServiceService } from './chat-service.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    public chatService: ChatServiceService) { }

    session = false
    data;
    id = 12

  ngOnInit(): void {
  }

  onGetMessages() {
    //data = form data
    this.chatService.createSession();
  }

  onCloseModal() {
    this.chatService.endSession();
  }

  onSetStorage() {
    localStorage.setItem('session_id', JSON.stringify(this.id));
    debugger;
  }
}
