import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  username = '';
  role = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';

    this.role =
      localStorage.getItem('role') ||
      localStorage.getItem('userRole') ||
      '';
  }

  getPrimaryButtonText(): string {
    const normalizedRole = this.role.toLowerCase();

    if (normalizedRole === 'admin') {
      return 'Manage WiFi Schemes';
    }

    return 'Explore WiFi Plans';
  }

  explorePlans(): void {
    const normalizedRole = this.role.toLowerCase();

    if (normalizedRole === 'admin') {
      this.router.navigate(['/admin/view-schemes']);
    } else {
      this.router.navigate(['/user/view-schemes']);
    }
  }

  scrollToFeatures(): void {
    const featuresSection = document.getElementById('features');

    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}