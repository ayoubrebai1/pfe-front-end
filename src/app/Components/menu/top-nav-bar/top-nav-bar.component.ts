import { NotificationService } from './../../../Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { AccountService } from './../../../Services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { WebSocketService } from 'src/app/Services/web-socket.service';
@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
})
export class TopNavBarComponent implements OnInit, OnDestroy {
  user;
  constructor(
    private route: Router,
    private accountService: AccountService,
    private userService: UserService,
    private notificationService: NotificationService,
    public webSocketService: WebSocketService
  ) {}
  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
  notifications;
  count = null;
  id_user = localStorage.getItem('id');

  toggleClicked(event: MouseEvent) {
    var target = event.srcElement['id'];
    var body = $('body');
    var menu = $('#sidebar-menu');

    // toggle small or large menu
    if (body.hasClass('nav-md')) {
      menu.find('li.active ul').hide();
      menu.find('li.active').addClass('active-sm').removeClass('active');
    } else {
      menu.find('li.active-sm ul').show();
      menu.find('li.active-sm').addClass('active').removeClass('active-sm');
    }
    body.toggleClass('nav-md nav-sm');
  }

  ngOnInit() {
    this.webSocketService.openWebSocket();
    let email = localStorage.getItem('email');
    this.userService.getUserByEmail(email).subscribe((data) => {
      this.user = data;
    });
    this.getNotification();
    this.webSocketService.sizeNotification.subscribe((data) => {
      this.count = data;
    });
  }

  ngAfterViewInit() {}

  logout() {
    localStorage.clear();
    this.accountService.changeStus(false);
    this.route.navigateByUrl('/login');
  }
  getNotification() {
    this.notificationService.getAll().subscribe((data: any) => {
      this.notifications = data;
      this.webSocketService.chatMessages = data.filter(
        (d) => d.reciver == this.id_user
      );
      console.log('dthis.notificationsata', this.webSocketService.chatMessages);
      this.count = this.webSocketService.chatMessages.length;
    });
  }
  initializ(){
    this.webSocketService.IncrementSize(0);
  }
}
