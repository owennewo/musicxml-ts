import { Component, OnInit, Input } from '@angular/core';
import * as musicxml from '../../xmlns/www.musicxml.org';
import { GallerySection } from "./gallery.section.model";

@Component({
  moduleId: module.id,
  selector: 'gallery-section',
  templateUrl: './gallery.section.component.html',
  styleUrls: []
})
export class GallerySectionComponent implements OnInit {

    @Input()
    section: GallerySection;
    

    ngOnInit(): void {
        console.log("loading section: " + this.section.name);

    }
  
}