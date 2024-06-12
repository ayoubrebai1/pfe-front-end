import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../Models/ChatMessageDto';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  webSocket: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  size = new BehaviorSubject<Number>(this.chatMessages.length);
  sizeNotification = this.size.asObservable();
  constructor(private http: HttpClient, public auth: UserService) {}

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8081/chat');
    console.log('this.webSocket', this.webSocket);
    //ouvrir la connexion
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };
    //appelé lorsqu'un message est reçu du serveur
    this.webSocket.onmessage = (event) => {
      console.log('WebSocket message received:', event);
      const chatMessageDto = JSON.parse(event.data);
      if (chatMessageDto.reciver == localStorage.getItem('id')) {
        this.chatMessages.unshift(chatMessageDto);
        this.IncrementSize(this.chatMessages.length);
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
  IncrementSize(value: Number) {
    this.size.next(value);
  }
}
