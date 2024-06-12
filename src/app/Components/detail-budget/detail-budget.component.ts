import { MessageService } from './../../Services/message.service';
import { TypeBudgetService } from './../../Services/type-budget.service';
import { BudgetService } from './../../Services/budget.service';
import { DetailBudgetServiceService } from './../../Services/detail-budget-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from 'src/app/Services/web-socket.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ChatMessageDto } from 'src/app/Models/ChatMessageDto';
registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-detail-budget',
  templateUrl: './detail-budget.component.html',
  styleUrls: ['./detail-budget.component.css'],
})
export class DetailBudgetComponent implements OnInit, OnDestroy {
  details;

  id;
  typeBudget;
  role = localStorage.getItem('role');
  bool = false;
  constructor(
    private formBuilder: FormBuilder,
    private detailService: DetailBudgetServiceService,
    private activatedRoute: ActivatedRoute,
    private budgetService: BudgetService,
    private typeBudgetService: TypeBudgetService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private router: Router,
    public webSocketService: WebSocketService,
    private notificationService: NotificationService
  ) {}
  msg;
  boolien: boolean = false;
  DetailForm = this.formBuilder.group({
    libelle: [''],
    montant_detail_budget: [''],
    Type: [''],
  });
  id_user;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id_budget');
    console.log('id_budget', this.id);
    this.getDetails();
    this.getTypeBudget();
    //this.webSocketService.openWebSocket();
  }
  onSubmit() {
    console.log(
      'this.DetailForm.value',
      this.DetailForm.value.Type.id_rubrique
    );
    let obj = {
      libelle: this.DetailForm.value.libelle,
      montant_detail_budget: this.DetailForm.value.montant_detail_budget,
      budget: {
        id_budget: Number(this.id),
      },

      rubrique_budget: {
        id_rubrique: this.DetailForm.value.Type.id_rubrique,
      },
    };
    console.log('obj', JSON.stringify(obj));
    this.detailService.createDetailBudget(obj).subscribe((data) => {
      // console.log('data', data);
      this.DetailForm.reset();
      this.toastr.success(' Détail Budget ajouté ');

      //this.details = [...this.details, JSON.parse(data)];
      this.getDetails();
      this.budgetService
        .updateMontant_total(this.id, obj.montant_detail_budget)
        .subscribe((data) => {
          console.log('montant_total', data);
        });
    });
  }
  sendMessage(detail) {
    status;
    if (detail.status == 'green') {
      status = 'refusé';
    }
    if (detail.status == 'red') {
      status = 'validé';
    }
    console.log('object', detail);
    let chatMessageDto = new ChatMessageDto(
      null,
      localStorage.getItem('name'),
      this.id_user,
      `le  détail budget ${detail.libelle} est ${status}`,
      Date.now()
    );

    this.notificationService
      .createNotification(chatMessageDto)
      .subscribe((data) => {
        //console.log('data', data);
      });
    //this.values.push(chatMessageDto);
    this.webSocketService.openWebSocket();
    setTimeout(() => {
      this.webSocketService.sendMessage(chatMessageDto);

      console.log('sozzz', this.webSocketService.chatMessages.length);
      this.webSocketService.closeWebSocket();
    }, 500);
  }
  AddArgument(detail) {
    // console.log('arg', detail);
    // let obj = {
    //   id_detail_budget: detail.id_detail_budget,
    //   libelle: detail.libelle,
    //   montant_detail_budget: detail.montant_detail_budget,
    //   status: detail.status,
    //   argument: detail.argument,
    // };
    this.boolien = true;
    let object = {
      contenue: detail.argument,
      email: localStorage.getItem('name'),
      date: Date.now(),
      detail_budget: {
        id_detail_budget: detail.id_detail_budget,
      },
    };
    // this.detailService.sendMessage(obj).subscribe((data) => {
    //   console.log('data', data);
    //   this.toastr.info(' Message envoyé ');
    // });
    console.log('object', object);
    this.messageService.createMessage(object).subscribe((data) => {
      this.toastr.info(' Message envoyé ');
      console.log('data', data);
      this.msg = '';
    });
  }
  RedirectedToMessages(detail) {
    this.router.navigate(['/message', detail.id_detail_budget]);
  }
  getDetails() {
    // this.detailService.getAll().subscribe((data) => {
    //   this.details = data;
    //   // console.log('get', this.details);
    //   // console.log('idddd', this.id);
    //   // let x = this.details.map((d) => {
    //   //   console.log('dddd', d.budget.id_budget);
    //   // });
    //   // console.log('getx', this.id, x);
    //   // console.log('getOne', this.details[0].budget.id_budget);
    // });
    this.budgetService.getAll().subscribe((data) => {
      this.details = data;
      this.details = this.details.filter(
        (b) => b.id_budget == this.id
      )[0].details_budget;
      this.id_user = this.details[0]?.budget.centre_responsabilite.user.id_user;
      console.log('getdetail', this.details);
      console.log('this.id_user', this.id_user);
    });
  }
  ChangeStatus(detail) {
    let obj = {
      id_detail_budget: detail.id_detail_budget,
      libelle: detail.libelle,
      montant_detail_budget: detail.montant_detail_budget,
      status: detail.status,
    };
    this.detailService.changeStatus(obj).subscribe((data) => {
      console.log('status changer avec succés ', data);

      this.getDetails();
      this.bool = true;
    });
  }

  removeDetail(detail) {
    let obj = {
      id_detail_budget: detail.id_detail_budget,
      libelle: detail.libelle,
      montant_detail_budget: detail.montant_detail_budget,
      status: detail.status,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: obj,
    };
    this.detailService.DeleteDetailBudget(options).subscribe((data) => {
      console.log('delet', data);
      this.details = this.details.filter((d) => d != detail);
      this.toastr.error(' Détail budget supprimé ');
      this.budgetService
        .updateMontant_total(this.id, -obj.montant_detail_budget)
        .subscribe((data) => {
          console.log('montant_totaldelete', data);
        });
    });
    console.log('mm', obj.montant_detail_budget);
  }

  getTypeBudget() {
    this.typeBudgetService.getAll().subscribe((data) => {
      this.typeBudget = data;
      console.log('type', this.typeBudget);
    });
  }
  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
}
