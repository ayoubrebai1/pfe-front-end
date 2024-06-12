import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}
  messages;
  id;
  ngOnInit(): void {
    this.getMessages();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id', this.id);
  }

  getMessages() {
    this.messageService.getAll().subscribe((data) => {
      this.messages = data;
      //console.log('id', this.messages);
      this.messages = this.messages.filter(
        (m) => m.detail_budget.id_detail_budget == this.id
      );
      console.log('id', this.messages);
    });
  }
}
