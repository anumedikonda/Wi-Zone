import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminViewSchemeComponent } from './components/admin-view-scheme/admin-view-scheme.component';
import { AdminWifiSchemeComponent } from './components/admin-wifi-scheme/admin-wifi-scheme.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AuthguardComponent } from './components/authguard/authguard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserViewSchemeComponent } from './components/user-view-scheme/user-view-scheme.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './guards/auth.interceptor';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminnavComponent,
    AdminViewSchemeComponent,
    AdminWifiSchemeComponent,
    AdminviewappliedrequestComponent,
    AdminviewfeedbackComponent,
    AuthguardComponent,
    DashboardComponent,
    ErrorComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    UserViewSchemeComponent,
    UseraddfeedbackComponent,
    UseraddrequestComponent,
    UsernavComponent,
    UserviewappliedrequestComponent,
    UserviewfeedbackComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
