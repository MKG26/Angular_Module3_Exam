import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  private authSubscription: Subscription;
  isAuthenticated = false;

  isAdmin = false;

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;

      this.isAdmin = user?.email === 'admin@gmail.com';
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
