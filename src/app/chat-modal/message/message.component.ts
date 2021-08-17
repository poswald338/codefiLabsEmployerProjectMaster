import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() name: string;
  @Input() text: string;
  @Input() timestamp: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
