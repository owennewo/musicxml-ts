import { Component, OnInit } from '@angular/core';
import { GalleryService } from "./gallery.service";
import { GallerySection } from "./section/gallery.section.model";
import { ScoreService } from "../score/score.service";

@Component({
  moduleId: module.id,
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  sections: GallerySection[];
  selectedSection: GallerySection;

  constructor(private galleryService: GalleryService, private _scoreService: ScoreService) {

  }

  ngOnInit(): void {
    this.sections = this.galleryService.sections();
  }

  selectSection(selectedSection: GallerySection) {
    this.selectedSection = selectedSection;
    let score = this.selectedSection.scores[0];
    this._scoreService.loadScore(score);
  }


}