import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioCreate, UsuariosService, UsuarioUpdate } from '../../../core/services/usuarios.service';


@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './usuarios-form.component.html',
  
})
export class UsuariosFormComponent implements OnInit {

  id: string | null = null;
  isEditing = false;

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required], 
    telefone: [''],
    papel: ['Admin'],
    ativo: [true]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.id;

    if (this.isEditing && this.id) {
      this.form.get('senha')?.clearValidators();
      this.form.get('senha')?.updateValueAndValidity();

      this.usuariosService.getById(this.id).subscribe(u => {
        this.form.patchValue({
          nome: u.nome,
          email: u.email,
          telefone: u.telefone,
          papel: u.papel,
          ativo: u.ativo
        });
      });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const dados = this.form.value;

    if (this.isEditing && this.id) {
      const payload = dados as UsuarioUpdate;
      this.usuariosService.update(this.id, payload).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    } else {
      const payload = dados as UsuarioCreate;
      this.usuariosService.create(payload).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }
}
