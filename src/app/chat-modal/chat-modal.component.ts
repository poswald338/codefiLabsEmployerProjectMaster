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

  ngOnInit(): void {
  }

  onGetMessages() {
    this.chatService.createSession();
  }

}
