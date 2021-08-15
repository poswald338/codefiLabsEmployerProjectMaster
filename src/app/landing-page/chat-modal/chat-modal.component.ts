import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {
  chatForm: FormGroup;
  messages: []

  constructor(public activeModal: NgbActiveModal) { }

  session = false

  ngOnInit(): void {
  }

  onSubmit() {
    this.session = true
  }
}
