import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription, filter, map } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-test-observable",
  templateUrl: "./test-observable.component.html",
  styleUrls: ["./test-observable.component.css"],
})
export class TestObservableComponent {
  firstObservable$: Observable<number>;
  counter = 5;
  constructor(private toaster: ToastrService) {
    /**
     * Flux d'un compte à rebours de 5 à 1
     */
    this.firstObservable$ = new Observable((observer) => {
      let i = 5;
      const intervalIndex = setInterval(() => {
        if (!i) {
          observer.complete();
          clearInterval(intervalIndex);
        }
        observer.next(i--);
      }, 1000);
    });

    /**
     * Une inscription
     */
    this.firstObservable$.subscribe({
      next: (valeurJdida) => console.log(valeurJdida),
    });
  /**
     * Une inscription
     */
    this.firstObservable$.subscribe({
      next: (valeurJdida) => this.counter = valeurJdida,
    });


    // setTimeout(() => {
      /**
       * Une inscription
       */
      this.firstObservable$
      .pipe(
        // 5 4 3 2 1
        map(value => value * 3),
        // 15 12 9 6 3,
        filter(value => value % 2 == 0)
        // 12 6
      )
      .subscribe({
        next: (val) => {
          toaster.info('' + val);
        },
        complete: () => {
          toaster.error('BOOOOM!!!!!!');
        },
      });
    // },3000)
  }
}
