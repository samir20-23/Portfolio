import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, type Routes } from "@angular/router"
import { ProjectsComponent } from "./projects.component"

const routes: Routes = [
  {
    path: "",
    component: ProjectsComponent,
  },
]

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProjectsModule {}
