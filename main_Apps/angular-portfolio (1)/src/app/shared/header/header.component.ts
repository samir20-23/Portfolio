import { Component } from "@angular/core"
import { type Router, NavigationEnd } from "@angular/router"
import { filter } from "rxjs/operators"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  currentRoute = ""

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.currentRoute = event.url
    })
  }
}
