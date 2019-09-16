import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = <any>{};
  id;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private acivatedRoute: ActivatedRoute) {
    this.categories$ = categoryService.getAll();

    this.id = this.acivatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getById(this.id).take(1).subscribe(p => this.product = <Product>p);
    }
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Delete?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
