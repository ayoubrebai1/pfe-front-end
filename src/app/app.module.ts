import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponsabilityCenterComponent } from './Components/responsability-center/responsability-center.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BudgetComponent } from './Components/budget/budget.component';
import { NodeComponent } from './Components/node/node.component';
import { OrganigrameComponent } from './Components/organigrame/organigrame.component';
import {
  DiagramAllModule,
  DiagramModule,
  OverviewAllModule,
  SymbolPaletteAllModule,
} from '@syncfusion/ej2-angular-diagrams';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { Interceptor } from './Models/interceptor';
import { TopNavBarComponent } from './Components/menu/top-nav-bar/top-nav-bar.component';
import { SidebarComponent } from './Components/menu/sidebar/sidebar.component';
import { FooterComponent } from './Components/menu/footer/footer.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { UsersComponent } from './Components/users/users.component';
import { HistoriqueComponent } from './Components/historique/historique.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { VoteComponent } from './Components/vote/vote.component';
import { TypeCentreResponsabilityComponent } from './Components/type-centre-responsability/type-centre-responsability.component';
import { DetailBudgetComponent } from './Components/detail-budget/detail-budget.component';
import { TypeBudgetComponent } from './Components/type-budget/type-budget.component';
import { MessageComponent } from './Components/message/message.component';
import { NotificationComponent } from './Components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    ResponsabilityCenterComponent,
    BudgetComponent,
    NodeComponent,
    OrganigrameComponent,
    RegisterComponent,
    LoginComponent,
    TopNavBarComponent,
    SidebarComponent,
    FooterComponent,
    ProfileComponent,
    UsersComponent,
    HistoriqueComponent,
    VoteComponent,
    TypeCentreResponsabilityComponent,
    DetailBudgetComponent,
    TypeBudgetComponent,
    MessageComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    DiagramModule,
    DiagramAllModule,
    SymbolPaletteAllModule,
    OverviewAllModule,
    BrowserModule,
    DiagramAllModule,
    SymbolPaletteAllModule,
    OverviewAllModule,
    BrowserModule,
    ColorPickerModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
