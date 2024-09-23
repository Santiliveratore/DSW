import { Component } from '@angular/core';
import { FormArray,FormBuilder,FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {

  userForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    apellido: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    contraseña: new FormControl('',Validators.required)
    
  })

  constructor(private usuarioService: UsuarioService,
    private router: Router
  ) {}

  onSubmit(){
    if (this.userForm.valid) {  // Verifica si el formulario es válido
      const usuario = this.userForm.value;  // Obtiene los valores del formulario

      // Llama al método del servicio para enviar los datos
      this.usuarioService.crearUsuario(usuario).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);  // Muestra la respuesta
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);  // Maneja el error
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

}
