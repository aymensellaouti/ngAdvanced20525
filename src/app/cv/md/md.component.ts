import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { NgFor, NgClass } from '@angular/common';
import { ItemComponent } from '../item/item.component';

@Component({
    selector: 'app-md',
    templateUrl: './md.component.html',
    styleUrls: ['./md.component.css'],
    standalone: true,
    imports: [NgFor, NgClass, ItemComponent, RouterOutlet]
})
export class MdComponent {
cvs: Cv[] = [];
  cvService = inject(CvService);
  toastr = inject(ToastrService);
  router = inject(Router);
  acr = inject(ActivatedRoute);
  constructor() {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });
  }
  details(cv: Cv) {
    this.router.navigate([cv.id], {
      relativeTo: this.acr
    })
  }
}
