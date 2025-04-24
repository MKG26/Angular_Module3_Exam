import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'order',
    component: OrdersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
