import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { CartComponent } from './cart/cart/cart.component';

export const routes: Routes = [
  { path: 'products', component: AllProductsComponent },
  { path: 'details/:id', component: ProductsDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'nav', component: NavbarComponent },
  { path: ' ', component: AppComponent },
  { path: '**', component: AppComponent },

];
