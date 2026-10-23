// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-usernav',
//   templateUrl: './usernav.component.html',
//   styleUrls: ['./usernav.component.css']
// })
// export class UsernavComponent implements OnInit {

//   username = 'User';
//   menuOpen = false;
//   showLogoutModal = false;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     this.username =
//       localStorage.getItem('username') ||
//       localStorage.getItem('email') ||
//       'User';
//   }

//   getInitial(): string {
//     return this.username
//       ? this.username.charAt(0).toUpperCase()
//       : 'U';
//   }

//   toggleMenu(): void {
//     this.menuOpen = !this.menuOpen;
//   }

//   closeMenu(): void {
//     this.menuOpen = false;
//   }

//   openLogoutModal(): void {
//     this.menuOpen = false;
//     this.showLogoutModal = true;
//   }

//   closeLogoutModal(): void {
//     this.showLogoutModal = false;
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     localStorage.removeItem('role');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userId');

//     this.showLogoutModal = false;

//     this.router.navigate(['/login']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  username = 'User';
  menuOpen = false;
  showLogoutModal = false;

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.username =
      localStorage.getItem('username') ||
      localStorage.getItem('email') ||
      'User';
  }

  getInitial(): string {
    return this.username
      ? this.username.charAt(0).toUpperCase()
      : 'U';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  openLogoutModal(): void {
    this.menuOpen = false;
    this.showLogoutModal = true;
  }

  closeLogoutModal(): void {
    this.showLogoutModal = false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');

    this.showLogoutModal = false;

    this.router.navigate(['/login']);
  }
}
