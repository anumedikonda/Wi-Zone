import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminWifiSchemeComponent } from './components/admin-wifi-scheme/admin-wifi-scheme.component';
import { AdminViewSchemeComponent } from './components/admin-view-scheme/admin-view-scheme.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserViewSchemeComponent } from './components/user-view-scheme/user-view-scheme.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'admin', canActivate: [AuthGuard], data: { role: 'admin' },
    children: [
      { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    ]
  },
  { path: 'admin/home', component: HomePageComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/add-scheme', component: AdminWifiSchemeComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/edit-scheme/:id', component: AdminWifiSchemeComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/view-schemes', component: AdminViewSchemeComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/requests', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/feedbacks', component: AdminviewfeedbackComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },


  { path: 'user/home', component: HomePageComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/view-schemes', component: UserViewSchemeComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/apply-request/:id', component: UseraddrequestComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/applied-requests', component: UserviewappliedrequestComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/add-feedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/add-feedback/:id', component: UseraddfeedbackComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/my-feedbacks', component: UserviewfeedbackComponent, canActivate: [AuthGuard], data: { role: 'User' } },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }