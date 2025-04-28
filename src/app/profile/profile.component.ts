import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;

  private profileSubscription: Subscription;
  editMode = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.fetchProfile();

    this.profileSubscription = this.profileService.profileChanged.subscribe(
      (profileData) => {
        const user = JSON.parse(localStorage.getItem('userData'));

        const userProfile = profileData.find(
          (profile) => profile.email === user.email
        );

        if (userProfile) {
          this.editMode = true;

          this.profileForm.patchValue({
            name: userProfile.name,
            email: userProfile.email,
            phone: userProfile.phone,
            address: userProfile.address,
            pincode: userProfile.pincode,
          });
        }
      }
    );

    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/),
      ]),
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    const name = this.profileForm.value.name;
    const email = this.profileForm.value.email;
    const phone = +this.profileForm.value.phone;
    const address = this.profileForm.value.address;
    const pincode = +this.profileForm.value.pincode;

    if (this.editMode) {
      this.profileService.updateExistingProfile(
        name,
        email,
        phone,
        address,
        pincode
      );
    } else {
      this.profileService.insertProfile(name, email, phone, address, pincode);
    }
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }
}
