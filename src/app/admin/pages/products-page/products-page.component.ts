import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../../shared/models/product/product';
import { ProductsService } from '../../../services/products/products.service';
import { DialogProductComponent } from '../../../shared/components/dialog-product/dialog-product.component';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  standalone: false
})
export class ProductsPageComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'category_name', 'actions'];
  Products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.Products = products;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  // Método para eliminar un producto
  delete(product: Product) {
    
    // Mostrar el diálogo de confirmación
    this.showDialog(
      '¿Estás seguro de borrar este producto?',
      `Se eliminará ${product.name} permanentemente.`,
      'Eliminar'
    ).subscribe((result: boolean) => {
      if (result) {
        // Si el usuario confirma, llamar al servicio para eliminar
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.showDialog(
              'Producto Eliminado',
              'El producto fue eliminado satisfactoriamente',
              null
            );
            this.getProducts();
          },
          error: (err) => {
            this.showDialog(
              'Error al producto el usuario',
              'Hubo un error al eliminar el producto :(',
              null
            );
          }
        });
      } else {
        this.showDialog(
          'Accion cancelada ',
          'Operación cancelada satisfactoriamente',
          null
        );
      }
    });
  }

  private showDialog(title: string, message: string, action: string | null) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
        action: action
      }
    });
    return dialogRef.afterClosed();
  }

  edit(product:Product) {
  // Abre el diálogo con los datos del producto seleccionado
  const dialogRef = this.dialog.open(DialogProductComponent, {
    width: '500px',
    data: product, // Pasa el producto seleccionado al diálogo
  });

  // Cuando se cierra el diálogo
  dialogRef.afterClosed().subscribe((result: Product) => {
    if (result) {
      console.log('Producto editado:', result);
      this.actualizarProducto(result); // Llama al método para actualizar el producto
    }
  });
  }

  // Método para actualizar el producto
  actualizarProducto(product: Product): void {
    this.productService.updateProduct(product).subscribe({
      next: (response) => {
        this.showDialog(
          'Producto actualizado con éxito',
          `Se actualizó ${product.name} satisfactoriamente`,
          null
        );
        this.getProducts(); // Actualiza la lista de produtos
      },
      error: (error) => {
        this.showDialog(
          'Error al actualizar el producto',
          `Hubo un error al actualizar ${product.name} `,
          null
        );
        console.log(error)
      },
    });
  }

   add(): void {
      const dialogRef = this.dialog.open(DialogProductComponent, {
        width: '500px',
      });
  
      dialogRef.afterClosed().subscribe((result: Product) => {
        if (result) {
          const nuevoProducto: Product = {
            id: "",
            name: result.name,
            description: result.description,
            category_name: result.category_name , 
            price: result.price,            
            pre_tax_cost: result.pre_tax_cost,
            post_tax_cost: result.post_tax_cost,
            imageUrl: '' 
          };
  
          console.log('Producto a agregar:', nuevoProducto);
          this.agregarProducto(nuevoProducto); 
        }
      });
  }

    agregarProducto(product: Product): void {
      console.log(product);
      this.productService.addProduct(product).subscribe({
        next: (response) => {
          this.showDialog(
            'Produto agregado con éxito',
            `Se agregó ${product.name} satisfactoriamente`,
            null
          );
          this.getProducts();
        },
        error: (error) => {
          this.showDialog(
            'Error al agregar el producto',
            `Hubo un error al agregar ${product.name}`,
            null
          ); console.log(error);
        },
      });
    }


}