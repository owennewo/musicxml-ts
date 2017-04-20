import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoreComponent } from './score/score.component';
import { GalleryComponent } from "./gallery/gallery.component";
import { GallerySectionComponent } from "./gallery/section/gallery.section.component";
import { LoaderComponent } from "./loader/loader.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/gallery',
    pathMatch: 'full'
  },
  {
    path: 'loader',
    component: LoaderComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    children: [ {
      path: ':sectionName',
      component: GallerySectionComponent
    }]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [ScoreComponent, LoaderComponent];
