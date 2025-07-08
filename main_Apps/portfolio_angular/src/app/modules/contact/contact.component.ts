import { Component } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent {
  contactForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required],
      terms: [false, Validators.requiredTrue],
    })
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log("Form submitted:", this.contactForm.value)
      // Here you would typically send this to your backend
      alert("Message sent successfully!")
      this.contactForm.reset()
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key)
        control?.markAsTouched()
      })
    }
  }
}
