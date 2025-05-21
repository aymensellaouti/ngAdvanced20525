import { Component, Inject } from '@angular/core';
import { Cv } from '../model/cv';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { LoggersInjectionToken } from 'src/app/tokens/logger.injection-token';
import { TodoService } from 'src/app/todo/service/todo.service';
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  cvs$: Observable<Cv[]> = this.cvService.getCvs().pipe(
    catchError((e) => {
      this.toastr.error(`
            Attention!! Les données sont fictives, problème avec le serveur.
            Veuillez contacter l'admin.`);
      return of(this.cvService.getFakeCvs());
    })
  );
  selectedCv: Cv | null = null;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  constructor(
    @Inject(LoggersInjectionToken)
    private loggers: LoggerService[],
    private toastr: ToastrService,
    private cvService: CvService,
    private todoService: TodoService
  ) {
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
    //   complete: () => {
    //     toastr.success('Kamelna')
    //   }
    // });
    this.loggers.forEach((logger) => logger.logger('je suis le cvComponent'));
    this.toastr.info('Bienvenu dans notre CvTech');
  }
  onForwardCv(cv: Cv) {
    this.selectedCv = cv;
  }
}
