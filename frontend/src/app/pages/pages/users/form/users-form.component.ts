import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  isEditing = false;
  id: string | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['Admin', Validators.required],
    password: [''],    
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private usersService: UsersService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.id;
  }

  ngOnInit(): void {
    if (this.isEditing && this.id) {
      this.usersService.getById(this.id).subscribe(u => {
        this.form.patchValue({
          name: u.name,
          email: u.email,
          role: u.role,
        });
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const payload = { ...this.form.value };

    if (this.isEditing && this.id) {
      this.usersService.update(this.id, payload).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.usersService.create(payload).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
