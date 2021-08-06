import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatModalComponent } from './chat-modal.component';



@NgModule({
  declarations: [
    ChatModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChatModalComponent
  ]
})
export class ChatModalModule { }
