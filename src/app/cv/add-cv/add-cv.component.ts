import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from 'src/config/routes.config';
import { Cv } from '../model/cv';
import { tap } from 'rxjs';
import { CONSTANTES } from 'src/config/const.config';
import { uniqueCinValidator } from 'src/app/async validators/cin.async-validators';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
})
export class AddCvComponent implements OnDestroy {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  router = inject(Router);
  toastr = inject(ToastrService);
  form = this.formBuilder.group(
    {
      name: ['', Validators.required, []],
      firstname: ['', Validators.required],
      path: [''],
      job: ['', Validators.required],
      cin: [
        '',
        {
          validators: [Validators.required, Validators.pattern('[0-9]{8}')],
          asyncValidators: [uniqueCinValidator(this.cvService)],
          updateOn: 'change',
        },
      ],
      age: [
        0,
        {
          asyncValidaors: [],
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
    },
    {
      validators: [],
      asyncValidators: [],
      updateOn: 'change',
    }
  );
  constructor() {
    // 9ayedet 3al flux des changements
    this.age.valueChanges
      .pipe(
        tap((age) => {
          if (age < 18) this.path?.disable();
          else this.path?.enable();
        })
      )
      .subscribe();
    // On va charger le savedForm s'il existe
    const savedForm = localStorage.getItem(CONSTANTES.addSavedForm);
    if (savedForm) {
      this.form.patchValue(JSON.parse(savedForm));
    }
  }
  ngOnDestroy(): void {
    if (this.form.valid) {
      localStorage.setItem(
        CONSTANTES.addSavedForm,
        JSON.stringify(this.form.value)
      );
    } else {
      localStorage.setItem(
        CONSTANTES.addSavedForm,
        JSON.stringify(this.form.value)
      );
    }
  }
  addCv() {
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: () => {
        this.toastr.success(`Le cv a été ajouté avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
        localStorage.removeItem(CONSTANTES.addSavedForm);
        this.form.reset();
      },
      error: (erreur) => {
        console.log(erreur);
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }
  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get age(): AbstractControl {
    return this.form.get('age')!;
  }
  get job() {
    return this.form.get('job');
  }
  get path() {
    return this.form.get('path');
  }
  get cin(): AbstractControl {
    return this.form.get('cin')!;
  }
}
