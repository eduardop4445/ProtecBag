import { Routes } from '@angular/router';
import { ProductsFormComponent } from './form/products-form.component';
import { ProductsComponent } from '../../products.component';


export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'new', component: ProductsFormComponent },
  { path: 'edit/:id', component: ProductsFormComponent }
];
