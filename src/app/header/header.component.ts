import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  isAuthenticated = false;

  isAdmin = false;

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;

      this.isAdmin = user?.email === 'admin@gmail.com';
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
