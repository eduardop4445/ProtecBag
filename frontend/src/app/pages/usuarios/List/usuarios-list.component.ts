import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Usuario, UsuariosService } from '../../../core/services/usuarios.service';


@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './usuarios-list.component.html'})
export class UsuariosListComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'papel', 'ativo', 'acoes'];
  usuarios: Usuario[] = [];
  loading = true;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.usuariosService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  novo() {
    this.router.navigate(['/usuarios/novo']);
  }

  editar(id: string) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  excluir(id: string) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuariosService.delete(id).subscribe(() => this.carregar());
    }
  }
}
