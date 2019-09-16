import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import "rxjs/add/operator/switchMap";
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter(item => item.category === this.category) : this.products;
  }

  private populateProducts() {
    this.productService.getAll().switchMap(products => {
      this.products = <Product[]>products;
      return this.route.queryParamMap;
    }).subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }
}
