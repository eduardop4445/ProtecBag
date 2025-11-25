import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    console.log("SUBMIT DISPAROU", this.form.value);

    if (this.form.invalid) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        console.log("LOGIN OK", res);
        this.auth.saveSession(res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log("ERRO LOGIN", err);
        this.errorMessage = 'Credenciais inválidas.';
      }
    });
  }


}
