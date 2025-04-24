import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  authenticateForm: FormGroup;

  inSignUpMode = false;

  ngOnInit(): void {
    this.authenticateForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSwitchMode() {
    this.inSignUpMode = !this.inSignUpMode;
  }
}
