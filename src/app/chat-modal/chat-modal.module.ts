import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatModalComponent } from './chat-modal.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ChatModalComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ChatModalComponent
  ]
})
export class ChatModalModule { }
