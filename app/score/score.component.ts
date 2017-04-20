import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as cxml from 'cxml';
import * as musicxml from '../xmlns/www.musicxml.org';
import * as scoreactions from '../reducers/state.actions';

import { Http, HttpModule } from '@angular/http';
import { MeasureComponent } from "./measure/measure.component";
import { AppConfig } from "../app.config";
import { Store } from "@ngrx/store";
import { ScoreState, ModeType } from "../reducers/score.state";
import { KeyboardService } from "./keyboard.service";

@Component({
  moduleId: module.id,
  selector: 'musicxml-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  lastX: number;
  lastY: number;

  score: musicxml.document;
  selectedMeasures: musicxml.ScorePartwiseTypePartTypeMeasureType[];

  constructor(
    private router: Router,
    private http: Http,
    public CONFIG: AppConfig,
    private _store: Store<musicxml.ScorePartwiseTypePartTypeMeasureType[]>,
    private _keyboardService: KeyboardService) {

  }

  ngOnInit(): void {

    this.lastX = 0;
    this.lastY = 0;
    this._store.select('selectedMeasures').subscribe(selectedMeasures => {
      if (selectedMeasures && selectedMeasures.length > 0) {
        this.selectedMeasures = <musicxml.ScorePartwiseTypePartTypeMeasureType[]>selectedMeasures;
      }
    });

    this._store.select('score').subscribe(score => {
      console.log("new score recceived by score.component");
      this.score = <musicxml.document>score;
    });
  }

  calculateMeasureTransform(index: number, part: musicxml.ScorePartwiseTypePartType, measure: musicxml.ScorePartwiseTypePartTypeMeasureType) {

    if (index == 0) {
      this.lastX = 0;
      this.lastY = 0;
    }

    let x = this.lastX;
    let y = this.lastY;

    if (measure.print && measure.print.length > 0) {
      let print = measure.print[0];
      if (print.newSystem == "yes") {
        y = this.lastY = this.lastY + 200;
        x = this.lastX = 0;
      }
    }

    if (measure.width) {
      this.lastX = this.lastX + measure.width;
    } else {
      this.lastX = this.lastX + MeasureComponent.calculateWidth(this.CONFIG, measure);
    }

    // if (measure.barline && measure.barline.length > 0 && measure.barline[0]._exists) {
    //   y = y + 200;
    //   x = 0;
    // }



    // for (let loopMeasure of part.measure) {
    //   if (loopMeasure == measure) break;
    //   if (loopMeasure.width) {
    //     x = x + loopMeasure.width;
    //   } else {
    //     x = x + MeasureComponent.calculateWidth(this.CONFIG, loopMeasure);
    //   }
    //   if (loopMeasure.barline && loopMeasure.barline.length > 0 && loopMeasure.barline[0]._exists) {
    //     y = y + 200;
    //     x = 0;
    //   }
    //   if (loopMeasure.print && loopMeasure.print.length > 0 && loopMeasure.print[0]._exists) {
    //     let print = loopMeasure.print[0];
    //     if (print.newSystem == "yes") {
    //       y = y + 200;
    //       x = 0;
    //     }
    //   }
    // }

    console.log("measure:" + measure.number + "-" + 'translate(' + x + ',' + y + ') - notes - ' + measure.note.length);

    return 'translate(' + x + ',' + y + ')';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this._keyboardService.handleKeyDownEvent(event);
  }

}


