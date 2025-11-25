import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DashboardService } from '../../core/services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalProdutos = 0;
  produtosCriticos = 0;
  totalMovimentacoesMes = 0;

  usoMensal: any[] = [];
  itensCriticos: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe((data) => {
      this.totalProdutos = data.totalProdutos;
      this.produtosCriticos = data.produtosCriticos;
      this.totalMovimentacoesMes = data.totalMovimentacoesMes;
      this.usoMensal = data.usoMensal;
      this.itensCriticos = data.itensCriticos;
    });
  }
}
