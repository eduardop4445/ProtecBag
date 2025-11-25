import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-form',
  standalone: true,
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ProductsFormComponent implements OnInit {

  form!: FormGroup;
  isEditing = false;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private service: ProductsService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      unit: ['', Validators.required],
      minimumQuantity: [0, Validators.required],
      notes: ['']
    });

    this.id = this.route.snapshot.paramMap.get('id')!;

    if (this.id) {
      this.isEditing = true;
      this.service.getById(this.id).subscribe(res => this.form.patchValue(res));
    }
  }

  save() {
    if (this.form.invalid) return;

    const payload = this.form.value;

    const request = this.isEditing
      ? this.service.update(this.id, payload)
      : this.service.create(payload);

    request.subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
