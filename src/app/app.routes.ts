import { Routes } from '@angular/router';
import { Home } from './shared/home';
import { ProductList } from './products/product-list/product-list';
import { Contact } from './shared/contact';
import { Admin } from './shared/admin';
import { ErrorPage } from './shared/error';
import { ProductDetails } from './products/product-details/product-details';
import { ProductForm } from './products/product-form/product-form';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'products', children: [
        { path: '', component: ProductList },
        { path: 'form', component: ProductForm },
        { path: ':id', component: ProductDetails }
    ]},
    { path: 'contact', component: Contact },
    { path: 'admin', component: Admin },
    { path: '**', component: ErrorPage }
];
