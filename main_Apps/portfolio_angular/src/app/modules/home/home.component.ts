import { Component } from "@angular/core"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  downloadCV() {
    // In a real app, this would download the CV file
    console.log("Downloading CV...")
    alert("CV download started!")
  }
}
