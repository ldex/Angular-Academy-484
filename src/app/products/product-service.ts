import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiService = inject(ApiService);

  private readonly products = signal<Product[]>([]);

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

  getProducts() {
    this.loadProducts();
    return this.products.asReadonly();
  }
}
