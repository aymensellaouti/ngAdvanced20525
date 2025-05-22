import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Observable, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  form = this.formBuilder.group({ search: [""] });
  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  cvs$: Observable<Cv[]> = this.search.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(searchName => this.cvService.selectByName(searchName))
  );
  constructor() {
    //this.search.valueChanges.subscribe({next:(value) => console.log(value)});
  }
}
