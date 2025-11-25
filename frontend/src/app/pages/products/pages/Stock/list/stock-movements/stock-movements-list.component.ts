import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StockMovementsService } from '../../stock-movements.service';
import { StockMovement } from '../../../../models/stock-movement.model';

@Component({
  selector: 'app-stock-movements-list',
  standalone: true,
  templateUrl: './stock-movements-list.component.html',
  styleUrls: ['./stock-movements-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class StockMovementsListComponent implements OnInit {

  movements: StockMovement[] = [];
  displayedColumns = ['product', 'type', 'quantity', 'date', 'actions'];
  loading = true;

  constructor(
    private service: StockMovementsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;

    this.service.getAll().subscribe({
      next: (res) => {
        this.movements = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  create() {
    this.router.navigate(['/stock-movements/new']);
  }

  edit(id: string) {
    this.router.navigate([`/stock-movements/${id}/edit`]);
  }

  delete(id: string) {
    if (confirm('Deseja excluir esta movimentação?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
