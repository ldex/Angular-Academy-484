import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductDetails } from '../product-details/product-details';
import { ProductService } from '../product-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, UpperCasePipe, SlicePipe, ProductDetails, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  pageSize = signal(5);
  start = signal(0);
  end = signal(this.pageSize());
  pageNumber = signal(1);

  changePage(increment: number): void {
    this.start.update((start) => start + increment * this.pageSize());
    this.end.set(this.start() + this.pageSize());
    this.pageNumber.update((pageNumber) => pageNumber + increment);
    this.selectedProduct.set(null);
  }


  selectedProduct = signal<Product | null>(null);

  isLoading: Signal<boolean> = this.productService.isLoading;
  errorMessage: Signal<string | null> = this.productService.errorMessage;

  select(product: Product): void {
    this.selectedProduct.set(product);
    this.router.navigate(['/products', product.id]);
  }

  protected title = signal('Products');

  products: Signal<Product[]> = this.productService.getProducts();
}
