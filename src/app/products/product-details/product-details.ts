import { Component, inject, input, OnInit, signal, Signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, UpperCasePipe, DatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private productService = inject(ProductService);

  id = input.required<number>();

  isLoading = this.productService.isLoading;
  errorMessage = this.productService.errorMessage;
  product: Signal<Product | null> = signal(null);

  ngOnInit() {
    this.product = this.productService.getProductById(this.id());
  }
}
