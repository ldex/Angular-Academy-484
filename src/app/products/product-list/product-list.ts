import { Component, inject, Signal, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductDetails } from '../product-details/product-details';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, UpperCasePipe, ProductDetails],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private readonly productService = inject(ProductService);

  selectedProduct = signal<Product | null>(null);

  isLoading: Signal<boolean> = this.productService.isLoading;
  errorMessage: Signal<string | null> = this.productService.errorMessage;

  select(product: Product): void {
    this.selectedProduct.set(product);
  }

  protected title = signal('Products');

  products: Signal<Product[]> = this.productService.getProducts();
}
