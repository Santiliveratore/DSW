import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoService } from '../catalogo.service';
import {FormGroup,FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.css'
})
export class EditProductoComponent implements OnInit{
  producto:any;
  id: number | null = null; // Almacena el id recuperado
  imagePreview: string | ArrayBuffer | null = ''; // Para la vista previa de la imagen seleccionada
  selectedFile: File | null = null; // Para almacenar la nueva imagen seleccionada

  productoForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl(),
    foto: new FormControl('')
  });

  constructor(private catalogoService:CatalogoService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Recuperar el parámetro 'id' de la ruta
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); // Recupera el parámetro 'id'
      this.id = idParam ? Number(idParam) : null; // Convierte el 'id' a un número

      // Solo se intenta recuperar el producto si el id es válido
      if (this.id) {
        this.catalogoService.getProducto(this.id).subscribe(response => {
          this.producto = response.data;
          // Si ya tienes un formulario, puedes setear los valores aquí
          this.productoForm.patchValue({
            nombre: this.producto.nombre,
            descripcion: this.producto.descripcion,
            precio: Number(this.producto.precio),
            // No llenes el campo foto a menos que quieras mostrar la ruta
          });
        }, error => {
          console.error('Error al recuperar el producto:', error);
        });
      }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Guardar la imagen seleccionada
      // Crear una vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Asigna la nueva vista previa
      };
      reader.readAsDataURL(file); // Lee la nueva imagen
    }
  }

  onSubmit(): void {
    if (this.productoForm.valid) {

      if (this.id) {
        // Llamar al servicio para actualizar el producto
        this.catalogoService.editProducto(this.id,this.productoForm,this.selectedFile).subscribe(
          (response) => {
            console.log('Producto actualizado:', response);
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      }
    }
  }



}
