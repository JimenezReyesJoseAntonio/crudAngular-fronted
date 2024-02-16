import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrl: './lista-producto.component.css'
})
export class ListaProductoComponent implements OnInit {
  productos: Producto[] = [];

  listaVacia: string | undefined;

  constructor(
    private productoService: ProductoService
    ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  borrar(id: number| undefined): void {
    Swal.fire({
      title: "Estas seguro?",
      text: "No hay vuelta atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(id).subscribe(res => this.cargarProductos());
        Swal.fire({
          title: "Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

}
