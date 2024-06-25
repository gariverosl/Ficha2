import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
export class LoginComponent {

   /**
   * Roles disponibles para el usuario.
   * @type {string[]}
   */
  rol = ['Administrador', 'Usuario'];
  
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
  usuarios: any[] = [];
  
  /**
   * Indica si el formulario ha sido enviado.
   * @type {boolean}
   */
  submitted: boolean = false;

/*
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usernamme: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.registerForm = this.fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
*/

/*
  registrarUsuario(usuario: string, contraseña: string): boolean {
    const usuarioExistente = this.usuarios.find(user => user.usuario === usuario);
    if (usuarioExistente) {
      alert('El usuario ya existe.');
      return false;
    }

    const nuevoUsuario = {usuario, contraseña };
    this.usuarios.push(nuevoUsuario);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
    alert('Usuario registrado exitosamente.');
    return true;
  }
 
  onSubmit(): void {
    this.submitted = true;
    const obj = this.registerForm.value;
    if (this.registerForm.valid) {
      const { usuario, contraseña} = this.registerForm.value;
      const registroExitoso = this.registrarUsuario(usuario, contraseña);
      if (registroExitoso) {
        this.registerForm.reset();
        this.submitted = false;
      }
    }
  }
  

  iniciarSesion(username: string, password: string): boolean {
    const usuario = this.usuarios.find(user => (user.username === username) && user.password === password);
    if (usuario) {
      this.router.navigate(['/home']);
      return true;
    } else {
      alert("Usuario NO encontrado")
      return false;
    }
  }
 
  

  onLSubmit() {
    if (this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');
      
      if (usernameControl && passwordControl) {
        const username = usernameControl.value;
        const password = passwordControl.value;


        const inicioExitoso = this.iniciarSesion(username, password);
        if (inicioExitoso) {
          this.loginForm.reset();
        }
      } else {
        console.error('Form controls are missing');
        alert('Formulario no válido.');
      }
    } else {
      alert('Formulario no válido.');
    }
  }
*/
  


  /**
   * Datos del usuario para el registro.
   * @type {Object}
   * @property {string} userNick - Nombre de usuario.
   * @property {string} password - Contraseña.
   */
  userRegistro: any = {
    userNick:'',
    password:''
  }

   /**
   * Datos del usuario para el inicio de sesión.
   * @type {Object}
   * @property {string} userNick - Nombre de usuario.
   * @property {string} password - Contraseña.
   */
  userLogin: any = {
    userNick:'',
    password:''
  }

  /**
   * Inyección del servicio de enrutamiento.
   * @type {Router}
   */
  router =  inject(Router);

   /**
   * Registra un nuevo usuario y lo guarda en el almacenamiento local.
   * @returns {void}
   */
  onRegister() {
    //debugger;
    const isLocalData = localStorage.getItem("ficha");
    if(isLocalData != null) {
      const localArray =  JSON.parse(isLocalData);
      localArray.push(this.userRegistro);
      localStorage.setItem("ficha",JSON.stringify(localArray))
    } else {
      const localArray = [];
      localArray.push(this.userRegistro);
      localStorage.setItem("ficha",JSON.stringify(localArray))
    }
    alert("Registrado Correctamente");
  }


  /**
   * Inicia sesión verificando los datos en el almacenamiento local.
   * @returns {void}
   */
  onLogin() {
    //debugger;
    const isLocalData = localStorage.getItem("ficha");
    if(isLocalData != null) {
      const users = JSON.parse(isLocalData); 

      const isUserFound =  users.find((m:any)=> m.userNick == this.userLogin.userNick && m.password == this.userLogin.password );
      if(isUserFound != undefined) {
        this.temp = this.userLogin.userType;
        this.router.navigateByUrl('home')
      } else {
        alert("Usuario Incorrecto")
      }
    } else {
      alert("Usuario NO encontrado")
    }
  
  }
  


}
