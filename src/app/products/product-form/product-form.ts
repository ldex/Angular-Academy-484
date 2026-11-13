import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormOptions, FormRoot, max, maxLength, min, minLength, pattern, required, schema } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [FormRoot, FormField],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {

  private productService = inject(ProductService);
  private router = inject(Router);

  protected readonly product = signal<Omit<Product, 'id'>>({
    name: '',
    description: '',
    discontinued: false,
    fixedPrice: false,
    price: 0,
    modifiedDate: new Date(),
    imageUrl: '',
  });

  protected readonly productSchema = schema<Omit<Product, 'id'>>((path) => {
    required(path.name, { message: 'Name is required.'});
    required(path.price, { message: 'Price is required.'});

    minLength(path.name, 3, { message: 'Name must be at least 3 characters long.'});
    maxLength(path.name, 50, { message: 'Name cannot exceed 50 characters.'});
    minLength(path.description, 5, { message: 'Description must be at least 5 characters long.'});
    maxLength(path.description, 500, { message: 'Description cannot exceed 500 characters.'});

    min(path.price, 0, { message: 'Price cannot be negative.'});
    max(path.price, 100000, { message: 'Price cannot exceed 100 000.'});

    const IMAGE_URL_REGEX = /^https?:\/\/[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?::\d{1,5})?\/[^\s?#]*\.(?:jpe?g|png|gif|webp|avif|svg|bmp|ico|tiff?)(?:\?[^\s#]*)?(?:#\S*)?$/i;

    pattern(path.imageUrl, IMAGE_URL_REGEX, {
      message: 'Invalid image url (must be : jpg, png, gif, webp, avif, svg…).',
    });
  });

  protected readonly formOptions: FormOptions<Omit<Product, 'id'>> = {
    submission: {
      action: async (form) => {
        const result = await this.productService.saveProduct(form().value());
        if (result) {
          await this.router.navigateByUrl('/products');
          return;
        }
        return {kind: 'serverError', message: 'Server error: failed to save product.'};
      }
    }
  };

  protected readonly productForm = form(this.product, this.productSchema, this.formOptions);


}
