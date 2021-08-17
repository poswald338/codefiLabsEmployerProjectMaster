import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatModalComponent } from './chat-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    ChatModalComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ChatModalComponent
  ]
})
export class ChatModalModule { }
