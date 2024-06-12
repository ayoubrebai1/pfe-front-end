import { NotificationComponent } from './Components/notification/notification.component';
import { MessageComponent } from './Components/message/message.component';
import { TypeBudgetComponent } from './Components/type-budget/type-budget.component';
import { DetailBudgetComponent } from './Components/detail-budget/detail-budget.component';
import { TypeCentreResponsabilityComponent } from './Components/type-centre-responsability/type-centre-responsability.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './Components/budget/budget.component';
import { LoginComponent } from './Components/login/login.component';
import { NodeComponent } from './Components/node/node.component';
import { OrganigrameComponent } from './Components/organigrame/organigrame.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResponsabilityCenterComponent } from './Components/responsability-center/responsability-center.component';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './Components/users/users.component';
import { HistoriqueComponent } from './Components/historique/historique.component';
import { VoteComponent } from './Components/vote/vote.component';
import { MembreGuard } from './guards/membre.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'ResponsabilityCenter',
    component: ResponsabilityCenterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Budget/:id_centre',
    component: BudgetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Node',
    component: NodeComponent,
    canActivate: [AuthGuard, IsAdminGuard],
  },
  {
    path:'Historique',
    component:HistoriqueComponent,
    canActivate: [AuthGuard, IsAdminGuard]
  },
  {
    path: 'typeCentre',
    component: TypeCentreResponsabilityComponent,
    canActivate: [AuthGuard, IsAdminGuard],
  },
  {
    path: 'Organigrame',
    component: OrganigrameComponent,
    canActivate: [AuthGuard, IsAdminGuard],
  },
  {
    path: 'message/:id',
    component: MessageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard, IsAdminGuard],
  },
  {
    path: 'typeBudget',
    component: TypeBudgetComponent,
    canActivate: [AuthGuard, IsAdminGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard, IsAdminGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [AfterAuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {path: 'vote', component: VoteComponent, canActivate:[AuthGuard]},
  
  {
    path: 'details/:id_budget',
    component: DetailBudgetComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
