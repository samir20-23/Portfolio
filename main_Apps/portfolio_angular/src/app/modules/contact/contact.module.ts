import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, type Routes } from "@angular/router"
import { ContactComponent } from "./contact.component"
import { ReactiveFormsModule } from "@angular/forms"

const routes: Routes = [
  {
    path: "",
    component: ContactComponent,
  },
]

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ContactModule {}
