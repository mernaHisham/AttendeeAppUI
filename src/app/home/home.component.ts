import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
      this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));
  }

  getSeverity (product: Product) {
      switch (product.inventoryStatus) {
          case 'INSTOCK':
              return 'success';

          case 'LOWSTOCK':
              return 'warning';

          case 'OUTOFSTOCK':
              return 'danger';

          default:
              return null;
      }
  };
}


