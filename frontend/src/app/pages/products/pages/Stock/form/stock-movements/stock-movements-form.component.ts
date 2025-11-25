import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ActivatedRoute, Router } from '@angular/router';
import { StockMovementService } from '../../../products/stock-movements.service';
import { ProductsService } from '../../../products/products.service';


@Component({
  selector: 'app-stock-movements-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './stock-movements-form.component.html',
  styleUrls: ['./stock-movements-form.component.css']
})
export class StockMovementsFormComponent implements OnInit {

  form!: FormGroup;
  isEditing = false;
  id: string | null = null;

  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private stockService: StockMovementService,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      productId: ['', Validators.required],
      type: ['', Validators.required],
      quantity: ['', Validators.required],
      date: ['', Validators.required],
      notes: ['']
    });

    this.productService.getAll().subscribe(res => {
      this.products = res;
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.id;

    if (this.isEditing) {
      this.stockService.getById(this.id!).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    if (this.isEditing) {
      this.stockService.update(this.id!, this.form.value).subscribe(() => {
        this.router.navigate(['/stock-movements']);
      });
    } else {
      this.stockService.create(this.form.value).subscribe(() => {
        this.router.navigate(['/stock-movements']);
      });
    }
  }
}
