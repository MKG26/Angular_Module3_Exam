import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
import { Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private profiles: Profile[] = [];

  profileChanged = new Subject<Profile[]>();

  constructor(private http: HttpClient) {
    this.fetchProfile();
  }

  updateProfile() {
    this.http
      .put(
        'https://module3-test-193b9-default-rtdb.firebaseio.com/profile.json',
        this.profiles
      )
      .pipe(
        tap((resData) => {
          console.log(resData);
        })
      )
      .subscribe();
  }

  insertProfile(
    name: string,
    email: string,
    phone: number,
    address: string,
    pincode: number
  ) {
    this.profiles.push(new Profile(name, email, phone, address, pincode));

    this.updateProfile();
  }

  fetchProfile() {
    this.http
      .get<Profile[]>(
        'https://module3-test-193b9-default-rtdb.firebaseio.com/profile.json'
      )
      .subscribe((resData) => {
        console.log(resData);
        this.profiles = resData;
        this.profileChanged.next(this.profiles);
      });
  }

  getProfile() {
    return this.profiles.slice();
  }
}
