import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatModalComponent } from './chat-modal.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ChatModalComponent
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
