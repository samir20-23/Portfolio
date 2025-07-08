import { Component } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  newsletterForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      console.log("Newsletter subscription:", this.newsletterForm.value)
      // Here you would typically send this to your backend
      this.newsletterForm.reset()
    }
  }
}
