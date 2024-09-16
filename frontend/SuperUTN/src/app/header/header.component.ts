import { Component,OnInit,OnChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  usuario: any = null;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuarioActual();
  }

  isLoggedIn(): boolean {
    return this.usuarioService.isLoggedIn();
  }

  logOut(): void {
    this.usuarioService.clearToken();
    this.router.navigate(['/login']);
    this.usuario = null;  // Limpiar usuario actual
  }

}

