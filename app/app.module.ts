import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { MeasureComponent } from "./score/measure/measure.component";
import { NoteComponent } from "./score/note/note.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { GallerySectionComponent } from "./gallery/section/gallery.section.component";
import { GalleryService } from "./gallery/gallery.service";
import { AppConfig } from './app.config';
import { LoaderComponent } from "./loader/loader.component";
import { Store, provideStore } from "@ngrx/store";
import { scorestate } from "./reducers/score.state";
import { ScoreService } from "./score/score.service";
import { KeyboardService } from "./score/keyboard.service";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    StoreModule.provideStore(scorestate),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  declarations: [
    AppComponent,
    GalleryComponent,
    GallerySectionComponent,
    MeasureComponent,
    NoteComponent,
    LoaderComponent,
    routedComponents
  ],
  providers: [
    GalleryService,
    ScoreService,
    KeyboardService,
    AppConfig
  ],
  bootstrap: [AppComponent, []],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
