import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs';

/**
 * Componente de inicio de sesión.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,NgClass, NgFor, ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  registerform!: FormGroup;
  loginform!: FormGroup;
  usuarios: Usuario[] = [];

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    this.registerform = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)])
    });

    this.loginform = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmitForm1() {
    if (this.registerform.valid) {

      console.log(this.registerform.value);
      this.authService.register(this.registerform.value).subscribe(response => {
        alert("Registrado Correctamente");
        this.registerform.reset();
      });
    }
  }

  onSubmitForm2() {
    const { usuario, password } = this.loginform.value;
    if (this.loginform.valid) {
     
      this.authService.login(usuario, password).subscribe(
        (response) => {
          console.log(response);
          const userlogin = response.find(u => u.usuario === usuario && u.password === password)
          if (userlogin !== undefined) {
            // Usuario encontrado, redirigir a otra página
            this.router.navigateByUrl('home')
          } else {
            // Usuario no encontrado
            alert('Usuario o contraseña incorrectos');
          }
        },
        (error) => {
          alert('Error en el servidor. Inténtalo de nuevo más tarde.');
        });

    }

  }


  /**
   * Indica si la sección de registro es visible.
   * @type {boolean}
   */
  isSignDivVisible: boolean  = false;
  
  /**
   * Variable temporal.
   * @type {any}
   */
  temp = null;
  //registerForm: FormGroup;
  //loginForm: FormGroup;
  
  /**
   * Lista de usuarios registrados.
   * @type {any[]}
   */
  //usuarios: any[] = [];
  
  /**
   * Indica si el formulario ha sido enviado.
   * @type {boolean}
   */
  submitted: boolean = false;


}
