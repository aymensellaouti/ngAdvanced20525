import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from 'src/config/routes.config';
import { authGuard } from '../auth/guards/auth.guard';
import { AddCvComponent } from './add-cv/add-cv.component';
import { CvComponent } from './cv/cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { cvsResolver } from './resolver/cvs.resolver';

export const CV_ROUTES = [
  {
    path: 'list',
    component: MasterDetailsComponent,
    resolve: {
      cvs: cvsResolver,
    },
    children: [
      {
        path: ':id',
        component: DetailsCvComponent,
      },
    ],
  },
  {
    path: '',
    component: CvComponent,
  },
  { path: 'add', component: AddCvComponent, canActivate: [authGuard] },
  { path: ':id', component: DetailsCvComponent },
];

@NgModule({
  imports: [RouterModule.forChild(CV_ROUTES)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
