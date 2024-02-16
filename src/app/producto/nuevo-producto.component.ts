import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent {
  nombre = '';
  precio: number | null = null;

  
  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    let precio: number; // Declara una variable precio que se asegurará de que sea un número
  
  if (this.precio !== null) {
    precio = this.precio; // Asigna el valor de this.precio solo si no es null
  } else {
    // Si this.precio es null, asigna un valor predeterminado o maneja el caso según tu lógica
    precio = 0; // Por ejemplo, asigna 0 como precio predeterminado
  }
    const producto = new Producto(this.nombre, precio);
    console.log(producto);
    this.productoService.save(producto).subscribe(
      
      data => {
        console.log('si entre');

        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', {
          
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
  volver(): void {
    this.router.navigate(['/']);
  }

}
