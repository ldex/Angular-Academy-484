import { inject, Injectable, Signal, signal } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiService = inject(ApiService);

  private readonly products = signal<Product[]>([]);
  private readonly selectedProduct = signal<Product | null>(null);

  private loading = signal(false);
  isLoading = this.loading.asReadonly();

  private error = signal<string | null>(null);
  errorMessage = this.error.asReadonly();

  private loadProducts() {
    this.loading.set(true);

    this.apiService.loadProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products.');
        this.loading.set(false);
      }
    });
  }

  clearCache() {
    this.products.set([]);
  }

  getProducts() {
    if(this.products().length === 0) {
      this.loadProducts();
    }
    return this.products.asReadonly();
  }


  getProductById(id: number): Signal<Product | null> {
    const product = this.products().find((p) => p.id === id);

    if (!product) {
      this.loadProduct(id);
    } else {
      this.selectedProduct.set(product);
    }

    return this.selectedProduct.asReadonly();
  }

  private loadProduct(id: number): void {
    this.loading.set(true);
    this.apiService.loadProduct(id).subscribe({
      next: (product) => {
        this.loading.set(false);
        this.selectedProduct.set(product);
      },
      error: (err) => this.error.set('Failed to load product.'),
    });
  }
}
