// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-adminnav',
//   templateUrl: './adminnav.component.html',
//   styleUrls: ['./adminnav.component.css']
// })
// export class AdminnavComponent implements OnInit {

//   username = 'Admin';

//   menuOpen = false;
//   schemeMenuOpen = false;
//   profileMenuOpen = false;
//   showLogoutModal = false;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     this.username =
//       localStorage.getItem('username') ||
//       localStorage.getItem('email') ||
//       'Admin';
//   }

//   getInitial(): string {
//     if (!this.username) {
//       return 'A';
//     }

//     return this.username.charAt(0).toUpperCase();
//   }

//   toggleMenu(): void {
//     this.menuOpen = !this.menuOpen;
//     this.profileMenuOpen = false;
//   }

//   toggleSchemeMenu(): void {
//     this.schemeMenuOpen = !this.schemeMenuOpen;
//     this.profileMenuOpen = false;
//   }

//   toggleProfileMenu(): void {
//     this.profileMenuOpen = !this.profileMenuOpen;
//     this.schemeMenuOpen = false;
//   }

//   closeMenu(): void {
//     this.menuOpen = false;
//     this.schemeMenuOpen = false;
//     this.profileMenuOpen = false;
//   }

//   openLogoutModal(): void {
//     this.closeMenu();
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
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  private static readonly DEFAULT_USERNAME = 'Admin';

  private static readonly TOKEN_KEY = 'token';
  private static readonly USERNAME_KEY = 'username';
  private static readonly EMAIL_KEY = 'email';
  private static readonly ROLE_KEY = 'role';
  private static readonly USER_ROLE_KEY = 'userRole';
  private static readonly USER_ID_KEY = 'userId';

  username = AdminnavComponent.DEFAULT_USERNAME;

  menuOpen = false;
  schemeMenuOpen = false;
  profileMenuOpen = false;
  showLogoutModal = false;

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.getStoredUsername();
  }

  getInitial(): string {
    const normalizedUsername = this.username.trim();

    return normalizedUsername
      ? normalizedUsername.charAt(0).toUpperCase()
      : AdminnavComponent.DEFAULT_USERNAME.charAt(0);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.profileMenuOpen = false;
  }

  toggleSchemeMenu(): void {
    this.schemeMenuOpen = !this.schemeMenuOpen;
    this.profileMenuOpen = false;
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
    this.schemeMenuOpen = false;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.schemeMenuOpen = false;
    this.profileMenuOpen = false;
  }

  openLogoutModal(): void {
    this.closeMenu();
    this.showLogoutModal = true;
  }

  closeLogoutModal(): void {
    this.showLogoutModal = false;
  }

  logout(): void {
    this.clearAuthenticationData();
    this.showLogoutModal = false;

    this.router.navigate(['/login']);
  }

  private getStoredUsername(): string {
    return localStorage.getItem(
      AdminnavComponent.USERNAME_KEY
    ) ??
      localStorage.getItem(
        AdminnavComponent.EMAIL_KEY
      ) ??
      AdminnavComponent.DEFAULT_USERNAME;
  }

  private clearAuthenticationData(): void {
    const authenticationKeys = [
      AdminnavComponent.TOKEN_KEY,
      AdminnavComponent.USERNAME_KEY,
      AdminnavComponent.EMAIL_KEY,
      AdminnavComponent.ROLE_KEY,
      AdminnavComponent.USER_ROLE_KEY,
      AdminnavComponent.USER_ID_KEY
    ];

    authenticationKeys.forEach(key => {
      localStorage.removeItem(key);
    });
  }
}