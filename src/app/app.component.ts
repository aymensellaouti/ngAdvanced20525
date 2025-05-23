import { ApplicationRef, Component, inject } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  appRef = inject(ApplicationRef);
  title = "Starting Advanced Topics";
}
