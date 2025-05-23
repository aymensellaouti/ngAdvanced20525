import { Component, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
  distinctUntilChanged,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
    standalone: true,
    imports: [
    AsyncPipe
],
})
export class ProductsComponent {
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  setting: Settings = {limit: 12, skip: 0};
  productService = inject(ProductService);
  settings$ = new BehaviorSubject<Settings>(this.setting);
  // {0 12} {12 12} {12 24}
  products$: Observable<Product[]> = this.settings$.pipe(
    concatMap((setting) => this.productService.getProducts(setting)),
    distinctUntilChanged(),
    // apiRespons1 apiResponse2 ....
    map((apiResponse => apiResponse.products)),
    // productsJdod ....
    takeWhile(products => !!products.length),
    // [tousLesProductsEliJaw,productsJdod]
    scan((oldProducts, newProducts) => [...oldProducts,...newProducts])
    // 3awed lin ma 3ad 3andi chay
  );
  constructor() {}

  more() {
    this.setting.skip += this.setting.limit;
    this.settings$.next(this.setting);
  }
}
