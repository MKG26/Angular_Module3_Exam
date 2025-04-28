import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  authenticateForm: FormGroup;

  inSignUpMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authenticateForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSwitchMode() {
    this.inSignUpMode = !this.inSignUpMode;
  }

  onSubmit() {
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.inSignUpMode) {
      authObs = this.authService.signUp(
        this.authenticateForm.value.email,
        this.authenticateForm.value.password
      );
    } else {
      authObs = this.authService.signIn(
        this.authenticateForm.value.email,
        this.authenticateForm.value.password
      );
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        if (this.inSignUpMode) {
          this.isLoading = false;
          this.router.navigate(['/profile']);
        } else {
          this.isLoading = false;
          this.router.navigate(['/home']);
        }
      },
      (errorMsg) => {
        console.log(errorMsg);
        this.isLoading = false;
        this.error = errorMsg;
      }
    );
  }
}
