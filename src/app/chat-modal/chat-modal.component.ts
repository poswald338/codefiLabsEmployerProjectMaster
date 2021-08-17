import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {
  messages: []

  constructor(public activeModal: NgbActiveModal) { }

  session = false

  ngOnInit(): void {
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
