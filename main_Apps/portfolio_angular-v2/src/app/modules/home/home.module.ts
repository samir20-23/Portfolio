import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, type Routes } from "@angular/router"
import { HomeComponent } from "./home.component"

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
]

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
