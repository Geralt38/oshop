import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  getById(id) {
    return this.db.object('/products/' + id);
  }

  delete(id) {
    return this.db.object('/products/' + id).remove();
  }
}
