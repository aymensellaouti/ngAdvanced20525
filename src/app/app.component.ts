import { ApplicationRef, Component, inject, signal } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";
import { SomComponent } from "./signals/som/som.component";
import { TtcComponent } from "./signals/ttc/ttc.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    standalone: true,
    imports: [NavbarComponent, RouterOutlet, SomComponent, TtcComponent],
})
export class AppComponent {
tick() {
  //this.appRef.tick();
  // this.title.set('CED ADVANCED ANGULAR')
  this.title.update(oldSignalValue => oldSignalValue + " 1")
}
  appRef = inject(ApplicationRef);
  title = signal("Starting Advanced Topics");
}
