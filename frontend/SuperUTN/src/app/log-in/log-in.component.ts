import { Component } from '@angular/core';
import { FormArray,FormBuilder,FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    contraseña: new FormControl('',Validators.required)
  })

  constructor(private usuarioService: UsuarioService,
    private router: Router
  ) {}

  onSubmit(){
    if (this.loginForm.valid) {
      const { email, contraseña } = this.loginForm.value;

      // Llamamos al servicio de login
      this.usuarioService.login(email!, contraseña!).subscribe({
        next: (response) => {
          // Si el login es exitoso, guardamos el token
          this.usuarioService.storeToken(response.token);
          console.log('Login exitoso, token y usuario almacenados:', response.token);

          // Redirigimos al usuario al catálogo
          this.router.navigate(['']);  
        },
        error: (err) => {
          console.error('Error en el login:', err);
          // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        }
      });
    } else {
      console.log('El formulario no es válido');
      // Aquí podrías mostrar un mensaje indicando que los campos son obligatorios o incorrectos
    }
  }

}

