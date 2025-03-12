import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product/product';
import { ProductsService } from '../../../services/products/products.service';




@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  standalone: false
})
export class ProductsPageComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'category_name', 'actions'];
  Products: Product[] = [];

  constructor(private productService: ProductsService){}


  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      (products: Product[]) =>{
        this.Products = products;
      },
      (error) =>{
        console.error('Error al obtener los products', error);
      }
    );
  }

  edit(product: Product) {
    }
  
    delete(product: Product) {

    }
}

