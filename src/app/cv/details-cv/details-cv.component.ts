import { ApplicationRef, Component, OnInit, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
    selector: 'app-details-cv',
    templateUrl: './details-cv.component.html',
    styleUrls: ['./details-cv.component.css'],
    standalone: true,
    imports: [
    AsyncPipe,
    DefaultImagePipe
],
})
export class DetailsCvComponent implements OnInit {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  authService = inject(AuthService);
  aRef = inject(ApplicationRef);

  cv$: Observable<Cv> = this.activatedRoute.params.pipe(
    tap(params => console.log(params)),
    switchMap((params) => this.cvService.getCvById(params['id'])),
    catchError((e) => {
      this.router.navigate([APP_ROUTES.cv]);
      return EMPTY;
    })
  );

  ngOnInit() {
    //const id = this.activatedRoute.snapshot.params['id'];
    // this.activatedRoute.params.subscribe(
    //   (params) => {
    //     this.cvService.getCvById(params['id'])
    //     .subscribe({
    //       next: (cv) => {
    //         console.log({ id: params['id'] });
    //         this.cv = cv;
    //         //  this.aRef.tick()
    //       },
    //       error: (e) => {
    //         this.router.navigate([APP_ROUTES.cv]);
    //       },
    //     });
    //   }
    // )
  }
  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).subscribe({
      next: () => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: () => {
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }
}
