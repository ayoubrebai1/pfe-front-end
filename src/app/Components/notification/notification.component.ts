import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Services/web-socket.service';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from 'src/app/Models/ChatMessageDto';
import { NotificationService } from 'src/app/Services/notification.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    public webSocketService: WebSocketService
  ) {}
  values = [];
  x = localStorage.getItem('id');
  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    let chatMessageDto = new ChatMessageDto(
      null,
      '144',
      '114',
      'aloo',
      Date.now()
    );
    this.notificationService
      .createNotification(chatMessageDto)
      .subscribe((data) => {
        console.log('data', data);
      });
    //this.values.push(chatMessageDto);
    this.webSocketService.sendMessage(chatMessageDto);
    this.values = this.webSocketService.chatMessages;
    let obj = {
      msg: sendForm.value.message,
    };
    console.log('obj', obj);
  }
}
