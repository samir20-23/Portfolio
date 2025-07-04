import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./modules/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "about",
    loadChildren: () => import("./modules/about/about.module").then((m) => m.AboutModule),
  },
  {
    path: "projects",
    loadChildren: () => import("./modules/projects/projects.module").then((m) => m.ProjectsModule),
  },
  {
    path: "contact",
    loadChildren: () => import("./modules/contact/contact.module").then((m) => m.ContactModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
