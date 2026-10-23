import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='angularapp';
  role = '';

  constructor(private router: Router) {
    this.updateRole();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateRole();
      }
    });
  }

  updateRole(): void {
    const currentUrl = this.router.url;

    const isPublicPage =
      currentUrl === '/' ||
      currentUrl.includes('/login') ||
      currentUrl.includes('/signup');

    if (isPublicPage) {
      this.role = '';
      return;
    }

    this.role =
      localStorage.getItem('role') ||
      localStorage.getItem('userRole') ||
      '';
  }

  get isAdmin(): boolean {
    return this.role.toLowerCase() === 'admin';
  }

  get isUser(): boolean {
    return this.role.toLowerCase() === 'user';
  }
}