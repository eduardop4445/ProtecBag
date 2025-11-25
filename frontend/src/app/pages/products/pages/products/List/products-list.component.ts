import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minimumQuantity: number;
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  displayedColumns = ['name', 'quantity', 'unit', 'minimum', 'actions'];

  products: Product[] = [
    { id: '1', name: 'Rolo de Plástico', quantity: 5, unit: 'rolo', minimumQuantity: 2 },
    { id: '2', name: 'Fita Durex', quantity: 20, unit: 'un', minimumQuantity: 10 }
  ];

  constructor(private router: Router) {}

  newProduct() {
    this.router.navigate(['/products/new']);
  }

  editProduct(id: string) {
    this.router.navigate(['/products', id, 'edit']);
  }
}
