import { Component, Signal, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductDetails } from '../product-details/product-details';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, UpperCasePipe, ProductDetails],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  selectedProduct = signal<Product | null>(null);

  select(product: Product): void {
    this.selectedProduct.set(product);
  }


  protected title = signal('Products');

  products: Signal<Product[]> = signal([
    {
      id: 1,
      name: 'Trek SSL 2026',
      price: 1799.9,
      description: 'Racing bike.',
      discontinued: false,
      fixedPrice: false,
      imageUrl:
        'https://raw.githubusercontent.com/ldex/angular-full-project/refs/heads/master/src/assets/images/trek.jpg',
      modifiedDate: new Date(2026, 12, 8),
    },
    {
      id: 2,
      name: 'City XT 2025',
      price: 1659.5,
      description: 'City bike.',
      discontinued: true,
      fixedPrice: false,
      imageUrl:
        'https://raw.githubusercontent.com/ldex/angular-full-project/refs/heads/master/src/assets/images/city.jpg',
      modifiedDate: new Date(2025, 1, 12),
    },
    {
      id: 3,
      name: 'Cosmic Cobat 2025',
      price: 1499.9,
      description: 'Great bike.',
      discontinued: false,
      fixedPrice: false,
      imageUrl:
        'https://raw.githubusercontent.com/ldex/angular-full-project/refs/heads/master/src/assets/images/cosmic-cobat.jpg',
      modifiedDate: new Date(2025, 1, 2),
    },
    {
      id: 4,
      name: 'Hero DTB 2025',
      price: 1759,
      description: "Champion's bike.",
      discontinued: true,
      fixedPrice: true,
      imageUrl:
        'https://raw.githubusercontent.com/ldex/angular-full-project/refs/heads/master/src/assets/images/hero-dtb.jpg',
      modifiedDate: new Date(2025, 1, 24),
    },
    {
      id: 5,
      name: 'S-WORKS 2026',
      price: 1999.9,
      description: 'Ultra bike.',
      discontinued: false,
      fixedPrice: false,
      imageUrl:
        'https://raw.githubusercontent.com/ldex/angular-full-project/refs/heads/master/src/assets/images/s-works.jpg',
      modifiedDate: new Date(2026, 1, 19),
    },
  ]);
}
