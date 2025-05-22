import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css'],
})
export class MasterDetailsComponent {
  cvs: Cv[] = [];
  cvService = inject(CvService);
  toastr = inject(ToastrService);
  router = inject(Router);
  acr = inject(ActivatedRoute);
  constructor() {
    this.cvs = this.acr.snapshot.data['cvs'];
    this.cvService.selectedCv$
    .pipe(takeUntilDestroyed())
    .subscribe({
        next : (cv) => this.details(cv)
      }
    )
    // this.cvService.getCvs().subscribe({
    //   next: (cvs) => {
    //     this.cvs = cvs;
    //   },
    //   error: () => {
    //     this.cvs = this.cvService.getFakeCvs();
    //     this.toastr.error(`
    //       Attention!! Les données sont fictives, problème avec le serveur.
    //       Veuillez contacter l'admin.`);
    //   },
    // });
  }
  details(cv: Cv) {
    this.router.navigate([cv.id], {
      relativeTo: this.acr
    })
  }
}
