import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './shared/material/core/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsListComponent } from './pages/products/pages/products/List/products-list.component';
import { ProductsFormComponent } from './pages/products/pages/products/form/products-form.component';
import { StockMovementsListComponent } from './pages/products/pages/Stock/list/stock-movements/stock-movements-list.component';
import { StockMovementsFormComponent } from './pages/products/pages/Stock/form/stock-movements/stock-movements-form.component';
import { UsersListComponent } from './pages/pages/users/list/users-list.component';
import { UsersFormComponent } from './pages/pages/users/form/users-form.component';
import { UsuariosListComponent } from './pages/usuarios/List/usuarios-list.component';
import { UsuariosFormComponent } from './pages/usuarios/Form/usuarios-form.component';


export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }, 
      { path: 'products', component: ProductsComponent },
      { path: 'products/new', component: ProductsFormComponent },
      { path: 'products/:id/edit', component: ProductsFormComponent },

      { path: 'stock-movements', component: StockMovementsListComponent },
      { path: 'stock-movements/new', component: StockMovementsFormComponent },
      { path: 'stock-movements/:id/edit', component: StockMovementsFormComponent },

      { path: 'users', component: UsersListComponent },
      { path: 'users/new', component: UsersFormComponent },
      { path: 'users/:id/edit', component: UsersFormComponent },

      { path: 'usuarios', component: UsuariosListComponent },
      { path: 'usuarios/novo', component: UsuariosFormComponent },
      { path: 'usuarios/editar/:id', component: UsuariosFormComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },


  { path: '**', redirectTo: 'login' }

];
