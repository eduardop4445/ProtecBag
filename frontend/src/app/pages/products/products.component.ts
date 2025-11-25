import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsService } from './pages/products/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class ProductsComponent implements OnInit {

  displayedColumns = ['name', 'quantity', 'unit', 'minimumQuantity', 'actions'];
  dataSource = new MatTableDataSource<any>();
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;

    this.productsService.getAll().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.loading = false;

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value?.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

 create() {
    this.router.navigate(['/products/new']);
  }

  edit(id: string) {
    this.router.navigate([`/products/${id}/edit`]);
  }

  delete(id: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.productsService.delete(id).subscribe(() => this.load());
    }
  }
}
