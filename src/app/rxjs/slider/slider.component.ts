import { HttpClient } from "@angular/common/http";
import { Component, inject, Input } from "@angular/core";
import { Observable, combineLatest, map, startWith, take, timer } from "rxjs";
import { API } from "src/config/api.config";

export interface ApiPhoto {
  _id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() awaitTime = 1500;
  @Input() maxImage = 10;
  @Input() imagePaths = [
    'as.jpg',
    'cv.png',
    'rotating_card_profile.png',
    'rotating_card_profile2.png',
    'rotating_card_profile3.png',
  ];
  http = inject(HttpClient);
  images$= this.http.get<ApiPhoto[]>(API.photos);
  /* Todo : Créer le flux permettant de générer les images à afficher dans le slider */
  // path1 path2 path3 ... pathFin path1
  paths$: Observable<string> = timer(0, this.awaitTime).pipe(
    // 0, 1, 2, 3 ......
    map((index) => this.imagePaths[index % this.imagePaths.length])
    // // path1 path2 path3 ... pathFin path1
    // take(this.maxImage)
  );

  paths2$: Observable<string> = combineLatest(
    [timer(0, this.awaitTime), this.images$]
  ).pipe(
    map(([index, images]) => images[index % images.length].url)
  );
}
